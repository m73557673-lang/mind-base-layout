// Thin wrapper around the FastAPI backend.
// All requests include the Clerk userId as x-user-id (set by callers).

export interface DocMeta {
  id: number;
  user_id: string;
  original_name: string;
  display_name: string;
  file_size: number;
  mime_type: string;
  page_count: number | null;
  created_at: string;
  updated_at: string;
}

const BASE = "/api";

function headers(userId: string): HeadersInit {
  return {
    "x-user-id": userId,
  };
}

// ─── List ─────────────────────────────────────────────────────────────────────
export async function listDocuments(userId: string): Promise<DocMeta[]> {
  const res = await fetch(`${BASE}/documents`, {
    headers: headers(userId),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

// ─── Upload (with progress) ────────────────────────────────────────────────────
export function uploadDocuments(
  userId: string,
  files: File[],
  onProgress: (pct: number) => void,
): Promise<DocMeta[]> {
  return new Promise((resolve, reject) => {
    const form = new FormData();
    for (const file of files) form.append("files", file);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", `${BASE}/documents/upload`);
    xhr.setRequestHeader("x-user-id", userId);

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) onProgress(Math.round((e.loaded / e.total) * 100));
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          resolve(JSON.parse(xhr.responseText));
        } catch {
          reject(new Error("Invalid response from server"));
        }
      } else {
        let msg = `Upload failed (${xhr.status})`;
        try {
          const body = JSON.parse(xhr.responseText);
          if (body?.detail) msg = body.detail;
        } catch { /* ignore */ }
        reject(new Error(msg));
      }
    };

    xhr.onerror = () => reject(new Error("Network error during upload"));
    xhr.send(form);
  });
}

// ─── Rename ────────────────────────────────────────────────────────────────────
export async function renameDocument(
  userId: string,
  docId: number,
  displayName: string,
): Promise<DocMeta> {
  const res = await fetch(`${BASE}/documents/${docId}/rename`, {
    method: "PATCH",
    headers: { ...headers(userId), "Content-Type": "application/json" },
    body: JSON.stringify({ display_name: displayName }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

// ─── Delete ────────────────────────────────────────────────────────────────────
export async function deleteDocument(userId: string, docId: number): Promise<void> {
  const res = await fetch(`${BASE}/documents/${docId}`, {
    method: "DELETE",
    headers: headers(userId),
  });
  if (!res.ok) throw new Error(await res.text());
}
