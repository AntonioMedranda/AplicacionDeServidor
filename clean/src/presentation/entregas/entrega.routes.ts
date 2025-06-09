import { Router } from 'express'; // Necesitas express para esto
import { EntregaController } from './controller'; // Importa el controlador que acabas de crear
import { EntregaRepositoryImpl } from '../../infrastructure/repositories/entrega.repository.impl'; // Importa la implementación del repositorio
import { EntregaMemoryDatasource } from '../../infrastructure/datasource/entrega.memory.datasource.impl'; // Importa el datasource en memoria

export class EntregaRoutes {

    static get routes(): Router {
        const router = Router();

        // Aquí instanciamos el datasource en memoria y el repositorio.
        // Para el examen, esto es aceptable, pero en una app real se haría con un patrón de inyección de dependencias más robusto.
        const datasource = new EntregaMemoryDatasource();
        const repository = new EntregaRepositoryImpl(datasource);
        const controller = new EntregaController(repository);

        // Definición de rutas
        router.get('/', controller.getEntregas);
        router.get('/:id', controller.getEntregaById);
        router.post('/', controller.createEntrega);
        router.put('/:id', controller.updateEntrega);
        router.delete('/:id', controller.deleteEntrega);

        return router;
    }
}