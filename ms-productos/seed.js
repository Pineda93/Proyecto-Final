import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const productosIniciales = [
  { codigo: 'PROD-1001', nombre: 'Laptop Gamer Legion 5', descripcion: 'AMD Ryzen 7, 16GB RAM, RTX 4060', categoria: 'Tecnología', precio: 1250.00, stock: 15, estado: 'DISPONIBLE' },
  { codigo: 'PROD-1002', nombre: 'Mouse Inalámbrico MX Master 3S', descripcion: 'Sensor 8000 DPI, scroll electromagnético', categoria: 'Tecnología', precio: 99.99, stock: 40, estado: 'DISPONIBLE' },
  { codigo: 'PROD-1003', nombre: 'Teclado Mecánico RGB', descripcion: 'Switches Red lineales, formato TKL', categoria: 'Tecnología', precio: 75.50, stock: 25, estado: 'DISPONIBLE' },
  { codigo: 'PROD-1004', nombre: 'Monitor 27" 165Hz IPS', descripcion: 'Resolución QHD 2560x1440, 1ms', categoria: 'Tecnología', precio: 280.00, stock: 10, estado: 'DISPONIBLE' },
  { codigo: 'PROD-1005', nombre: 'Café de Especialidad 500g', descripcion: 'Granos de altura tostado medio', categoria: 'Bebidas', precio: 12.00, stock: 80, estado: 'DISPONIBLE' },
  { codigo: 'PROD-1006', nombre: 'Té Verde Matcha Orgánico', descripcion: 'Grado ceremonial de 100g', categoria: 'Bebidas', precio: 18.50, stock: 50, estado: 'DISPONIBLE' },
  { codigo: 'PROD-1007', nombre: 'Pack Cerveza Artesanal IPA 6x', descripcion: 'Elaboración local con lúpulo cítrico', categoria: 'Bebidas', precio: 14.00, stock: 35, estado: 'DISPONIBLE' },
  { codigo: 'PROD-1008', nombre: 'Papas Artesanales Sal Marina', descripcion: 'Bolsa familiar de 180g', categoria: 'Snacks', precio: 3.50, stock: 120, estado: 'DISPONIBLE' },
  { codigo: 'PROD-1009', nombre: 'Mix Frutos Secos Premium 250g', descripcion: 'Almendras, nueces, arándanos y castañas', categoria: 'Snacks', precio: 6.75, stock: 60, estado: 'DISPONIBLE' },
  { codigo: 'PROD-1010', nombre: 'Chocolate Negro 85% Cacao', descripcion: 'Tableta artesanal de 100g', categoria: 'Snacks', precio: 4.25, stock: 90, estado: 'DISPONIBLE' },
  { codigo: 'PROD-1011', nombre: 'Camiseta Básica de Algodón', descripcion: '100% algodón peinado color negro', categoria: 'Ropa', precio: 15.00, stock: 50, estado: 'DISPONIBLE' },
  { codigo: 'PROD-1012', nombre: 'Sudadera con Capucha (Hoodie)', descripcion: 'Interior frizado unisex talla L', categoria: 'Ropa', precio: 35.00, stock: 0, estado: 'AGOTADO' },
];

async function seed() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'ecommerce_productos',
  });

  console.log('Conectado a MySQL para sembrar productos iniciales...');

  // Asegurar tabla si no existe
  await connection.execute(`
    CREATE TABLE IF NOT EXISTS productos (
      id INT AUTO_INCREMENT PRIMARY KEY,
      codigo VARCHAR(255) NOT NULL UNIQUE,
      nombre VARCHAR(255) NOT NULL,
      descripcion VARCHAR(255) NULL,
      categoria VARCHAR(255) NOT NULL,
      precio DECIMAL(10,2) NOT NULL,
      stock INT NOT NULL,
      estado ENUM('DISPONIBLE', 'AGOTADO', 'DESCONTINUADO') DEFAULT 'DISPONIBLE'
    );
  `);

  for (const p of productosIniciales) {
    await connection.execute(`
      INSERT INTO productos (codigo, nombre, descripcion, categoria, precio, stock, estado)
      VALUES (?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        nombre = VALUES(nombre),
        descripcion = VALUES(descripcion),
        categoria = VALUES(categoria),
        precio = VALUES(precio),
        stock = VALUES(stock),
        estado = VALUES(estado)
    `, [p.codigo, p.nombre, p.descripcion, p.categoria, p.precio, p.stock, p.estado]);
  }

  const [filas] = await connection.execute('SELECT COUNT(*) as total FROM productos');
  console.log(`Catálogo sembrado con éxito. Total productos: ${filas[0].total}`);

  await connection.end();
}

seed().catch(err => {
  console.error('Error al sembrar catálogo:', err);
  process.exit(1);
});
