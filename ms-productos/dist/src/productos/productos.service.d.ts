import { Repository } from 'typeorm';
import { Producto } from './producto.entity.js';
import { CrearProductoDto } from './dto/crear-producto.dto.js';
import { ActualizarProductoDto } from './dto/actualizar-producto.dto.js';
import { ActualizarEstadoProductoDto } from './dto/actualizar-estado-producto.dto.js';
import { ActualizarStockDto } from './dto/actualizar-stock.dto.js';
import { DescontarStockDto } from './dto/descontar-stock.dto.js';
import { ReponerStockDto } from './dto/reponer-stock.dto.js';
export declare class ProductosService {
    private readonly productosRepositorio;
    constructor(productosRepositorio: Repository<Producto>);
    crear(dto: CrearProductoDto): Promise<Producto>;
    listar(): Promise<Producto[]>;
    listarPorCategoria(categoria: string): Promise<Producto[]>;
    listarPorEstado(estado: string): Promise<Producto[]>;
    buscarPorCodigo(codigo: string): Promise<Producto>;
    actualizar(codigo: string, dto: ActualizarProductoDto): Promise<Producto>;
    actualizarStock(codigo: string, dto: ActualizarStockDto): Promise<Producto>;
    descontarStock(codigo: string, dto: DescontarStockDto): Promise<Producto>;
    reponerStock(codigo: string, dto: ReponerStockDto): Promise<Producto>;
    actualizarEstado(codigo: string, dto: ActualizarEstadoProductoDto): Promise<Producto>;
    eliminar(codigo: string): Promise<Producto>;
}
