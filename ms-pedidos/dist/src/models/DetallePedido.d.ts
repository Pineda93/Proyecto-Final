import { type Relation } from 'typeorm';
import { Pedido } from './Pedido.js';
export declare class DetallePedido {
    id: number;
    productoCodigo: string;
    productoNombre: string;
    cantidad: number;
    precioUnitario: number;
    subtotal: number;
    pedido: Relation<Pedido>;
    toJSON(): any;
}
