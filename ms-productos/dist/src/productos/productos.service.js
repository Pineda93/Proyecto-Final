var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from './producto.entity.js';
let ProductosService = class ProductosService {
    productosRepositorio;
    constructor(productosRepositorio) {
        this.productosRepositorio = productosRepositorio;
    }
    async crear(dto) {
        const existente = await this.productosRepositorio.findOneBy({
            codigo: dto.codigo,
        });
        if (existente) {
            throw new ConflictException('Ya existe un producto con este código');
        }
        const producto = this.productosRepositorio.create(dto);
        return this.productosRepositorio.save(producto);
    }
    listar() {
        return this.productosRepositorio.find();
    }
    listarPorCategoria(categoria) {
        return this.productosRepositorio.findBy({ categoria });
    }
    listarPorEstado(estado) {
        return this.productosRepositorio.findBy({ estado });
    }
    async buscarPorCodigo(codigo) {
        const producto = await this.productosRepositorio.findOneBy({
            codigo,
        });
        if (!producto) {
            throw new NotFoundException('No existe este producto');
        }
        return producto;
    }
    async actualizar(codigo, dto) {
        const producto = await this.buscarPorCodigo(codigo);
        Object.assign(producto, dto);
        if (producto.stock === 0 && (!dto.estado || dto.estado === 'DISPONIBLE')) {
            producto.estado = 'AGOTADO';
        }
        return this.productosRepositorio.save(producto);
    }
    async actualizarStock(codigo, dto) {
        const producto = await this.buscarPorCodigo(codigo);
        producto.stock = dto.stock;
        if (producto.stock === 0) {
            producto.estado = 'AGOTADO';
        }
        else if (producto.estado === 'AGOTADO') {
            producto.estado = 'DISPONIBLE';
        }
        return this.productosRepositorio.save(producto);
    }
    async descontarStock(codigo, dto) {
        const producto = await this.buscarPorCodigo(codigo);
        if (producto.estado === 'DESCONTINUADO') {
            throw new BadRequestException('El producto está descontinuado y no se puede vender');
        }
        if (producto.stock < dto.cantidad) {
            throw new BadRequestException(`Existencia insuficiente. Stock actual: ${producto.stock}, cantidad solicitada: ${dto.cantidad}`);
        }
        producto.stock -= dto.cantidad;
        if (producto.stock === 0) {
            producto.estado = 'AGOTADO';
        }
        return this.productosRepositorio.save(producto);
    }
    async reponerStock(codigo, dto) {
        const producto = await this.buscarPorCodigo(codigo);
        producto.stock += dto.cantidad;
        if (producto.estado === 'AGOTADO' && producto.stock > 0) {
            producto.estado = 'DISPONIBLE';
        }
        return this.productosRepositorio.save(producto);
    }
    async actualizarEstado(codigo, dto) {
        const producto = await this.buscarPorCodigo(codigo);
        producto.estado = dto.estado;
        return this.productosRepositorio.save(producto);
    }
    async eliminar(codigo) {
        const producto = await this.buscarPorCodigo(codigo);
        producto.estado = 'DESCONTINUADO';
        return this.productosRepositorio.save(producto);
    }
};
ProductosService = __decorate([
    Injectable(),
    __param(0, InjectRepository(Producto)),
    __metadata("design:paramtypes", [Repository])
], ProductosService);
export { ProductosService };
//# sourceMappingURL=productos.service.js.map