import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne,
  OneToMany, OneToOne, JoinColumn
} from "typeorm";
import { Cliente } from "./Clientes";
import { Direccion } from "./Direccion";
import { Transportista } from "./Transportista";
import { ProductoEntregado } from "./ProductoEntregado";
import { ConfirmacionEntrega } from "./ConfirmacionEntrega";

@Entity()
export class Entrega {
  @PrimaryGeneratedColumn()
  id_entrega: number | undefined;

  @Column()
  fecha_entrega: Date | undefined;

  @Column()
  estado_entrega: string | undefined;

  @Column()
  tipo_entrega: string | undefined;

  @Column()
  codigo_seguimiento: string | undefined;

  @ManyToOne(() => Cliente, () => Cliente.entregas)
  cliente: Cliente | undefined;

  @ManyToOne(() => Direccion)
  direccion: Direccion | undefined;

  @ManyToOne(() => Transportista, (transportista: { entregas: any; }) => transportista.entregas)
  transportista: Transportista | undefined;

  @OneToMany(() => ProductoEntregado, producto => producto.entrega)
  productos: ProductoEntregado[] | undefined;

  @OneToOne(() => ConfirmacionEntrega, (confirmacion: { entrega: any; }) => confirmacion.entrega)
  @JoinColumn()
  confirmacion: ConfirmacionEntrega | undefined;
}
