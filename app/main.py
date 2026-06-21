from __future__ import annotations

from fastapi import FastAPI

from app.core.config import settings
from app.core.logging import configure_logging
from app.routers.health import router as health_router
from app.routers.line_webhooks import router as line_router


def create_app() -> FastAPI:
    configure_logging(settings.log_level)
    app = FastAPI(title="Client Agent API", version="0.1.0")
    app.include_router(health_router)
    app.include_router(line_router)
    return app


app = create_app()
