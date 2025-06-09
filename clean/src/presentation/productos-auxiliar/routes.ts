// clean/src/presentation/routes.ts

import { Router } from 'express';
import { Request, Response } from 'express';

// Importa tus nuevas rutas de Entrega (ya lo tienes)
import { EntregaRoutes } from './entregas/routes';

// ** AÑADE ESTA IMPORTACIÓN PARA EL SERVICIO AUXILIAR **
import { ProductoAuxiliarRoutes } from './productos-auxiliar/routes';

// Puedes comentar o eliminar estas líneas si no vas a usar las rutas de Todo para el examen
// import { TodoRoutes } from './todos/routes';
// import { TodoMemoryRoutes } from './todos/routes.memory';

import { DatasourceConfig, DatasourceType } from '../infrastructure/datasource/datasource.config';


export class AppRoutes {

    static get routes(): Router {

        const router = Router();

        // ======================================
        // Rutas de tu aplicación
        // ======================================

        // Rutas de Entrega
        router.use('/api/entregas', EntregaRoutes.routes);

        // ** AÑADE ESTA LÍNEA PARA LAS RUTAS DEL SERVICIO AUXILIAR **
        router.use('/api/productos-auxiliar', ProductoAuxiliarRoutes.routes); // Nueva ruta para el servicio auxiliar

        // Si tenías rutas de Todo, puedes eliminarlas o comentarlas para este examen
        // router.use('/api/todos', TodoRoutes.routes );
        // router.use('/api/todos-memory', TodoMemoryRoutes.routes );


        // Endpoint de sistema para gestión de datasource (ya lo tienes)
        router.get('/api/system/info', (req: Request, res: Response) => {
            res.json({
                message: 'Clean Architecture API', // Puedes cambiar este mensaje a algo más genérico
                version: '1.0.0',
                currentDatasource: DatasourceConfig.getCurrentDatasourceType(),
                availableDatasources: Object.values(DatasourceType),
                endpoints: {
                    entregas: '/api/entregas',
                    productosAuxiliar: '/api/productos-auxiliar', // Nuevo endpoint
                    system: '/api/system/info',
                    systemDatasourceChange: '/api/system/datasource'
                },
                environment: {
                    NODE_ENV: process.env.NODE_ENV || 'development',
                    DATASOURCE_TYPE: process.env.DATASOURCE_TYPE || 'MEMORY'
                }
            });
        });

        // Endpoint para cambiar datasource en tiempo de ejecución (ya lo tienes)
        router.post('/api/system/datasource', (req: Request, res: Response) => {
            try {
                const { type } = req.body;

                if (!type || !Object.values(DatasourceType).includes(type)) {
                    return res.status(400).json({
                        error: 'Invalid datasource type',
                        availableTypes: Object.values(DatasourceType)
                    });
                }

                const previousType = DatasourceConfig.getCurrentDatasourceType();
                DatasourceConfig.setDatasource(type);

                res.json({
                    message: 'Datasource changed successfully',
                    previousType,
                    newType: DatasourceConfig.getCurrentDatasourceType(),
                    note: 'This change affects /api/entregas endpoints. Auxiliary services (like /api/productos-auxiliar) might use their own memory storage.'
                });
            } catch (error) {
                res.status(500).json({
                    error: 'Failed to change datasource',
                    details: error
                });
            }
        });


        return router;
    }
}