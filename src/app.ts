import { initDatabase } from './database';
import { insertarArticulo, consultarTodos, consultarUno, actualizarArticulo, eliminarArticulo, crearVista, eliminarVista } from './crud';
import { Articulo } from './entity/Clientes';
import { View } from './entity/View';

async function main() {
    await initDatabase();

    
    const nuevoArticulo = await insertarArticulo("Laptop Gamer", "Potente laptop para juegos", 1200);
    console.log(" Artículo creado:", nuevoArticulo);

    
    const articulos = await consultarTodos(Articulo);
    console.log(" Lista de artículos:", articulos);

    const articulo = await consultarUno(Articulo, nuevoArticulo.id);
    console.log(" Artículo consultado:", articulo);

    const articuloActualizado = await actualizarArticulo(nuevoArticulo.id, "Laptop Gamer Pro", "Se puede jugar GTA IV", 1500);
    console.log(" Artículo actualizado:", articuloActualizado);

    const nuevaVista = await crearVista("Vista de Prueba", nuevoArticulo.id);
    console.log(" Vista creada:", nuevaVista);

    if (nuevaVista) {
        const vistaEliminada = await eliminarVista(nuevaVista.id);
        console.log(" Vista eliminada:", vistaEliminada);
    }

    const articuloEliminado = await eliminarArticulo(nuevoArticulo.id);
    console.log(" Artículo eliminado:", articuloEliminado);
}

main();
