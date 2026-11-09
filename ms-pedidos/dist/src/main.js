import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    const config = new DocumentBuilder()
        .setTitle('Microservicio de Pedidos')
        .setDescription('API REST del servicio de pedidos (Arquitectura en Capas con TypeORM y MySQL)')
        .setVersion('1.0')
        .addTag('Pedidos', 'Gestión de órdenes, compras y verificación de existencias')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);
    const puerto = process.env.PORT ?? 3002;
    await app.listen(puerto);
    console.log(`Microservicio de pedidos escuchando en el puerto ${puerto}`);
    console.log(`Swagger disponible en: http://localhost:${puerto}/docs`);
}
await bootstrap();
//# sourceMappingURL=main.js.map