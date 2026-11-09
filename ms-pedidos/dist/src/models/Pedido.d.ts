import { type Relation } from 'typeorm';
import { DetallePedido } from './DetallePedido.js';
export declare class Pedido {
    id: number;
    usuario: string;
    subtotal: number;
    total: number;
    estado: string;
    fecha: Date;
    detalles: Relation<DetallePedido>[];
    addDetalle(detalle: DetallePedido): void;
}
