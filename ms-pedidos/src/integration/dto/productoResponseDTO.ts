export interface ProductoResponseDTO {
    id: number;
    codigo: string;
    nombre: string;
    descripcion?: string;
    categoria: string;
    precio: number | string;
    stock: number;
    estado: string;
}
