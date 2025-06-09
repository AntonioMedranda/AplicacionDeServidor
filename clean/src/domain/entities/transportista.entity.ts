export class TransportistaEntity {
    constructor(
        public id: string,
        public nombre: string,
        public empresa: string,
        public contacto: string,
    ) {}

    static fromObject(obj: { [key: string]: any }): TransportistaEntity {
        const { id, nombre, empresa, contacto } = obj;
        if (!id || !nombre || !empresa || !contacto) {
            throw new Error('Missing data for TransportistaEntity');
        }
        return new TransportistaEntity(id, nombre, empresa, contacto);
    }
}