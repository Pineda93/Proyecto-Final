import { ConfigService } from '@nestjs/config';
import { ProductoResponseDTO } from './dto/productoResponseDTO.js';
export declare class productosClient {
    private readonly configService;
    private readonly baseUrl;
    private readonly timeoutMs;
    constructor(configService: ConfigService);
    consultarProducto(codigo: string): Promise<ProductoResponseDTO>;
    descontarStock(codigo: string, cantidad: number): Promise<ProductoResponseDTO>;
    reponerStock(codigo: string, cantidad: number): Promise<ProductoResponseDTO>;
    private manejarErrorHttp;
}
