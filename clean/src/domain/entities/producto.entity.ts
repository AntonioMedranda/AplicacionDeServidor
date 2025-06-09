// clean/src/domain/entities/producto.entity.ts

export class ProductoEntity {
    constructor(
        public id: string,
        public nombre: string,
        public precio: number,
    ) {}
}