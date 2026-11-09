var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsInt, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
export class DetallePedidoDTO {
    productoCodigo;
    cantidad;
}
__decorate([
    ApiProperty({ example: 'C1', description: 'Código del producto a ordenar' }),
    IsString(),
    __metadata("design:type", String)
], DetallePedidoDTO.prototype, "productoCodigo", void 0);
__decorate([
    ApiProperty({ example: 2, description: 'Cantidad solicitada' }),
    Type(() => Number),
    IsInt({ message: 'La cantidad del producto debe ser un número entero' }),
    Min(1, { message: 'La cantidad del producto debe ser mayor a 0' }),
    __metadata("design:type", Number)
], DetallePedidoDTO.prototype, "cantidad", void 0);
//# sourceMappingURL=DetallePedidoDTO.js.map