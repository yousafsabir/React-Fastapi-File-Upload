from fastapi import APIRouter, Form, UploadFile
from typing import List
from config.config import settings
import shutil


file_router = APIRouter()


@file_router.post("/save")
async def save_files(files: List[UploadFile] = Form(), totalSize: str = Form(), numberOfFiles: int = Form()):
    for file in files:
        destination_file_path = settings.SAVE_PATH + file.filename
        try:
            with open(destination_file_path, "wb+") as buffer:
                shutil.copyfileobj(file.file, buffer)
        finally:
            file.file.close()
    return {
        "message": "All files successfully uploaded",
        "numberOfFiles": numberOfFiles,
        "totalSize": totalSize
    }