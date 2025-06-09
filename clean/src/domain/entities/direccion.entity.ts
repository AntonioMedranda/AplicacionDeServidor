export class DireccionEntity {
    constructor(
        public id: string,
        public calle: string,
        public numero: string,
        public ciudad: string,
        public codigoPostal: string,
        public idCliente: string, // Relación con Cliente
    ) {}

    static fromObject(obj: { [key: string]: any }): DireccionEntity {
        const { id, calle, numero, ciudad, codigoPostal, idCliente } = obj;
        if (!id || !calle || !numero || !ciudad || !codigoPostal || !idCliente) {
            throw new Error('Missing data for DireccionEntity');
        }
        return new DireccionEntity(id, calle, numero, ciudad, codigoPostal, idCliente);
    }
}