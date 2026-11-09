import { IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ActualizarStockDto {
    @ApiProperty({ example: 30, description: 'Nuevo stock total del producto' })
    @Type(() => Number)
    @IsInt()
    @Min(0, { message: 'El stock no puede ser negativo' })
    stock: number;
}
