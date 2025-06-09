export class UpdateEntregaDto {
    private constructor(
        public id: string, // ID de la entrega a actualizar
        public idCliente?: string,
        public idTransportista?: string,
        public fechaHora?: Date,
        public estado?: 'pendiente' | 'en_proceso' | 'entregado' | 'cancelado',
        public idDireccion?: string,
    ) {}

    static create(props: { [key: string]: any }): [string?, UpdateEntregaDto?] {
        const { id, idCliente, idTransportista, fechaHora, estado, idDireccion } = props;
        let newFechaHora = fechaHora;

        if (!id) return ['ID must be a valid ID']; // El ID de la entrega es obligatorio para actualizar

        if (fechaHora) {
            newFechaHora = new Date(fechaHora);
            if (isNaN(newFechaHora.getTime())) {
                return ['FechaHora must be a valid date'];
            }
        }

        // Validar el estado si se proporciona
        if (estado) {
            const validStates = ['pendiente', 'en_proceso', 'entregado', 'cancelado'];
            if (!validStates.includes(estado)) {
                return [`Estado must be one of: ${validStates.join(', ')}`];
            }
        }

        // Asegurarse de que al menos un campo para actualizar esté presente (aparte del ID)
        if (!idCliente && !idTransportista && !fechaHora && !estado && !idDireccion) {
            return ['At least one property must be provided to update'];
        }

        return [undefined, new UpdateEntregaDto(id, idCliente, idTransportista, newFechaHora, estado, idDireccion)];
    }
}