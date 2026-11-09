import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { ProductosService } from './productos.service.js';
import { CrearProductoDto } from './dto/crear-producto.dto.js';
import { ActualizarProductoDto } from './dto/actualizar-producto.dto.js';
import { ActualizarEstadoProductoDto } from './dto/actualizar-estado-producto.dto.js';
import { ActualizarStockDto } from './dto/actualizar-stock.dto.js';
import { DescontarStockDto } from './dto/descontar-stock.dto.js';
import { ReponerStockDto } from './dto/reponer-stock.dto.js';

@ApiTags('Productos')
@Controller('productos')
export class ProductosController {
    constructor(private readonly productosService: ProductosService) {}

    @Post()
    @ApiOperation({ summary: 'Crear un nuevo producto', description: 'Valida existencia inicial > 0 y precio > 0' })
    @ApiResponse({ status: 201, description: 'Producto creado exitosamente' })
    @ApiResponse({ status: 400, description: 'Datos inválidos o violan reglas de negocio' })
    @ApiResponse({ status: 409, description: 'Ya existe un producto con este código' })
    crear(@Body() dto: CrearProductoDto) {
        return this.productosService.crear(dto);
    }

    @Get()
    @ApiOperation({ summary: 'Listar todos los productos del catálogo' })
    @ApiResponse({ status: 200, description: 'Listado completo de productos' })
    listar() {
        return this.productosService.listar();
    }

    @Get('categoria/:categoria')
    @ApiOperation({ summary: 'Listar productos filtrados por categoría' })
    @ApiParam({ name: 'categoria', example: 'Tecnología' })
    @ApiResponse({ status: 200, description: 'Productos de la categoría solicitada' })
    listarPorCategoria(@Param('categoria') categoria: string) {
        return this.productosService.listarPorCategoria(categoria);
    }

    @Get('estado/:estado')
    @ApiOperation({ summary: 'Listar productos filtrados por estado' })
    @ApiParam({ name: 'estado', example: 'DISPONIBLE' })
    @ApiResponse({ status: 200, description: 'Productos con el estado solicitado' })
    listarPorEstado(@Param('estado') estado: string) {
        return this.productosService.listarPorEstado(estado);
    }

    @Get(':codigo')
    @ApiOperation({ summary: 'Buscar un producto por su código único' })
    @ApiParam({ name: 'codigo', example: 'PROD-1001' })
    @ApiResponse({ status: 200, description: 'Producto encontrado' })
    @ApiResponse({ status: 404, description: 'Producto no encontrado' })
    buscarPorCodigo(@Param('codigo') codigo: string) {
        return this.productosService.buscarPorCodigo(codigo);
    }

    @Patch(':codigo')
    @ApiOperation({ summary: 'Actualizar campos de un producto' })
    @ApiParam({ name: 'codigo', example: 'PROD-1001' })
    @ApiResponse({ status: 200, description: 'Producto actualizado' })
    @ApiResponse({ status: 404, description: 'Producto no encontrado' })
    actualizar(@Param('codigo') codigo: string, @Body() dto: ActualizarProductoDto) {
        return this.productosService.actualizar(codigo, dto);
    }

    @Patch(':codigo/stock')
    @ApiOperation({ summary: 'Actualizar manualmente el stock de un producto' })
    @ApiParam({ name: 'codigo', example: 'PROD-1001' })
    @ApiResponse({ status: 200, description: 'Stock actualizado' })
    @ApiResponse({ status: 404, description: 'Producto no encontrado' })
    actualizarStock(@Param('codigo') codigo: string, @Body() dto: ActualizarStockDto) {
        return this.productosService.actualizarStock(codigo, dto);
    }

    @Post(':codigo/descontar')
    @ApiOperation({
        summary: 'Descontar existencia del producto (usado por el servicio de pedidos)',
        description: 'Verifica stock disponible y descuenta. Si el stock llega a 0, marca el producto como AGOTADO.'
    })
    @ApiParam({ name: 'codigo', example: 'PROD-1001' })
    @ApiResponse({ status: 200, description: 'Existencia descontada exitosamente' })
    @ApiResponse({ status: 400, description: 'Existencia insuficiente o producto descontinuado' })
    @ApiResponse({ status: 404, description: 'Producto no encontrado' })
    descontarStock(@Param('codigo') codigo: string, @Body() dto: DescontarStockDto) {
        return this.productosService.descontarStock(codigo, dto);
    }

    @Post(':codigo/reponer')
    @ApiOperation({
        summary: 'Reponer existencia del producto (usado al cancelar pedidos)',
        description: 'Incrementa el stock disponible. Si el producto estaba AGOTADO, se reactiva a DISPONIBLE.'
    })
    @ApiParam({ name: 'codigo', example: 'PROD-1001' })
    @ApiResponse({ status: 200, description: 'Existencia repuesta exitosamente' })
    @ApiResponse({ status: 404, description: 'Producto no encontrado' })
    reponerStock(@Param('codigo') codigo: string, @Body() dto: ReponerStockDto) {
        return this.productosService.reponerStock(codigo, dto);
    }

    @Patch(':codigo/estado')
    @ApiOperation({ summary: 'Cambiar el estado de un producto' })
    @ApiParam({ name: 'codigo', example: 'PROD-1001' })
    @ApiResponse({ status: 200, description: 'Estado actualizado' })
    @ApiResponse({ status: 404, description: 'Producto no encontrado' })
    actualizarEstado(@Param('codigo') codigo: string, @Body() dto: ActualizarEstadoProductoDto) {
        return this.productosService.actualizarEstado(codigo, dto);
    }

    @Delete(':codigo')
    @ApiOperation({ summary: 'Descontinuar producto (borrado lógico)' })
    @ApiParam({ name: 'codigo', example: 'PROD-1001' })
    @ApiResponse({ status: 200, description: 'Producto descontinuado' })
    @ApiResponse({ status: 404, description: 'Producto no encontrado' })
    eliminar(@Param('codigo') codigo: string) {
        return this.productosService.eliminar(codigo);
    }
}
