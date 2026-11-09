import {
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    type Relation,
} from 'typeorm';
import { Pedido } from './Pedido.js';

@Entity('detalle_pedidos')
export class DetallePedido {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    productoCodigo: string;

    @Column({ nullable: true })
    productoNombre: string;

    @Column('int')
    cantidad: number;

    @Column('decimal', { precision: 10, scale: 2 })
    precioUnitario: number;

    @Column('decimal', { precision: 10, scale: 2 })
    subtotal: number;

    @ManyToOne(() => Pedido, (pedido) => pedido.detalles, {
        onDelete: 'CASCADE',
    })
    pedido: Relation<Pedido>;

    toJSON() {
        const { pedido, ...rest } = this as any;
        return rest;
    }
}
