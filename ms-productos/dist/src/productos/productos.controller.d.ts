import { ProductosService } from './productos.service.js';
import { CrearProductoDto } from './dto/crear-producto.dto.js';
import { ActualizarProductoDto } from './dto/actualizar-producto.dto.js';
import { ActualizarEstadoProductoDto } from './dto/actualizar-estado-producto.dto.js';
import { ActualizarStockDto } from './dto/actualizar-stock.dto.js';
import { DescontarStockDto } from './dto/descontar-stock.dto.js';
import { ReponerStockDto } from './dto/reponer-stock.dto.js';
export declare class ProductosController {
    private readonly productosService;
    constructor(productosService: ProductosService);
    crear(dto: CrearProductoDto): Promise<import("./producto.entity.js").Producto>;
    listar(): Promise<import("./producto.entity.js").Producto[]>;
    listarPorCategoria(categoria: string): Promise<import("./producto.entity.js").Producto[]>;
    listarPorEstado(estado: string): Promise<import("./producto.entity.js").Producto[]>;
    buscarPorCodigo(codigo: string): Promise<import("./producto.entity.js").Producto>;
    actualizar(codigo: string, dto: ActualizarProductoDto): Promise<import("./producto.entity.js").Producto>;
    actualizarStock(codigo: string, dto: ActualizarStockDto): Promise<import("./producto.entity.js").Producto>;
    descontarStock(codigo: string, dto: DescontarStockDto): Promise<import("./producto.entity.js").Producto>;
    reponerStock(codigo: string, dto: ReponerStockDto): Promise<import("./producto.entity.js").Producto>;
    actualizarEstado(codigo: string, dto: ActualizarEstadoProductoDto): Promise<import("./producto.entity.js").Producto>;
    eliminar(codigo: string): Promise<import("./producto.entity.js").Producto>;
}
