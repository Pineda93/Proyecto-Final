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
import { Body, Controller, Delete, Get, Headers, Param, ParseIntPipe, Patch, Post, Put, } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags, } from '@nestjs/swagger';
import { PedidoServiceImpl } from '../services/pedido/PedidoServiceImpl.js';
import { PedidoRequestDTO } from '../dto/PedidoRequestDTO.js';
let PedidoController = class PedidoController {
    pedidoService;
    constructor(pedidoService) {
        this.pedidoService = pedidoService;
    }
    registrarPedido(request, usuarioHeader) {
        return this.pedidoService.registrarPedido(request, usuarioHeader);
    }
    getPedidoPorId(id) {
        return this.pedidoService.getPedidoPorId(id);
    }
    getTodosLosPedidos() {
        return this.pedidoService.getTodosLosPedidos();
    }
    getPedidosPorUsuario(usuario) {
        return this.pedidoService.getPedidosPorUsuario(usuario);
    }
    cancelarPedido(id) {
        return this.pedidoService.cancelarPedido(id);
    }
    eliminarPedido(id) {
        return this.pedidoService.eliminarPedido(id);
    }
};
__decorate([
    Post(),
    ApiOperation({
        summary: 'Registrar un nuevo pedido',
        description: 'Valida existencia previa en ms-productos y descuenta el stock de forma automática',
    }),
    ApiResponse({ status: 201, description: 'Pedido registrado con éxito' }),
    ApiResponse({ status: 400, description: 'Stock insuficiente o datos inválidos' }),
    ApiResponse({ status: 404, description: 'Producto no encontrado en ms-productos' }),
    __param(0, Body()),
    __param(1, Headers('x-usuario')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [PedidoRequestDTO, String]),
    __metadata("design:returntype", void 0)
], PedidoController.prototype, "registrarPedido", null);
__decorate([
    Get(':id'),
    ApiOperation({ summary: 'Obtener pedido por ID' }),
    ApiParam({ name: 'id', example: 1 }),
    __param(0, Param('id', ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PedidoController.prototype, "getPedidoPorId", null);
__decorate([
    Get(),
    ApiOperation({ summary: 'Obtener todos los pedidos' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PedidoController.prototype, "getTodosLosPedidos", null);
__decorate([
    Get('usuario/:usuario'),
    ApiOperation({ summary: 'Obtener pedidos por usuario' }),
    ApiParam({ name: 'usuario', example: 'maria' }),
    __param(0, Param('usuario')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PedidoController.prototype, "getPedidosPorUsuario", null);
__decorate([
    Put(':id/cancelar'),
    Patch(':id/cancelar'),
    ApiOperation({ summary: 'Cancelar un pedido por ID' }),
    ApiParam({ name: 'id', example: 1 }),
    __param(0, Param('id', ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PedidoController.prototype, "cancelarPedido", null);
__decorate([
    Delete(':id'),
    ApiOperation({ summary: 'Eliminar un pedido por ID' }),
    ApiParam({ name: 'id', example: 1 }),
    __param(0, Param('id', ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PedidoController.prototype, "eliminarPedido", null);
PedidoController = __decorate([
    ApiTags('Pedidos'),
    Controller(['pedidos', 'pedido']),
    __metadata("design:paramtypes", [PedidoServiceImpl])
], PedidoController);
export { PedidoController };
//# sourceMappingURL=PedidoController.js.map