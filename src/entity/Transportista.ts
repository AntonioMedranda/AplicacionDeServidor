import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Entrega } from "./Entrega";

@Entity()
export class Transportista {
  @PrimaryGeneratedColumn()
  id_transportista: number | undefined;

  @Column()
  nombre: string | undefined;

  @Column()
  tipo: string | undefined;

  @Column()
  contacto: string | undefined;

  @Column({ nullable: true })
  vehiculo: string | undefined;

  @Column()
  estado: string | undefined;

  @OneToMany(() => Entrega, entrega => entrega.transportista)
  entregas: Entrega[] | undefined;
}
