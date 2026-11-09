import { IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ActualizarEstadoProductoDto {
    @ApiProperty({ example: 'DISPONIBLE', enum: ['DISPONIBLE', 'AGOTADO', 'DESCONTINUADO'] })
    @IsIn(['DISPONIBLE', 'AGOTADO', 'DESCONTINUADO'])
    estado: string;
}
