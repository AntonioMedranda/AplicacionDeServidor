export class ClienteEntity {
    constructor(
        public id: string,
        public nombre: string,
        public correo: string,
        public telefono: string,
    ) {}

    // Opcional: un método estático para crear una instancia desde un objeto plano
    static fromObject(obj: { [key: string]: any }): ClienteEntity {
        const { id, nombre, correo, telefono } = obj;
        if (!id || !nombre || !correo || !telefono) {
            throw new Error('Missing data for ClienteEntity');
        }
        return new ClienteEntity(id, nombre, correo, telefono);
    }
}