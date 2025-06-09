import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Articulo } from "./Clientes";
import { Puja } from "./ProductoEntregado";
import { Categoria } from "./Direccion";
import { Imagen } from "./Entrega";
import { Notificacion } from "./Transportista";

@Entity()
export class View {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    nombre!: string;

    @ManyToOne(() => Articulo, (articulo: Articulo) => articulo.vistas)
    articulo!: Articulo;

    @ManyToOne(() => Puja, (puja: Puja) => puja.vistas)
    puja!: Puja;

    @ManyToOne(() => Categoria, (categoria: Categoria) => categoria.vistas)
    categoria!: Categoria;

    @ManyToOne(() => Imagen, (imagen: Imagen) => imagen.vistas)
    imagen!: Imagen;

    @ManyToOne(() => Notificacion, (notificacion: Notificacion) => notificacion.vistas)
    notificacion!: Notificacion;
    vista: any;
}
