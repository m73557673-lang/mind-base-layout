import os
import uuid
import aiofiles
from pathlib import Path
from typing import List, Optional

from fastapi import FastAPI, UploadFile, File, HTTPException, Header, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from backend.database import get_db, dict_cursor
from backend.models import DocumentOut, RenameRequest

app = FastAPI(title="DocMind AI — PDF API", version="1.0.0")

# ─── CORS ────────────────────────────────────────────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─── Storage dir ─────────────────────────────────────────────────────────────
UPLOAD_DIR = Path("uploads/pdfs")
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

MAX_FILE_SIZE = 50 * 1024 * 1024  # 50 MB
ALLOWED_MIME = {"application/pdf"}


# ─── Upload ──────────────────────────────────────────────────────────────────
@app.post("/api/documents/upload", response_model=List[DocumentOut])
async def upload_documents(
    files: List[UploadFile] = File(...),
    x_user_id: Optional[str] = Header(None, alias="x-user-id"),
):
    if not x_user_id:
        raise HTTPException(status_code=401, detail="User ID required")

    results: List[DocumentOut] = []

    for upload in files:
        # Validate MIME type
        content_type = upload.content_type or ""
        if content_type not in ALLOWED_MIME and not upload.filename.lower().endswith(".pdf"):
            raise HTTPException(
                status_code=422,
                detail=f"'{upload.filename}' is not a PDF file.",
            )

        # Read file bytes to check size
        contents = await upload.read()
        if len(contents) > MAX_FILE_SIZE:
            raise HTTPException(
                status_code=413,
                detail=f"'{upload.filename}' exceeds the 50 MB size limit.",
            )

        # Save to disk
        file_id = uuid.uuid4().hex
        dest = UPLOAD_DIR / f"{file_id}.pdf"
        async with aiofiles.open(dest, "wb") as f:
            await f.write(contents)

        original_name = upload.filename or f"{file_id}.pdf"
        # Strip .pdf for display name
        display_name = original_name
        if display_name.lower().endswith(".pdf"):
            display_name = display_name[:-4]

        # Persist metadata
        with get_db() as conn:
            cur = dict_cursor(conn)
            cur.execute(
                """
                INSERT INTO documents
                    (user_id, original_name, display_name, file_path, file_size, mime_type)
                VALUES (%s, %s, %s, %s, %s, %s)
                RETURNING *
                """,
                (
                    x_user_id,
                    original_name,
                    display_name,
                    str(dest),
                    len(contents),
                    "application/pdf",
                ),
            )
            row = cur.fetchone()

        results.append(DocumentOut(**row))

    return results


# ─── List ─────────────────────────────────────────────────────────────────────
@app.get("/api/documents", response_model=List[DocumentOut])
def list_documents(
    x_user_id: Optional[str] = Header(None, alias="x-user-id"),
):
    if not x_user_id:
        raise HTTPException(status_code=401, detail="User ID required")

    with get_db() as conn:
        cur = dict_cursor(conn)
        cur.execute(
            "SELECT * FROM documents WHERE user_id = %s ORDER BY created_at DESC",
            (x_user_id,),
        )
        rows = cur.fetchall()

    return [DocumentOut(**r) for r in rows]


# ─── Rename ───────────────────────────────────────────────────────────────────
@app.patch("/api/documents/{doc_id}/rename", response_model=DocumentOut)
def rename_document(
    doc_id: int,
    body: RenameRequest,
    x_user_id: Optional[str] = Header(None, alias="x-user-id"),
):
    if not x_user_id:
        raise HTTPException(status_code=401, detail="User ID required")

    name = body.display_name.strip()
    if not name:
        raise HTTPException(status_code=422, detail="Name cannot be empty.")
    if len(name) > 255:
        raise HTTPException(status_code=422, detail="Name is too long.")

    with get_db() as conn:
        cur = dict_cursor(conn)
        cur.execute(
            """
            UPDATE documents
               SET display_name = %s, updated_at = NOW()
             WHERE id = %s AND user_id = %s
            RETURNING *
            """,
            (name, doc_id, x_user_id),
        )
        row = cur.fetchone()

    if not row:
        raise HTTPException(status_code=404, detail="Document not found.")
    return DocumentOut(**row)


# ─── Delete ───────────────────────────────────────────────────────────────────
@app.delete("/api/documents/{doc_id}")
def delete_document(
    doc_id: int,
    x_user_id: Optional[str] = Header(None, alias="x-user-id"),
):
    if not x_user_id:
        raise HTTPException(status_code=401, detail="User ID required")

    with get_db() as conn:
        cur = dict_cursor(conn)
        cur.execute(
            "DELETE FROM documents WHERE id = %s AND user_id = %s RETURNING file_path",
            (doc_id, x_user_id),
        )
        row = cur.fetchone()

    if not row:
        raise HTTPException(status_code=404, detail="Document not found.")

    # Remove file from disk (best-effort)
    try:
        Path(row["file_path"]).unlink(missing_ok=True)
    except Exception:
        pass

    return {"ok": True}


# ─── Health ───────────────────────────────────────────────────────────────────
@app.get("/api/health")
def health():
    return {"status": "ok"}
