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

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST', 'localhost'),
        port: configService.get<number>('DB_PORT', 3306),
        username: configService.get<string>('DB_USERNAME', 'root'),
        password: configService.get<string>('DB_PASSWORD', ''),
        database: configService.get<string>('DB_NAME', 'ecommerce_pedidos'),
        ssl: configService.get<string>('DB_SSL') === 'true' ? { rejectUnauthorized: false } : false,
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
export class AppModule {}
