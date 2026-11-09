var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pedido } from './models/Pedido.js';
import { DetallePedido } from './models/DetallePedido.js';
import { pedidoRepository } from './repositories/pedidoRepository.js';
import { detallePedidoRepository } from './repositories/detallePedidoRepository.js';
import { productosClient } from './integration/productosClient.js';
import { PedidoServiceImpl } from './services/pedido/PedidoServiceImpl.js';
import { PedidoController } from './controllers/PedidoController.js';
let AppModule = class AppModule {
};
AppModule = __decorate([
    Module({
        imports: [
            ConfigModule.forRoot({ isGlobal: true }),
            TypeOrmModule.forRootAsync({
                inject: [ConfigService],
                useFactory: (configService) => ({
                    type: 'mysql',
                    host: configService.get('DB_HOST', 'localhost'),
                    port: configService.get('DB_PORT', 3306),
                    username: configService.get('DB_USERNAME', 'root'),
                    password: configService.get('DB_PASSWORD', ''),
                    database: configService.get('DB_NAME', 'ecommerce_pedidos'),
                    ssl: configService.get('DB_SSL') === 'true' ? { rejectUnauthorized: false } : false,
                    entities: [Pedido, DetallePedido],
                    autoLoadEntities: true,
                    synchronize: true,
                }),
            }),
            TypeOrmModule.forFeature([Pedido, DetallePedido]),
        ],
        controllers: [PedidoController],
        providers: [
            pedidoRepository,
            detallePedidoRepository,
            productosClient,
            PedidoServiceImpl,
        ],
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map