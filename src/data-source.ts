import "reflect-metadata";
import { DataSource } from "typeorm";
import { Cliente } from "./entity/Clientes";
import { Direccion } from "./entity/Direccion";
import { Entrega } from "./entity/Entrega";
import { Transportista } from "./entity/Transportista";
import { ProductoEntregado } from "./entity/ProductoEntregado";
import { ConfirmacionEntrega } from "./entity/ConfirmacionEntrega";
import * as dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true, // true solo para desarrollo
  logging: true,
  entities: [Cliente, Direccion, Entrega, Transportista, ProductoEntregado, ConfirmacionEntrega],
});
