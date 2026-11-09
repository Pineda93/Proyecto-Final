var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, } from 'typeorm';
import { DetallePedido } from './DetallePedido.js';
let Pedido = class Pedido {
    id;
    usuario;
    subtotal;
    total;
    estado;
    fecha;
    detalles;
    addDetalle(detalle) {
        if (!this.detalles) {
            this.detalles = [];
        }
        this.detalles.push(detalle);
        detalle.pedido = this;
    }
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Pedido.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Pedido.prototype, "usuario", void 0);
__decorate([
    Column('decimal', { precision: 10, scale: 2, default: 0.0 }),
    __metadata("design:type", Number)
], Pedido.prototype, "subtotal", void 0);
__decorate([
    Column('decimal', { precision: 10, scale: 2, default: 0.0 }),
    __metadata("design:type", Number)
], Pedido.prototype, "total", void 0);
__decorate([
    Column({ default: 'COMPLETADO' }),
    __metadata("design:type", String)
], Pedido.prototype, "estado", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], Pedido.prototype, "fecha", void 0);
__decorate([
    OneToMany(() => DetallePedido, (detalle) => detalle.pedido, {
        cascade: true,
        eager: true,
    }),
    __metadata("design:type", Array)
], Pedido.prototype, "detalles", void 0);
Pedido = __decorate([
    Entity('pedidos')
], Pedido);
export { Pedido };
//# sourceMappingURL=Pedido.js.map