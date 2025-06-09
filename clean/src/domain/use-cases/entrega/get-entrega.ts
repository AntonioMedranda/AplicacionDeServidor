import { EntregaEntity } from '../../entities';
import { EntregaRepository } from '../../repositories/entrega.repository';

export interface GetEntregaUseCase {
    execute(id: string): Promise<EntregaEntity | null>;
}

export class GetEntrega implements GetEntregaUseCase {
    constructor(
        private readonly repository: EntregaRepository,
    ) {}

    execute(id: string): Promise<EntregaEntity | null> {
        return this.repository.getById(id);
    }
}