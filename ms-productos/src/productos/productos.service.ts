import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from './producto.entity.js';
import { CrearProductoDto } from './dto/crear-producto.dto.js';
import { ActualizarProductoDto } from './dto/actualizar-producto.dto.js';
import { ActualizarEstadoProductoDto } from './dto/actualizar-estado-producto.dto.js';
import { ActualizarStockDto } from './dto/actualizar-stock.dto.js';
import { DescontarStockDto } from './dto/descontar-stock.dto.js';
import { ReponerStockDto } from './dto/reponer-stock.dto.js';

@Injectable()
export class ProductosService {
    constructor(
        @InjectRepository(Producto)
        private readonly productosRepositorio: Repository<Producto>,
    ) {}

    async crear(dto: CrearProductoDto): Promise<Producto> {
        const existente = await this.productosRepositorio.findOneBy({
            codigo: dto.codigo,
        });

        if (existente) {
            throw new ConflictException('Ya existe un producto con este código');
        }

        const producto = this.productosRepositorio.create(dto);
        return this.productosRepositorio.save(producto);
    }

    listar(): Promise<Producto[]> {
        return this.productosRepositorio.find();
    }

    listarPorCategoria(categoria: string): Promise<Producto[]> {
        return this.productosRepositorio.findBy({ categoria });
    }

    listarPorEstado(estado: string): Promise<Producto[]> {
        return this.productosRepositorio.findBy({ estado });
    }

    async buscarPorCodigo(codigo: string): Promise<Producto> {
        const producto = await this.productosRepositorio.findOneBy({
            codigo,
        });

        if (!producto) {
            throw new NotFoundException('No existe este producto');
        }

        return producto;
    }

    async actualizar(codigo: string, dto: ActualizarProductoDto): Promise<Producto> {
        const producto = await this.buscarPorCodigo(codigo);

        Object.assign(producto, dto);
        if (producto.stock === 0 && (!dto.estado || dto.estado === 'DISPONIBLE')) {
            producto.estado = 'AGOTADO';
        }
        return this.productosRepositorio.save(producto);
    }

    async actualizarStock(codigo: string, dto: ActualizarStockDto): Promise<Producto> {
        const producto = await this.buscarPorCodigo(codigo);

        producto.stock = dto.stock;
        if (producto.stock === 0) {
            producto.estado = 'AGOTADO';
        } else if (producto.estado === 'AGOTADO') {
            producto.estado = 'DISPONIBLE';
        }
        return this.productosRepositorio.save(producto);
    }

    async descontarStock(codigo: string, dto: DescontarStockDto): Promise<Producto> {
        const producto = await this.buscarPorCodigo(codigo);

        if (producto.estado === 'DESCONTINUADO') {
            throw new BadRequestException('El producto está descontinuado y no se puede vender');
        }

        if (producto.stock < dto.cantidad) {
            throw new BadRequestException(
                `Existencia insuficiente. Stock actual: ${producto.stock}, cantidad solicitada: ${dto.cantidad}`
            );
        }

        producto.stock -= dto.cantidad;
        if (producto.stock === 0) {
            producto.estado = 'AGOTADO';
        }

        return this.productosRepositorio.save(producto);
    }

    async reponerStock(codigo: string, dto: ReponerStockDto): Promise<Producto> {
        const producto = await this.buscarPorCodigo(codigo);

        producto.stock += dto.cantidad;
        if (producto.estado === 'AGOTADO' && producto.stock > 0) {
            producto.estado = 'DISPONIBLE';
        }

        return this.productosRepositorio.save(producto);
    }

    async actualizarEstado(codigo: string, dto: ActualizarEstadoProductoDto): Promise<Producto> {
        const producto = await this.buscarPorCodigo(codigo);

        producto.estado = dto.estado;
        return this.productosRepositorio.save(producto);
    }

    async eliminar(codigo: string): Promise<Producto> {
        const producto = await this.buscarPorCodigo(codigo);

        producto.estado = 'DESCONTINUADO';
        return this.productosRepositorio.save(producto);
    }
}
