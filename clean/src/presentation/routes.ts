// clean/src/presentation/routes.ts

import { Router } from 'express';
import { Request, Response } from 'express';

// Importa tus nuevas rutas de Entrega
import { EntregaRoutes } from './entregas/routes'; // ¡Asegúrate que esta ruta sea correcta!

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

        // ** AÑADE ESTA LÍNEA PARA LAS RUTAS DE ENTREGA **
        router.use('/api/entregas', EntregaRoutes.routes);

        // Si tenías rutas de Todo, puedes eliminarlas o comentarlas para este examen
        // router.use('/api/todos', TodoRoutes.routes );
        // router.use('/api/todos-memory', TodoMemoryRoutes.routes );


        // Endpoint de sistema para gestión de datasource
        router.get('/api/system/info', (req: Request, res: Response) => {
            res.json({
                message: 'Clean Architecture Todo API (Adaptada para Entregas)', // Puedes cambiar este mensaje
                version: '1.0.0',
                currentDatasource: DatasourceConfig.getCurrentDatasourceType(),
                availableDatasources: Object.values(DatasourceType),
                endpoints: {
                    // Actualiza los endpoints para reflejar las rutas de Entrega
                    entregas: '/api/entregas (uses configured datasource)',
                    // unified: '/api/todos (uses configured datasource)', // Comentar/eliminar si no se usa
                    // memory: '/api/todos-memory (always uses memory)',   // Comentar/eliminar si no se usa
                    system: '/api/system/info',
                    systemDatasourceChange: '/api/system/datasource'
                },
                environment: {
                    NODE_ENV: process.env.NODE_ENV || 'development',
                    DATASOURCE_TYPE: process.env.DATASOURCE_TYPE || 'MEMORY'
                }
            });
        });

        // Endpoint para cambiar datasource en tiempo de ejecución (solo para desarrollo)
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
                    note: 'This change affects /api/todos endpoints. /api/todos-memory always uses memory datasource. (Considered for Entrega routes too)' // Actualiza la nota
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