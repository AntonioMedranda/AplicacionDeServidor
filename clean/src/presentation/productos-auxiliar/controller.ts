// clean/src/presentation/productos-auxiliar/controller.ts

import { Request, Response } from 'express';
import { ProductoService } from '../../domain/services/producto.service'; // Importa el servicio de Producto

export class ProductoAuxiliarController {

    // Inyectamos el servicio de Producto. Esto es la conexión de las 2 capas.
    constructor(
        private readonly productoService: ProductoService,
    ) {}

    // Helper para manejar errores
    private handleError = (res: Response, error: any) => {
        console.error(error); // Para debug
        if (error instanceof Error) {
            return res.status(400).json({ error: error.message }); // 400 Bad Request si es un error de validación del servicio
        }
        res.status(500).json({ error: 'Internal server error' });
    };

    // ======================================
    // Métodos del controlador
    // ======================================

    public getProductos = (req: Request, res: Response) => {
        this.productoService.getAllProductos()
            .then(productos => res.json(productos))
            .catch(error => this.handleError(res, error));
    };

    public createProducto = (req: Request, res: Response) => {
        const { nombre, precio } = req.body;

        // Validación básica de entrada de la petición
        if (!nombre || !precio) {
            return res.status(400).json({ error: 'Nombre y precio son requeridos.' });
        }
        if (typeof precio !== 'number' || isNaN(precio)) {
             return res.status(400).json({ error: 'Precio debe ser un número válido.' });
        }

        this.productoService.createProducto(nombre, precio)
            .then(producto => res.status(201).json(producto)) // 201 Created
            .catch(error => this.handleError(res, error));
    };

    // Opcional: Si implementaste getProductoById en el servicio
    public getProductoById = (req: Request, res: Response) => {
        const id = req.params.id;
        this.productoService.getProductoById(id)
            .then(producto => {
                if (!producto) {
                    return res.status(404).json({ error: `Producto con ID ${id} no encontrado.` });
                }
                res.json(producto);
            })
            .catch(error => this.handleError(res, error));
    };
}