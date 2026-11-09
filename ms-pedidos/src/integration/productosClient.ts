import {
    BadGatewayException,
    BadRequestException,
    GatewayTimeoutException,
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ProductoResponseDTO } from './dto/productoResponseDTO.js';

@Injectable()
export class productosClient {
    private readonly baseUrl: string;
    private readonly timeoutMs: number;

    constructor(private readonly configService: ConfigService) {
        this.baseUrl = this.configService.get<string>(
            'URL_MS_PRODUCTOS',
            'http://localhost:3001',
        );
        this.timeoutMs = Number(
            this.configService.get<number>('TIMEOUT_PRODUCTOS_MS', 5000),
        );
    }

    async consultarProducto(codigo: string): Promise<ProductoResponseDTO> {
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
                const mensaje = (errorData as any).message || `Error del servicio de productos (${respuesta.status})`;
                throw new BadRequestException(mensaje);
            }

            return (await respuesta.json()) as ProductoResponseDTO;
        } catch (error: any) {
            this.manejarErrorHttp(error, 'consultar');
            throw error;
        }
    }

    async descontarStock(codigo: string, cantidad: number): Promise<ProductoResponseDTO> {
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
                const mensaje = (errorData as any).message || `Existencia insuficiente para el producto '${codigo}'`;
                throw new BadRequestException(mensaje);
            }

            return (await respuesta.json()) as ProductoResponseDTO;
        } catch (error: any) {
            this.manejarErrorHttp(error, 'descontar stock de');
            throw error;
        }
    }

    async reponerStock(codigo: string, cantidad: number): Promise<ProductoResponseDTO> {
        const url = `${this.baseUrl}/productos/${encodeURIComponent(codigo)}/reponer`;

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
                const mensaje = (errorData as any).message || `Error al reponer stock del producto '${codigo}'`;
                throw new BadRequestException(mensaje);
            }

            return (await respuesta.json()) as ProductoResponseDTO;
        } catch (error: any) {
            this.manejarErrorHttp(error, 'reponer stock de');
            throw error;
        }
    }

    private manejarErrorHttp(error: any, accion: string) {
        if (
            error instanceof NotFoundException ||
            error instanceof BadRequestException ||
            error instanceof UnauthorizedException
        ) {
            throw error;
        }

        if (error.name === 'TimeoutError' || error.name === 'AbortError') {
            throw new GatewayTimeoutException(
                `El servicio de productos tardó más de ${this.timeoutMs}ms en responder al ${accion} el producto`,
            );
        }

        if (error.cause?.code === 'ECONNREFUSED' || error.message?.includes('fetch failed')) {
            throw new BadGatewayException(
                `El servicio de productos no está disponible o no se pudo establecer conexión en ${this.baseUrl}`,
            );
        }
    }
}
