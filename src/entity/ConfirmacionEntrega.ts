import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { Entrega } from "./Entrega";

@Entity()
export class ConfirmacionEntrega {
  @PrimaryGeneratedColumn()
  id_confirmacion: number | undefined;

  @Column()
  fecha_confirmacion: Date | undefined;

  @Column()
  recibido_por: string | undefined;

  @Column({ nullable: true })
  firma_digital: string | undefined;

  @Column({ nullable: true })
  comentarios: string | undefined;

  @OneToOne(() => Entrega, entrega => entrega.confirmacion)
  entrega: Entrega | undefined;
}
