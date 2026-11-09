import {
    IsInt,
    IsString,
    IsNumber,
    Min,
    IsIn,
    IsOptional,
    IsPositive,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class ActualizarProductoDto {
    @ApiPropertyOptional({ example: 'Laptop Gamer Legion 5 Pro' })
    @IsOptional()
    @IsString()
    nombre?: string;

    @ApiPropertyOptional({ example: 'AMD Ryzen 9, 32GB RAM' })
    @IsOptional()
    @IsString()
    descripcion?: string;

    @ApiPropertyOptional({ example: 'Tecnología' })
    @IsOptional()
    @IsString()
    categoria?: string;

    @ApiPropertyOptional({ example: 1399.99, description: 'Precio (debe ser mayor a 0 si se especifica)' })
    @IsOptional()
    @Type(() => Number)
    @IsNumber({ maxDecimalPlaces: 2 })
    @IsPositive({ message: 'El precio debe ser estrictamente mayor a 0' })
    precio?: number;

    @ApiPropertyOptional({ example: 20, description: 'Stock no negativo' })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(0, { message: 'El stock no puede ser negativo' })
    stock?: number;

    @ApiPropertyOptional({ enum: ['DISPONIBLE', 'AGOTADO', 'DESCONTINUADO'] })
    @IsOptional()
    @IsIn(['DISPONIBLE', 'AGOTADO', 'DESCONTINUADO'])
    estado?: string;
}
