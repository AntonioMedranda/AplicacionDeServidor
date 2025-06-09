export class EntregaEntity {
    constructor(
        public id: string,
        public idCliente: string, // Relación con Cliente
        public idTransportista: string, // Relación con Transportista
        public fechaHora: Date,
        public estado: 'pendiente' | 'en_proceso' | 'entregado' | 'cancelado',
        public idDireccion: string, // Relación con Direccion
    ) {}

    static fromObject(obj: { [key: string]: any }): EntregaEntity {
        const { id, idCliente, idTransportista, fechaHora, estado, idDireccion } = obj;
        if (!id || !idCliente || !idTransportista || !fechaHora || !estado || !idDireccion) {
            throw new Error('Missing data for EntregaEntity');
        }
        return new EntregaEntity(id, idCliente, idTransportista, new Date(fechaHora), estado, idDireccion);
    }
}