import { EntregaEntity } from '../../entities'; // Ajusta la ruta si es necesario
import { EntregaRepository } from '../../repositories/entrega.repository'; // Ajusta la ruta si es necesario

export interface GetEntregasUseCase {
    execute(): Promise<EntregaEntity[]>;
}

export class GetEntregas implements GetEntregasUseCase {
    constructor(
        private readonly repository: EntregaRepository,
    ) {}

    execute(): Promise<EntregaEntity[]> {
        return this.repository.getAll();
    }
}