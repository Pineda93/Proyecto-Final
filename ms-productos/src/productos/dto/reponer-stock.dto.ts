import { IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ReponerStockDto {
    @ApiProperty({ example: 2, description: 'Cantidad a retornar al inventario (mínimo 1)' })
    @Type(() => Number)
    @IsInt()
    @Min(1, { message: 'La cantidad a reponer debe ser al menos 1' })
    cantidad: number;
}
