import { EntregaEntity } from '../../entities';
import { EntregaRepository } from '../../repositories/entrega.repository';

export interface DeleteEntregaUseCase {
    execute(id: string): Promise<EntregaEntity>;
}

export class DeleteEntrega implements DeleteEntregaUseCase {
    constructor(
        private readonly repository: EntregaRepository,
    ) {}

    execute(id: string): Promise<EntregaEntity> {
        return this.repository.deleteById(id);
    }
}