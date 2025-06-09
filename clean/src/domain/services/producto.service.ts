// clean/src/domain/services/producto.service.ts

import { ProductoEntity } from '../entities'; // Importa la entidad Producto
import { v4 as uuidv4 } from 'uuid'; // Para generar IDs únicos

// Array en memoria para almacenar los productos (simula una base de datos simple)
const productos: ProductoEntity[] = [
    new ProductoEntity(uuidv4(), 'Laptop Gamer', 1200),
    new ProductoEntity(uuidv4(), 'Teclado Mecánico', 80),
    new ProductoEntity(uuidv4(), 'Monitor UltraWide', 450),
];

export class ProductoService {

    // Método para obtener todos los productos
    public async getAllProductos(): Promise<ProductoEntity[]> {
        return productos;
    }

    // Método para crear un nuevo producto
    public async createProducto(nombre: string, precio: number): Promise<ProductoEntity> {
        // Validación básica de la lógica de negocio
        if (!nombre || precio <= 0) {
            throw new Error('Nombre y precio válido son requeridos para el producto.');
        }

        const nuevoProducto = new ProductoEntity(uuidv4(), nombre, precio);
        productos.push(nuevoProducto);
        return nuevoProducto;
    }

    // Opcional: Obtener producto por ID (aunque el examen no lo exige explícitamente para el auxiliar)
    public async getProductoById(id: string): Promise<ProductoEntity | null> {
        return productos.find(p => p.id === id) || null;
    }
}