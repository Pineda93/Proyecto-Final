import { PedidoServiceImpl } from '../services/pedido/PedidoServiceImpl.js';
import { PedidoRequestDTO } from '../dto/PedidoRequestDTO.js';
export declare class PedidoController {
    private readonly pedidoService;
    constructor(pedidoService: PedidoServiceImpl);
    registrarPedido(request: PedidoRequestDTO, usuarioHeader?: string): Promise<import("../models/Pedido.js").Pedido>;
    getPedidoPorId(id: number): Promise<import("../models/Pedido.js").Pedido | null>;
    getTodosLosPedidos(): Promise<import("../models/Pedido.js").Pedido[]>;
    getPedidosPorUsuario(usuario: string): Promise<import("../models/Pedido.js").Pedido[]>;
    cancelarPedido(id: number): Promise<import("../models/Pedido.js").Pedido>;
    eliminarPedido(id: number): Promise<boolean>;
}
