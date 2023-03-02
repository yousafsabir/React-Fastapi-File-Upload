from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from config.config import settings
from routes.router import app_router

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url='/api/openapi.json'
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def index():
    return {"message": "Server is Working, go to /docs to test apis"}

app.include_router(app_router, prefix='/api')