import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pedido } from '../models/Pedido.js';

@Injectable()
export class pedidoRepository {
    constructor(
        @InjectRepository(Pedido)
        private readonly repository: Repository<Pedido>,
    ) {}

    findById(id: number): Promise<Pedido | null> {
        return this.repository.findOne({ where: { id }, relations: { detalles: true } });
    }

    findAll(): Promise<Pedido[]> {
        return this.repository.find({ order: { fecha: 'DESC' } });
    }

    save(pedido: Pedido): Promise<Pedido> {
        return this.repository.save(pedido);
    }

    findByUsuario(usuario: string): Promise<Pedido[]> {
        return this.repository.find({ where: { usuario }, order: { fecha: 'DESC' } });
    }

    async existsById(id: number): Promise<boolean> {
        const count = await this.repository.count({ where: { id } });
        return count > 0;
    }

    async deleteById(id: number): Promise<boolean> {
        const resultado = await this.repository.delete(id);
        return (resultado.affected ?? 0) > 0;
    }
}
