import { AppDataSource } from './data-source';
import { Articulo } from './entity/Clientes';
import { View } from './entity/View';
import { EntityTarget, ObjectLiteral } from 'typeorm';

export const insertarArticulo = async (titulo: string, descripcion: string, precioInicial: number) => {
    const articulo = new Articulo();
    articulo.titulo = titulo;
    articulo.descripcion = descripcion;
    articulo.precioInicial = precioInicial;
    return await AppDataSource.manager.save(articulo);
};

export const consultarTodos = async <T extends ObjectLiteral>(entity: EntityTarget<T>) => {
    return await AppDataSource.manager.find(entity);
};

export const consultarUno = async <T extends ObjectLiteral>(entity: EntityTarget<T>, id: number) => {
    return await AppDataSource.manager.findOne(entity, { where: { id: id as any } });
};

export const actualizarArticulo = async (id: number, titulo: string, descripcion: string, precioInicial: number) => {
    const articulo = await consultarUno(Articulo, id);
    if (articulo) {
        articulo.titulo = titulo;
        articulo.descripcion = descripcion;
        articulo.precioInicial = precioInicial;
        return await AppDataSource.manager.save(articulo);
    }
    return null;
};

export const eliminarArticulo = async (id: number) => {
    const articulo = await consultarUno(Articulo, id);
    if (articulo) {
        return await AppDataSource.manager.remove(articulo);
    }
    return null;
};

export const crearVista = async (nombre: string, articuloId: number) => {
    const articulo = await consultarUno(Articulo, articuloId);
    if (articulo) {
        const vista = new View();
        vista.nombre = nombre;
        vista.articulo = articulo;
        return await AppDataSource.manager.save(vista);
    }
    return null;
};

export const eliminarVista = async (id: number) => {
    const vista = await consultarUno(View, id);
    if (vista) {
        return await AppDataSource.manager.remove(vista);
    }
    return null;
};
