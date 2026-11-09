import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    type Relation,
} from 'typeorm';
import { DetallePedido } from './DetallePedido.js';

@Entity('pedidos')
export class Pedido {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    usuario: string;

    @Column('decimal', { precision: 10, scale: 2, default: 0.0 })
    subtotal: number;

    @Column('decimal', { precision: 10, scale: 2, default: 0.0 })
    total: number;

    @Column({ default: 'COMPLETADO' })
    estado: string;

    @CreateDateColumn()
    fecha: Date;

    @OneToMany(() => DetallePedido, (detalle) => detalle.pedido, {
        cascade: true,
        eager: true,
    })
    detalles: Relation<DetallePedido>[];

    addDetalle(detalle: DetallePedido) {
        if (!this.detalles) {
            this.detalles = [];
        }
        this.detalles.push(detalle);
        detalle.pedido = this;
    }
}
