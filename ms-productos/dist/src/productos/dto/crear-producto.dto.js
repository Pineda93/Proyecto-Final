var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsInt, IsString, IsNumber, Min, IsIn, IsOptional, IsPositive, } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export class CrearProductoDto {
    codigo;
    nombre;
    descripcion;
    categoria;
    precio;
    stock;
    estado;
}
__decorate([
    ApiProperty({ example: 'PROD-1001', description: 'Código único del producto' }),
    IsString(),
    __metadata("design:type", String)
], CrearProductoDto.prototype, "codigo", void 0);
__decorate([
    ApiProperty({ example: 'Laptop Gamer Legion 5', description: 'Nombre del producto' }),
    IsString(),
    __metadata("design:type", String)
], CrearProductoDto.prototype, "nombre", void 0);
__decorate([
    ApiPropertyOptional({ example: 'AMD Ryzen 7, 16GB RAM', description: 'Descripción opcional' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], CrearProductoDto.prototype, "descripcion", void 0);
__decorate([
    ApiProperty({ example: 'Tecnología', description: 'Categoría del producto' }),
    IsString(),
    __metadata("design:type", String)
], CrearProductoDto.prototype, "categoria", void 0);
__decorate([
    ApiProperty({ example: 1250.00, description: 'Precio unitario (debe ser mayor a 0)' }),
    Type(() => Number),
    IsNumber({ maxDecimalPlaces: 2 }),
    IsPositive({ message: 'El precio debe ser estrictamente mayor a 0' }),
    __metadata("design:type", Number)
], CrearProductoDto.prototype, "precio", void 0);
__decorate([
    ApiProperty({ example: 15, description: 'Existencia o stock inicial (debe ser mayor a 0)' }),
    Type(() => Number),
    IsInt(),
    Min(1, { message: 'La existencia inicial debe ser mayor a 0' }),
    __metadata("design:type", Number)
], CrearProductoDto.prototype, "stock", void 0);
__decorate([
    ApiPropertyOptional({ example: 'DISPONIBLE', enum: ['DISPONIBLE', 'AGOTADO', 'DESCONTINUADO'] }),
    IsOptional(),
    IsIn(['DISPONIBLE', 'AGOTADO', 'DESCONTINUADO']),
    __metadata("design:type", String)
], CrearProductoDto.prototype, "estado", void 0);
//# sourceMappingURL=crear-producto.dto.js.map