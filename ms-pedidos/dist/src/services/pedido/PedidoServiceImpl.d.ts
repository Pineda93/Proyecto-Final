import { PedidoService } from './PedidoService.js';
import { pedidoRepository } from '../../repositories/pedidoRepository.js';
import { productosClient } from '../../integration/productosClient.js';
import { PedidoRequestDTO } from '../../dto/PedidoRequestDTO.js';
import { Pedido } from '../../models/Pedido.js';
export declare class PedidoServiceImpl implements PedidoService {
    private readonly pedidoRepository;
    private readonly productosClient;
    constructor(pedidoRepository: pedidoRepository, productosClient: productosClient);
    registrarPedido(request: PedidoRequestDTO, usuarioHeader?: string): Promise<Pedido>;
    getPedidoPorId(id: number): Promise<Pedido | null>;
    getTodosLosPedidos(): Promise<Pedido[]>;
    getPedidosPorUsuario(usuario: string): Promise<Pedido[]>;
    cancelarPedido(id: number): Promise<Pedido>;
    eliminarPedido(id: number): Promise<boolean>;
}
