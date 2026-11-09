var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { DetallePedidoDTO } from './DetallePedidoDTO.js';
export class PedidoRequestDTO {
    usuario;
    detalles;
    items;
}
__decorate([
    ApiPropertyOptional({ example: 'maria', description: 'Usuario que realiza el pedido' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], PedidoRequestDTO.prototype, "usuario", void 0);
__decorate([
    ApiPropertyOptional({ type: [DetallePedidoDTO], description: 'Detalle de los productos en el pedido' }),
    IsOptional(),
    IsArray(),
    ValidateNested({ each: true }),
    Type(() => DetallePedidoDTO),
    __metadata("design:type", Array)
], PedidoRequestDTO.prototype, "detalles", void 0);
__decorate([
    ApiPropertyOptional({ type: [DetallePedidoDTO], description: 'Alias alternativo para detalles' }),
    IsOptional(),
    IsArray(),
    ValidateNested({ each: true }),
    Type(() => DetallePedidoDTO),
    __metadata("design:type", Array)
], PedidoRequestDTO.prototype, "items", void 0);
//# sourceMappingURL=PedidoRequestDTO.js.map