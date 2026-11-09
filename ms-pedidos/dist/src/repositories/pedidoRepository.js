var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pedido } from '../models/Pedido.js';
let pedidoRepository = class pedidoRepository {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    findById(id) {
        return this.repository.findOne({ where: { id }, relations: { detalles: true } });
    }
    findAll() {
        return this.repository.find({ order: { fecha: 'DESC' } });
    }
    save(pedido) {
        return this.repository.save(pedido);
    }
    findByUsuario(usuario) {
        return this.repository.find({ where: { usuario }, order: { fecha: 'DESC' } });
    }
    async existsById(id) {
        const count = await this.repository.count({ where: { id } });
        return count > 0;
    }
    async deleteById(id) {
        const resultado = await this.repository.delete(id);
        return (resultado.affected ?? 0) > 0;
    }
};
pedidoRepository = __decorate([
    Injectable(),
    __param(0, InjectRepository(Pedido)),
    __metadata("design:paramtypes", [Repository])
], pedidoRepository);
export { pedidoRepository };
//# sourceMappingURL=pedidoRepository.js.map