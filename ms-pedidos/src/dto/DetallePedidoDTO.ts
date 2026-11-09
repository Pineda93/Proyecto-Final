import { IsInt, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class DetallePedidoDTO {
    @ApiProperty({ example: 'C1', description: 'Código del producto a ordenar' })
    @IsString()
    productoCodigo: string;

    @ApiProperty({ example: 2, description: 'Cantidad solicitada' })
    @Type(() => Number)
    @IsInt({ message: 'La cantidad del producto debe ser un número entero' })
    @Min(1, { message: 'La cantidad del producto debe ser mayor a 0' })
    cantidad: number;
}
