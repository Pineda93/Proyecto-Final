import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('productos')
export class Producto {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    codigo: string;

    @Column()
    nombre: string;

    @Column({ nullable: true })
    descripcion: string;

    @Column()
    categoria: string;

    @Column('decimal', { precision: 10, scale: 2 })
    precio: number;

    @Column('int')
    stock: number;

    @Column({
        type: 'enum',
        enum: ['DISPONIBLE', 'AGOTADO', 'DESCONTINUADO'],
        default: 'DISPONIBLE',
    })
    estado: string;
}
