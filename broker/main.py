from contextlib import asynccontextmanager

from fastapi import FastAPI

from app.db import crear_tablas_y_usuarios_iniciales
from app.routes import admin, auth, proxy


@asynccontextmanager
async def ciclo_de_vida(app: FastAPI):
    crear_tablas_y_usuarios_iniciales()
    yield


app = FastAPI(
    title="Broker Ecommerce",
    description="Punto unico de entrada: autentica y redirige a servicios",
    version="1.0.0",
    lifespan=ciclo_de_vida,
)

app.include_router(auth.router)
app.include_router(admin.router)
app.include_router(proxy.router)


@app.get("/")
def root():
    return {"mensaje": "Broker iniciado correctamente"}