import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DetallePedido } from '../models/DetallePedido.js';

@Injectable()
export class detallePedidoRepository {
    constructor(
        @InjectRepository(DetallePedido)
        private readonly repository: Repository<DetallePedido>,
    ) {}

    save(detalle: DetallePedido): Promise<DetallePedido> {
        return this.repository.save(detalle);
    }

    findAll(): Promise<DetallePedido[]> {
        return this.repository.find();
    }
}
