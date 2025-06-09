export class ProductoEntregadoEntity {
    constructor(
        public id: string,
        public idEntrega: string, // Relación con Entrega
        public nombreProducto: string,
        public cantidad: number,
        public descripcion?: string, // Opcional
    ) {}

    static fromObject(obj: { [key: string]: any }): ProductoEntregadoEntity {
        const { id, idEntrega, nombreProducto, cantidad, descripcion } = obj;
        if (!id || !idEntrega || !nombreProducto || !cantidad) {
            throw new Error('Missing data for ProductoEntregadoEntity');
        }
        return new ProductoEntregadoEntity(id, idEntrega, nombreProducto, cantidad, descripcion);
    }
}