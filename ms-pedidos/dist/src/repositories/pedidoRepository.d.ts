import { Repository } from 'typeorm';
import { Pedido } from '../models/Pedido.js';
export declare class pedidoRepository {
    private readonly repository;
    constructor(repository: Repository<Pedido>);
    findById(id: number): Promise<Pedido | null>;
    findAll(): Promise<Pedido[]>;
    save(pedido: Pedido): Promise<Pedido>;
    findByUsuario(usuario: string): Promise<Pedido[]>;
    existsById(id: number): Promise<boolean>;
    deleteById(id: number): Promise<boolean>;
}
