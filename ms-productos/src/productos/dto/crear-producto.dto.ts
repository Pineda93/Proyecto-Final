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
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CrearProductoDto {
    @ApiProperty({ example: 'PROD-1001', description: 'Código único del producto' })
    @IsString()
    codigo: string;

    @ApiProperty({ example: 'Laptop Gamer Legion 5', description: 'Nombre del producto' })
    @IsString()
    nombre: string;

    @ApiPropertyOptional({ example: 'AMD Ryzen 7, 16GB RAM', description: 'Descripción opcional' })
    @IsOptional()
    @IsString()
    descripcion?: string;

    @ApiProperty({ example: 'Tecnología', description: 'Categoría del producto' })
    @IsString()
    categoria: string;

    @ApiProperty({ example: 1250.00, description: 'Precio unitario (debe ser mayor a 0)' })
    @Type(() => Number)
    @IsNumber({ maxDecimalPlaces: 2 })
    @IsPositive({ message: 'El precio debe ser estrictamente mayor a 0' })
    precio: number;

    @ApiProperty({ example: 15, description: 'Existencia o stock inicial (debe ser mayor a 0)' })
    @Type(() => Number)
    @IsInt()
    @Min(1, { message: 'La existencia inicial debe ser mayor a 0' })
    stock: number;

    @ApiPropertyOptional({ example: 'DISPONIBLE', enum: ['DISPONIBLE', 'AGOTADO', 'DESCONTINUADO'] })
    @IsOptional()
    @IsIn(['DISPONIBLE', 'AGOTADO', 'DESCONTINUADO'])
    estado?: string;
}
