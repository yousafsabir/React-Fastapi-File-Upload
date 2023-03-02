from pydantic import BaseSettings
from decouple import config


class Settings(BaseSettings):
    PROJECT_NAME: str = "React Fastapi File Uploader"
    SAVE_PATH: str = config("SAVE_PATH", cast=str)

    class Config:
        case_sensitive = True


settings = Settings()