import { AppDataSource } from "./data-source";
import 'reflect-metadata';

export const initDatabase = async () => {
    try {
        await AppDataSource.initialize();
        console.log(" Conexión a la base de datos inicializada correctamente.");
        return AppDataSource;
    } catch (ex) {
        console.error(" Error al inicializar la base de datos:", ex);
        throw ex;
    }
};
