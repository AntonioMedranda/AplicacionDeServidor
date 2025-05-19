import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Cliente } from "./Clientes";

@Entity()
export class Direccion {
  @PrimaryGeneratedColumn()
  id_direccion: number | undefined;

  @Column()
  calle: string | undefined;

  @Column()
  ciudad: string | undefined;

  @Column()
  provincia: string | undefined;

  @Column()
  codigo_postal: string | undefined;

  @Column({ nullable: true })
  referencia: string | undefined;

  @ManyToOne(() => Cliente, (clientes: { direcciones: any; }) => clientes.direcciones)
  cliente: Cliente | undefined;
}
