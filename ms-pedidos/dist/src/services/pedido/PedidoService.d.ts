import { PedidoRequestDTO } from '../../dto/PedidoRequestDTO.js';
import { Pedido } from '../../models/Pedido.js';
export interface PedidoService {
    registrarPedido(request: PedidoRequestDTO, usuarioHeader?: string): Promise<Pedido>;
    getPedidoPorId(id: number): Promise<Pedido | null>;
    getTodosLosPedidos(): Promise<Pedido[]>;
    getPedidosPorUsuario(usuario: string): Promise<Pedido[]>;
    cancelarPedido(id: number): Promise<Pedido>;
    eliminarPedido(id: number): Promise<boolean>;
}
