import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Entrega } from "./Entrega";

@Entity()
export class ProductoEntregado {
  @PrimaryGeneratedColumn()
  id_producto_entregado: number | undefined;

  @Column()
  id_subasta: number | undefined;

  @Column()
  descripcion: string | undefined;

  @Column()
  cantidad: number | undefined;

  @Column()
  estado_producto: string | undefined;

  @ManyToOne(() => Entrega, entrega => entrega.productos)
  entrega: Entrega | undefined;
}
