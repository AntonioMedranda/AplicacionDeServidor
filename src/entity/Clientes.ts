import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Direccion } from "./Direccion";
import { Entrega } from "./Entrega";

@Entity()
export class Cliente {
  @PrimaryGeneratedColumn()
  id_cliente: number | undefined;

  @Column()
  nombre: string | undefined;

  @Column()
  correo: string | undefined;

  @Column()
  telefono: string | undefined;

  @Column({ nullable: true })
  tipo_usuario: string | undefined;

  @OneToMany(() => Direccion, direccion => direccion.cliente)
  direcciones: Direccion[] | undefined;

  @OneToMany(() => Entrega, entrega => entrega.cliente)
  entregas: Entrega[] | undefined;
    static entregas: any;
}
