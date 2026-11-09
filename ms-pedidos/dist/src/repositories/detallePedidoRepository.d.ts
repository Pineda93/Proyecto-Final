import { Repository } from 'typeorm';
import { DetallePedido } from '../models/DetallePedido.js';
export declare class detallePedidoRepository {
    private readonly repository;
    constructor(repository: Repository<DetallePedido>);
    save(detalle: DetallePedido): Promise<DetallePedido>;
    findAll(): Promise<DetallePedido[]>;
}
