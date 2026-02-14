from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
import uvicorn

load_dotenv()

app = FastAPI(title="Hacks.Guide API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/health")
async def health_check():
    return {"status": "ok", "service": "hacks-guide-api"}


@app.get("/api/guide/consoles")
async def get_consoles():
    return [
        {
            "id": "wiiu",
            "name": "Nintendo Wii U",
            "description": "Installation d'Aroma et Tiramisu pour les consoles 5.5.x.",
            "icon": "gamepad-2",
            "status": "available",
            "accent": "blue",
            "link": "/guide/wiiu",
        },
        {
            "id": "3ds",
            "name": "Nintendo 3DS",
            "description": "Installation de Luma3DS et Boot9Strap. (Bientôt disponible)",
            "icon": "smartphone",
            "status": "coming_soon",
            "accent": "red",
            "link": None,
        },
    ]


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8001)
