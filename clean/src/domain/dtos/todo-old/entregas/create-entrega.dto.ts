export class CreateEntregaDto {
    private constructor(
        public idCliente: string,
        public idTransportista: string,
        public fechaHora: Date,
        public estado: 'pendiente' | 'en_proceso' | 'entregado' | 'cancelado', // Estado inicial
        public idDireccion: string,
    ) {}

    static create(props: { [key: string]: any }): [string?, CreateEntregaDto?] {
        const { idCliente, idTransportista, fechaHora, estado, idDireccion } = props;
        let newFechaHora = fechaHora;
        let newEstado = estado;

        if (!idCliente) return ['idCliente property is required'];
        if (!idTransportista) return ['idTransportista property is required'];
        if (!idDireccion) return ['idDireccion property is required'];

        if (!fechaHora) {
            newFechaHora = new Date(); // Si no se proporciona, usa la fecha y hora actual
        } else if (!(newFechaHora instanceof Date)) {
            newFechaHora = new Date(newFechaHora);
            if (isNaN(newFechaHora.getTime())) { // Comprobar si la fecha es inválida
                return ['FechaHora must be a valid date'];
            }
        }

        // Validar el estado si se proporciona, de lo contrario, por defecto 'pendiente'
        const validStates = ['pendiente', 'en_proceso', 'entregado', 'cancelado'];
        if (estado && !validStates.includes(estado)) {
            return [`Estado must be one of: ${validStates.join(', ')}`];
        } else if (!estado) {
            newEstado = 'pendiente'; // Estado por defecto
        }

        return [undefined, new CreateEntregaDto(idCliente, idTransportista, newFechaHora, newEstado, idDireccion)];
    }
}