from fastapi import APIRouter
from routes.file_routes import file_router

app_router = APIRouter()

app_router.include_router(file_router, prefix="/files", tags=["File Apis"])