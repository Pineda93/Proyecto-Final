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
import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { ProductosService } from './productos.service.js';
import { CrearProductoDto } from './dto/crear-producto.dto.js';
import { ActualizarProductoDto } from './dto/actualizar-producto.dto.js';
import { ActualizarEstadoProductoDto } from './dto/actualizar-estado-producto.dto.js';
import { ActualizarStockDto } from './dto/actualizar-stock.dto.js';
import { DescontarStockDto } from './dto/descontar-stock.dto.js';
import { ReponerStockDto } from './dto/reponer-stock.dto.js';
let ProductosController = class ProductosController {
    productosService;
    constructor(productosService) {
        this.productosService = productosService;
    }
    crear(dto) {
        return this.productosService.crear(dto);
    }
    listar() {
        return this.productosService.listar();
    }
    listarPorCategoria(categoria) {
        return this.productosService.listarPorCategoria(categoria);
    }
    listarPorEstado(estado) {
        return this.productosService.listarPorEstado(estado);
    }
    buscarPorCodigo(codigo) {
        return this.productosService.buscarPorCodigo(codigo);
    }
    actualizar(codigo, dto) {
        return this.productosService.actualizar(codigo, dto);
    }
    actualizarStock(codigo, dto) {
        return this.productosService.actualizarStock(codigo, dto);
    }
    descontarStock(codigo, dto) {
        return this.productosService.descontarStock(codigo, dto);
    }
    reponerStock(codigo, dto) {
        return this.productosService.reponerStock(codigo, dto);
    }
    actualizarEstado(codigo, dto) {
        return this.productosService.actualizarEstado(codigo, dto);
    }
    eliminar(codigo) {
        return this.productosService.eliminar(codigo);
    }
};
__decorate([
    Post(),
    ApiOperation({ summary: 'Crear un nuevo producto', description: 'Valida existencia inicial > 0 y precio > 0' }),
    ApiResponse({ status: 201, description: 'Producto creado exitosamente' }),
    ApiResponse({ status: 400, description: 'Datos inválidos o violan reglas de negocio' }),
    ApiResponse({ status: 409, description: 'Ya existe un producto con este código' }),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CrearProductoDto]),
    __metadata("design:returntype", void 0)
], ProductosController.prototype, "crear", null);
__decorate([
    Get(),
    ApiOperation({ summary: 'Listar todos los productos del catálogo' }),
    ApiResponse({ status: 200, description: 'Listado completo de productos' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProductosController.prototype, "listar", null);
__decorate([
    Get('categoria/:categoria'),
    ApiOperation({ summary: 'Listar productos filtrados por categoría' }),
    ApiParam({ name: 'categoria', example: 'Tecnología' }),
    ApiResponse({ status: 200, description: 'Productos de la categoría solicitada' }),
    __param(0, Param('categoria')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductosController.prototype, "listarPorCategoria", null);
__decorate([
    Get('estado/:estado'),
    ApiOperation({ summary: 'Listar productos filtrados por estado' }),
    ApiParam({ name: 'estado', example: 'DISPONIBLE' }),
    ApiResponse({ status: 200, description: 'Productos con el estado solicitado' }),
    __param(0, Param('estado')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductosController.prototype, "listarPorEstado", null);
__decorate([
    Get(':codigo'),
    ApiOperation({ summary: 'Buscar un producto por su código único' }),
    ApiParam({ name: 'codigo', example: 'PROD-1001' }),
    ApiResponse({ status: 200, description: 'Producto encontrado' }),
    ApiResponse({ status: 404, description: 'Producto no encontrado' }),
    __param(0, Param('codigo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductosController.prototype, "buscarPorCodigo", null);
__decorate([
    Patch(':codigo'),
    ApiOperation({ summary: 'Actualizar campos de un producto' }),
    ApiParam({ name: 'codigo', example: 'PROD-1001' }),
    ApiResponse({ status: 200, description: 'Producto actualizado' }),
    ApiResponse({ status: 404, description: 'Producto no encontrado' }),
    __param(0, Param('codigo')),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, ActualizarProductoDto]),
    __metadata("design:returntype", void 0)
], ProductosController.prototype, "actualizar", null);
__decorate([
    Patch(':codigo/stock'),
    ApiOperation({ summary: 'Actualizar manualmente el stock de un producto' }),
    ApiParam({ name: 'codigo', example: 'PROD-1001' }),
    ApiResponse({ status: 200, description: 'Stock actualizado' }),
    ApiResponse({ status: 404, description: 'Producto no encontrado' }),
    __param(0, Param('codigo')),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, ActualizarStockDto]),
    __metadata("design:returntype", void 0)
], ProductosController.prototype, "actualizarStock", null);
__decorate([
    Post(':codigo/descontar'),
    ApiOperation({
        summary: 'Descontar existencia del producto (usado por el servicio de pedidos)',
        description: 'Verifica stock disponible y descuenta. Si el stock llega a 0, marca el producto como AGOTADO.'
    }),
    ApiParam({ name: 'codigo', example: 'PROD-1001' }),
    ApiResponse({ status: 200, description: 'Existencia descontada exitosamente' }),
    ApiResponse({ status: 400, description: 'Existencia insuficiente o producto descontinuado' }),
    ApiResponse({ status: 404, description: 'Producto no encontrado' }),
    __param(0, Param('codigo')),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, DescontarStockDto]),
    __metadata("design:returntype", void 0)
], ProductosController.prototype, "descontarStock", null);
__decorate([
    Post(':codigo/reponer'),
    ApiOperation({
        summary: 'Reponer existencia del producto (usado al cancelar pedidos)',
        description: 'Incrementa el stock disponible. Si el producto estaba AGOTADO, se reactiva a DISPONIBLE.'
    }),
    ApiParam({ name: 'codigo', example: 'PROD-1001' }),
    ApiResponse({ status: 200, description: 'Existencia repuesta exitosamente' }),
    ApiResponse({ status: 404, description: 'Producto no encontrado' }),
    __param(0, Param('codigo')),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, ReponerStockDto]),
    __metadata("design:returntype", void 0)
], ProductosController.prototype, "reponerStock", null);
__decorate([
    Patch(':codigo/estado'),
    ApiOperation({ summary: 'Cambiar el estado de un producto' }),
    ApiParam({ name: 'codigo', example: 'PROD-1001' }),
    ApiResponse({ status: 200, description: 'Estado actualizado' }),
    ApiResponse({ status: 404, description: 'Producto no encontrado' }),
    __param(0, Param('codigo')),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, ActualizarEstadoProductoDto]),
    __metadata("design:returntype", void 0)
], ProductosController.prototype, "actualizarEstado", null);
__decorate([
    Delete(':codigo'),
    ApiOperation({ summary: 'Descontinuar producto (borrado lógico)' }),
    ApiParam({ name: 'codigo', example: 'PROD-1001' }),
    ApiResponse({ status: 200, description: 'Producto descontinuado' }),
    ApiResponse({ status: 404, description: 'Producto no encontrado' }),
    __param(0, Param('codigo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductosController.prototype, "eliminar", null);
ProductosController = __decorate([
    ApiTags('Productos'),
    Controller('productos'),
    __metadata("design:paramtypes", [ProductosService])
], ProductosController);
export { ProductosController };
//# sourceMappingURL=productos.controller.js.map