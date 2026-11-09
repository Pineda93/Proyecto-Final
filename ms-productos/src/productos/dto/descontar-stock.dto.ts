import { IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class DescontarStockDto {
    @ApiProperty({ example: 2, description: 'Cantidad a descontar de la existencia (mínimo 1)' })
    @Type(() => Number)
    @IsInt()
    @Min(1, { message: 'La cantidad a descontar debe ser al menos 1' })
    cantidad: number;
}
