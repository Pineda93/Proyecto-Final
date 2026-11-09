var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { BadGatewayException, BadRequestException, GatewayTimeoutException, Injectable, NotFoundException, UnauthorizedException, } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
let ProductosClient = class ProductosClient {
    configService;
    baseUrl;
    timeoutMs;
    constructor(configService) {
        this.configService = configService;
        this.baseUrl = this.configService.get('URL_MS_PRODUCTOS', 'http://localhost:3001');
        this.timeoutMs = Number(this.configService.get('TIMEOUT_PRODUCTOS_MS', 5000));
    }
    async consultarProducto(codigo) {
        const url = `${this.baseUrl}/productos/${encodeURIComponent(codigo)}`;
        try {
            const respuesta = await fetch(url, {
                method: 'GET',
                signal: AbortSignal.timeout(this.timeoutMs),
            });
            if (respuesta.status === 404) {
                throw new NotFoundException(`El producto con código '${codigo}' no existe`);
            }
            if (respuesta.status === 401) {
                throw new UnauthorizedException('Error de autenticación al comunicarse con el servicio de productos');
            }
            if (!respuesta.ok) {
                const errorData = await respuesta.json().catch(() => ({}));
                const mensaje = errorData.message || `Error del servicio de productos (${respuesta.status})`;
                throw new BadRequestException(mensaje);
            }
            return (await respuesta.json());
        }
        catch (error) {
            this.manejarErrorHttp(error, 'consultar');
            throw error;
        }
    }
    async descontarStock(codigo, cantidad) {
        const url = `${this.baseUrl}/productos/${encodeURIComponent(codigo)}/descontar`;
        try {
            const respuesta = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ cantidad }),
                signal: AbortSignal.timeout(this.timeoutMs),
            });
            if (respuesta.status === 404) {
                throw new NotFoundException(`El producto con código '${codigo}' no existe`);
            }
            if (respuesta.status === 401) {
                throw new UnauthorizedException('Error de autenticación al comunicarse con el servicio de productos');
            }
            if (!respuesta.ok) {
                const errorData = await respuesta.json().catch(() => ({}));
                const mensaje = errorData.message || `Existencia insuficiente para el producto '${codigo}'`;
                throw new BadRequestException(mensaje);
            }
            return (await respuesta.json());
        }
        catch (error) {
            this.manejarErrorHttp(error, 'descontar stock de');
            throw error;
        }
    }
    manejarErrorHttp(error, accion) {
        if (error instanceof NotFoundException ||
            error instanceof BadRequestException ||
            error instanceof UnauthorizedException) {
            throw error;
        }
        if (error.name === 'TimeoutError' || error.name === 'AbortError') {
            throw new GatewayTimeoutException(`El servicio de productos tardó más de ${this.timeoutMs}ms en responder al ${accion} el producto`);
        }
        if (error.cause?.code === 'ECONNREFUSED' || error.message?.includes('fetch failed')) {
            throw new BadGatewayException(`El servicio de productos no está disponible o no se pudo establecer conexión en ${this.baseUrl}`);
        }
    }
};
ProductosClient = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [ConfigService])
], ProductosClient);
export { ProductosClient };
//# sourceMappingURL=productos.client.js.map