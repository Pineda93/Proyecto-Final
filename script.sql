-- Broker
CREATE DATABASE IF NOT EXISTS ecommerce_broker CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE ecommerce_broker;

CREATE TABLE IF NOT EXISTS usuarios (
  usuario VARCHAR(50) NOT NULL PRIMARY KEY,
  password_hash VARCHAR(255) NOT NULL,
  rol ENUM('admin', 'usuario') NOT NULL DEFAULT 'usuario',
  estado ENUM('activo', 'baneado') NOT NULL DEFAULT 'activo'
);

-- Usuarios iniciales con contraseñas: admin123, maria123, carlos123
INSERT INTO usuarios (usuario, password_hash, rol, estado) VALUES
('admin', 'aae0def1a3424421c12e636dc4dfd6e9$5fda8c338e8085bbbf059a527cca5842fc741a47baeab5941219106b1240cf74', 'admin', 'activo'),
('maria', '221451e959e617bca5ed06e541b20d68$7720eb212c0709ce6126b22997718740c6981890a908c9675d67ee0ef091e9a7', 'usuario', 'activo'),
('carlos', 'c00a37646e3fa57b7f308969a8e0a3f8$d508c100dccfeb3d118488102ccb7eb6025397700266859431aef1be55bd8e45', 'usuario', 'activo')
ON DUPLICATE KEY UPDATE rol=VALUES(rol), estado=VALUES(estado);

-- Productos
CREATE DATABASE IF NOT EXISTS ecommerce_productos CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE ecommerce_productos;

CREATE TABLE IF NOT EXISTS productos (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  codigo VARCHAR(255) NOT NULL UNIQUE,
  nombre VARCHAR(255) NOT NULL,
  descripcion VARCHAR(255) DEFAULT NULL,
  categoria VARCHAR(255) NOT NULL,
  precio DECIMAL(10,2) NOT NULL,
  stock INT NOT NULL,
  estado ENUM('DISPONIBLE', 'AGOTADO', 'DESCONTINUADO') NOT NULL DEFAULT 'DISPONIBLE'
);

-- Productos iniciales
INSERT INTO productos (codigo, nombre, descripcion, categoria, precio, stock, estado) VALUES
('C1', 'Laptop MSI', 'AMD Ryzen 7, 16GB RAM, RTX 4060', 'Tecnología', 1250.00, 10, 'DISPONIBLE'),
('C2', 'Mouse Razer', 'Sensor 8000 DPI', 'Tecnología', 99.99, 35, 'DISPONIBLE'),
('C3', 'Teclado Mecánico RGB', 'Switches Blancos, Formato 70%', 'Tecnología', 200.00, 25, 'DISPONIBLE'),
('C4', 'Monitor 27" 165Hz', 'Resolución 4k', 'Tecnología', 280.00, 10, 'DISPONIBLE')
ON DUPLICATE KEY UPDATE nombre=VALUES(nombre), stock=VALUES(stock), precio=VALUES(precio);

-- Pedidos
CREATE DATABASE IF NOT EXISTS ecommerce_pedidos CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE ecommerce_pedidos;

CREATE TABLE IF NOT EXISTS pedidos (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  usuario VARCHAR(255) NOT NULL,
  subtotal DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  total DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  fecha DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  estado VARCHAR(255) NOT NULL DEFAULT 'COMPLETADO'
);

CREATE TABLE IF NOT EXISTS detalle_pedidos (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  productoCodigo VARCHAR(255) NOT NULL,
  productoNombre VARCHAR(255) DEFAULT NULL,
  cantidad INT NOT NULL,
  precioUnitario DECIMAL(10,2) NOT NULL,
  subtotal DECIMAL(10,2) NOT NULL,
  pedidoId INT DEFAULT NULL,
  CONSTRAINT FK_detalle_pedido FOREIGN KEY (pedidoId) REFERENCES pedidos (id) ON DELETE CASCADE ON UPDATE NO ACTION
);