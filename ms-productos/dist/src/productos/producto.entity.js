var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, Entity, PrimaryGeneratedColumn, } from 'typeorm';
let Producto = class Producto {
    id;
    codigo;
    nombre;
    descripcion;
    categoria;
    precio;
    stock;
    estado;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Producto.prototype, "id", void 0);
__decorate([
    Column({ unique: true }),
    __metadata("design:type", String)
], Producto.prototype, "codigo", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Producto.prototype, "nombre", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], Producto.prototype, "descripcion", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Producto.prototype, "categoria", void 0);
__decorate([
    Column('decimal', { precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Producto.prototype, "precio", void 0);
__decorate([
    Column('int'),
    __metadata("design:type", Number)
], Producto.prototype, "stock", void 0);
__decorate([
    Column({
        type: 'enum',
        enum: ['DISPONIBLE', 'AGOTADO', 'DESCONTINUADO'],
        default: 'DISPONIBLE',
    }),
    __metadata("design:type", String)
], Producto.prototype, "estado", void 0);
Producto = __decorate([
    Entity('productos')
], Producto);
export { Producto };
//# sourceMappingURL=producto.entity.js.map