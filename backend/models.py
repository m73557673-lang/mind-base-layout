from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class DocumentOut(BaseModel):
    id: int
    user_id: str
    original_name: str
    display_name: str
    file_size: int
    mime_type: str
    page_count: Optional[int]
    created_at: datetime
    updated_at: datetime


class RenameRequest(BaseModel):
    display_name: str
