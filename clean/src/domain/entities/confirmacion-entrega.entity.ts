export class ConfirmacionEntregaEntity {
    constructor(
        public id: string,
        public idEntrega: string, // Relación con Entrega
        public fechaConfirmacion: Date,
        public firmaDigital: string,
    ) {}

    static fromObject(obj: { [key: string]: any }): ConfirmacionEntregaEntity {
        const { id, idEntrega, fechaConfirmacion, firmaDigital } = obj;
        if (!id || !idEntrega || !fechaConfirmacion || !firmaDigital) {
            throw new Error('Missing data for ConfirmacionEntregaEntity');
        }
        return new ConfirmacionEntregaEntity(id, idEntrega, new Date(fechaConfirmacion), firmaDigital);
    }
}