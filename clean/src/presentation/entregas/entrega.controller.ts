import { Request, Response } from 'express'; // Necesitas express para esto
import { CreateEntregaDto, UpdateEntregaDto } from '../../domain/dtos/entregas';
import { CreateEntrega, DeleteEntrega, GetEntrega, GetEntregas, UpdateEntrega } from '../../domain/use-cases/entrega';
import { EntregaRepository } from '../../domain/repositories/entrega.repository'; // Usaremos la interfaz del repositorio aquí

export class EntregaController {

    // Inyectamos el repositorio.
    // Aquí es donde unimos el mundo de la lógica de negocio (casos de uso) con la persistencia.
    constructor(
        private readonly entregaRepository: EntregaRepository,
    ) {}

    // Helper para manejar errores
    private handleError = (res: Response, error: any) => {
        console.error(error); // Para debug
        res.status(500).json({ error: 'Internal server error' });
    };

    // ======================================
    // Métodos del controlador
    // ======================================

    public getEntregas = (req: Request, res: Response) => {
        new GetEntregas(this.entregaRepository)
            .execute()
            .then(entregas => res.json(entregas))
            .catch(error => this.handleError(res, error));
    };

    public getEntregaById = (req: Request, res: Response) => {
        const id = req.params.id; // Obtiene el ID de los parámetros de la URL

        if (!id) {
            return res.status(400).json({ error: 'ID is required' });
        }

        new GetEntrega(this.entregaRepository)
            .execute(id)
            .then(entrega => {
                if (!entrega) {
                    return res.status(404).json({ error: `Entrega with id ${id} not found` });
                }
                res.json(entrega);
            })
            .catch(error => this.handleError(res, error));
    };

    public createEntrega = (req: Request, res: Response) => {
        const [error, createEntregaDto] = CreateEntregaDto.create(req.body);

        if (error) {
            return res.status(400).json({ error });
        }

        new CreateEntrega(this.entregaRepository)
            .execute(createEntregaDto!) // el "!" asegura a TS que no es undefined
            .then(entrega => res.status(201).json(entrega)) // 201 Created
            .catch(error => this.handleError(res, error));
    };

    public updateEntrega = (req: Request, res: Response) => {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({ error: 'ID is required' });
        }

        const [error, updateEntregaDto] = UpdateEntregaDto.create({ ...req.body, id });

        if (error) {
            return res.status(400).json({ error });
        }

        new UpdateEntrega(this.entregaRepository)
            .execute(updateEntregaDto!)
            .then(entrega => res.json(entrega))
            .catch(error => res.status(400).json({ error: 'Error updating entrega' })); // Más específico para 400
    };

    public deleteEntrega = (req: Request, res: Response) => {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({ error: 'ID is required' });
        }

        new DeleteEntrega(this.entregaRepository)
            .execute(id)
            .then(entrega => res.json(entrega))
            .catch(error => res.status(400).json({ error: 'Error deleting entrega' }));
    };

}