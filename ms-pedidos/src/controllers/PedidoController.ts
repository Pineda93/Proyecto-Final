import {
    Body,
    Controller,
    Delete,
    Get,
    Headers,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Put,
} from '@nestjs/common';
import {
    ApiOperation,
    ApiParam,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { PedidoServiceImpl } from '../services/pedido/PedidoServiceImpl.js';
import { PedidoRequestDTO } from '../dto/PedidoRequestDTO.js';

@ApiTags('Pedidos')
@Controller(['pedidos', 'pedido'])
export class PedidoController {
    constructor(private readonly pedidoService: PedidoServiceImpl) {}

    @Post()
    @ApiOperation({
        summary: 'Registrar un nuevo pedido',
        description: 'Valida existencia previa en ms-productos y descuenta el stock de forma automática',
    })
    @ApiResponse({ status: 201, description: 'Pedido registrado con éxito' })
    @ApiResponse({ status: 400, description: 'Stock insuficiente o datos inválidos' })
    @ApiResponse({ status: 404, description: 'Producto no encontrado en ms-productos' })
    registrarPedido(
        @Body() request: PedidoRequestDTO,
        @Headers('x-usuario') usuarioHeader?: string,
    ) {
        return this.pedidoService.registrarPedido(request, usuarioHeader);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener pedido por ID' })
    @ApiParam({ name: 'id', example: 1 })
    getPedidoPorId(@Param('id', ParseIntPipe) id: number) {
        return this.pedidoService.getPedidoPorId(id);
    }

    @Get()
    @ApiOperation({ summary: 'Obtener todos los pedidos' })
    getTodosLosPedidos() {
        return this.pedidoService.getTodosLosPedidos();
    }

    @Get('usuario/:usuario')
    @ApiOperation({ summary: 'Obtener pedidos por usuario' })
    @ApiParam({ name: 'usuario', example: 'maria' })
    getPedidosPorUsuario(@Param('usuario') usuario: string) {
        return this.pedidoService.getPedidosPorUsuario(usuario);
    }


    @Put(':id/cancelar')
    @Patch(':id/cancelar')
    @ApiOperation({ summary: 'Cancelar un pedido por ID' })
    @ApiParam({ name: 'id', example: 1 })
    cancelarPedido(@Param('id', ParseIntPipe) id: number) {
        return this.pedidoService.cancelarPedido(id);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar un pedido por ID' })
    @ApiParam({ name: 'id', example: 1 })
    eliminarPedido(@Param('id', ParseIntPipe) id: number) {
        return this.pedidoService.eliminarPedido(id);
    }
}
