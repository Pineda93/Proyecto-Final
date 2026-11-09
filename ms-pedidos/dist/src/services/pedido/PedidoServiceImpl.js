var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { BadRequestException, Injectable, NotFoundException, } from '@nestjs/common';
import { pedidoRepository } from '../../repositories/pedidoRepository.js';
import { productosClient } from '../../integration/productosClient.js';
import { Pedido } from '../../models/Pedido.js';
import { DetallePedido } from '../../models/DetallePedido.js';
let PedidoServiceImpl = class PedidoServiceImpl {
    pedidoRepository;
    productosClient;
    constructor(pedidoRepository, productosClient) {
        this.pedidoRepository = pedidoRepository;
        this.productosClient = productosClient;
    }
    async registrarPedido(request, usuarioHeader) {
        if (!request) {
            throw new BadRequestException('No vienen los datos del pedido');
        }
        const listaDetalles = request.detalles || request.items;
        if (!listaDetalles || listaDetalles.length === 0) {
            throw new BadRequestException('El pedido debe contener al menos un producto en el detalle');
        }
        const usuarioFinal = request.usuario || usuarioHeader || 'cliente_general';
        const pedido = new Pedido();
        pedido.usuario = usuarioFinal;
        pedido.estado = 'COMPLETADO';
        const productosVerificados = [];
        for (const detalleDTO of listaDetalles) {
            if (!detalleDTO.productoCodigo) {
                throw new BadRequestException('No viene el código del producto en uno de los detalles');
            }
            if (detalleDTO.cantidad == null || detalleDTO.cantidad <= 0) {
                throw new BadRequestException('La cantidad del producto debe ser mayor a 0');
            }
            const producto = await this.productosClient.consultarProducto(detalleDTO.productoCodigo);
            if (producto.estado === 'DESCONTINUADO' || producto.estado === 'AGOTADO') {
                throw new BadRequestException(`El producto '${producto.nombre}' (${producto.codigo}) no se encuentra disponible (Estado: ${producto.estado})`);
            }
            if (producto.stock != null && producto.stock < detalleDTO.cantidad) {
                throw new BadRequestException(`Stock insuficiente para el producto: ${producto.nombre} (Disponible: ${producto.stock}, Solicitado: ${detalleDTO.cantidad})`);
            }
            productosVerificados.push({ detalleDTO, producto });
        }
        let subtotalPedido = 0.0;
        for (const { detalleDTO, producto } of productosVerificados) {
            await this.productosClient.descontarStock(detalleDTO.productoCodigo, detalleDTO.cantidad);
            const precio = Number(producto.precio);
            const subtotalLinea = Math.round(precio * detalleDTO.cantidad * 100.0) / 100.0;
            const detalle = new DetallePedido();
            detalle.productoCodigo = producto.codigo;
            detalle.productoNombre = producto.nombre;
            detalle.cantidad = detalleDTO.cantidad;
            detalle.precioUnitario = precio;
            detalle.subtotal = subtotalLinea;
            pedido.addDetalle(detalle);
            subtotalPedido += subtotalLinea;
        }
        subtotalPedido = Math.round(subtotalPedido * 100.0) / 100.0;
        pedido.subtotal = subtotalPedido;
        pedido.total = subtotalPedido;
        return this.pedidoRepository.save(pedido);
    }
    async getPedidoPorId(id) {
        if (id == null) {
            throw new BadRequestException('No viene el id');
        }
        const pedidoBuscado = await this.pedidoRepository.findById(id);
        if (!pedidoBuscado) {
            throw new NotFoundException(`No existe el pedido con el id: ${id}`);
        }
        return pedidoBuscado;
    }
    getTodosLosPedidos() {
        return this.pedidoRepository.findAll();
    }
    getPedidosPorUsuario(usuario) {
        if (!usuario) {
            throw new BadRequestException('No viene el usuario');
        }
        return this.pedidoRepository.findByUsuario(usuario);
    }
    async cancelarPedido(id) {
        if (id == null) {
            throw new BadRequestException('No viene el id');
        }
        const pedido = await this.pedidoRepository.findById(id);
        if (!pedido) {
            throw new NotFoundException(`No existe el pedido con el id: ${id}`);
        }
        if (pedido.estado === 'CANCELADA' || pedido.estado === 'CANCELADO') {
            throw new BadRequestException('El pedido ya se encuentra cancelado');
        }
        if (pedido.detalles && pedido.detalles.length > 0) {
            for (const detalle of pedido.detalles) {
                if (detalle.productoCodigo && detalle.cantidad > 0) {
                    await this.productosClient.reponerStock(detalle.productoCodigo, detalle.cantidad);
                }
            }
        }
        pedido.estado = 'CANCELADO';
        return this.pedidoRepository.save(pedido);
    }
    async eliminarPedido(id) {
        if (await this.pedidoRepository.existsById(id)) {
            await this.pedidoRepository.deleteById(id);
            return true;
        }
        return false;
    }
};
PedidoServiceImpl = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [pedidoRepository,
        productosClient])
], PedidoServiceImpl);
export { PedidoServiceImpl };
//# sourceMappingURL=PedidoServiceImpl.js.map