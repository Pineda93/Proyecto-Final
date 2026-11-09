import httpx
from fastapi import APIRouter, Depends, HTTPException, Request, Response

from app.config import config
from app.dependencies import usuario_actual

router = APIRouter(tags=["Proxy"])

METODOS = ["GET", "POST", "PUT", "PATCH", "DELETE"]


async def _reenviar(
    request: Request,
    base_url: str,
    ruta: str,
    nombre_servicio: str,
    usuario: dict,
) -> Response:
    destino = f"{base_url}"
    if ruta:
        destino += f"/{ruta}"

    cabeceras = {"X-Usuario": usuario["usuario"]}
    if "content-type" in request.headers:
        cabeceras["Content-Type"] = request.headers["content-type"]

    try:
        async with httpx.AsyncClient(timeout=10) as cliente:
            respuesta = await cliente.request(
                request.method,
                destino,
                params=request.query_params,
                content=await request.body(),
                headers=cabeceras,
            )
    except httpx.ConnectError:
        raise HTTPException(status_code=502, detail=f"{nombre_servicio} no esta disponible")
    except httpx.TimeoutException:
        raise HTTPException(
            status_code=504,
            detail=f"{nombre_servicio} tardo demasiado en responder",
        )

    return Response(
        content=respuesta.content,
        status_code=respuesta.status_code,
        media_type=respuesta.headers.get("content-type"),
    )


@router.api_route("/productos", methods=METODOS)
@router.api_route("/productos/{ruta:path}", methods=METODOS)
async def reenviar_a_productos(
    request: Request,
    ruta: str = "",
    usuario=Depends(usuario_actual),
):
    return await _reenviar(
        request=request,
        base_url=f"{config.url_ms_productos}/productos",
        ruta=ruta,
        nombre_servicio="ms-productos",
        usuario=usuario,
    )


@router.api_route("/pedidos", methods=METODOS)
@router.api_route("/pedidos/{ruta:path}", methods=METODOS)
async def reenviar_a_pedidos(
    request: Request,
    ruta: str = "",
    usuario=Depends(usuario_actual),
):
    return await _reenviar(
        request=request,
        base_url=f"{config.url_ms_pedidos}/pedidos",
        ruta=ruta,
        nombre_servicio="ms-pedidos",
        usuario=usuario,
    )