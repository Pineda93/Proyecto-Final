var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductosController } from './productos.controller.js';
import { ProductosService } from './productos.service.js';
import { Producto } from './producto.entity.js';
let ProductosModule = class ProductosModule {
};
ProductosModule = __decorate([
    Module({
        imports: [TypeOrmModule.forFeature([Producto])],
        controllers: [ProductosController],
        providers: [ProductosService],
        exports: [ProductosService],
    })
], ProductosModule);
export { ProductosModule };
//# sourceMappingURL=productos.module.js.map