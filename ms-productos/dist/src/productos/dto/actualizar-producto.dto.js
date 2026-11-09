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
import { ApiPropertyOptional } from '@nestjs/swagger';
export class ActualizarProductoDto {
    nombre;
    descripcion;
    categoria;
    precio;
    stock;
    estado;
}
__decorate([
    ApiPropertyOptional({ example: 'Laptop Gamer Legion 5 Pro' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], ActualizarProductoDto.prototype, "nombre", void 0);
__decorate([
    ApiPropertyOptional({ example: 'AMD Ryzen 9, 32GB RAM' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], ActualizarProductoDto.prototype, "descripcion", void 0);
__decorate([
    ApiPropertyOptional({ example: 'Tecnología' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], ActualizarProductoDto.prototype, "categoria", void 0);
__decorate([
    ApiPropertyOptional({ example: 1399.99, description: 'Precio (debe ser mayor a 0 si se especifica)' }),
    IsOptional(),
    Type(() => Number),
    IsNumber({ maxDecimalPlaces: 2 }),
    IsPositive({ message: 'El precio debe ser estrictamente mayor a 0' }),
    __metadata("design:type", Number)
], ActualizarProductoDto.prototype, "precio", void 0);
__decorate([
    ApiPropertyOptional({ example: 20, description: 'Stock no negativo' }),
    IsOptional(),
    Type(() => Number),
    IsInt(),
    Min(0, { message: 'El stock no puede ser negativo' }),
    __metadata("design:type", Number)
], ActualizarProductoDto.prototype, "stock", void 0);
__decorate([
    ApiPropertyOptional({ enum: ['DISPONIBLE', 'AGOTADO', 'DESCONTINUADO'] }),
    IsOptional(),
    IsIn(['DISPONIBLE', 'AGOTADO', 'DESCONTINUADO']),
    __metadata("design:type", String)
], ActualizarProductoDto.prototype, "estado", void 0);
//# sourceMappingURL=actualizar-producto.dto.js.map