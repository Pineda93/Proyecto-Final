import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { DetallePedidoDTO } from './DetallePedidoDTO.js';

export class PedidoRequestDTO {
    @ApiPropertyOptional({ example: 'maria', description: 'Usuario que realiza el pedido' })
    @IsOptional()
    @IsString()
    usuario?: string;

    @ApiPropertyOptional({ type: [DetallePedidoDTO], description: 'Detalle de los productos en el pedido' })
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => DetallePedidoDTO)
    detalles?: DetallePedidoDTO[];

    @ApiPropertyOptional({ type: [DetallePedidoDTO], description: 'Alias alternativo para detalles' })
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => DetallePedidoDTO)
    items?: DetallePedidoDTO[];
}
