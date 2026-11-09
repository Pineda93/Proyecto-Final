import { ConfigService } from '@nestjs/config';
import { ProductoResponse } from './dto/producto-response.dto.js';
export declare class ProductosClient {
    private readonly configService;
    private readonly baseUrl;
    private readonly timeoutMs;
    constructor(configService: ConfigService);
    consultarProducto(codigo: string): Promise<ProductoResponse>;
    descontarStock(codigo: string, cantidad: number): Promise<ProductoResponse>;
    private manejarErrorHttp;
}
