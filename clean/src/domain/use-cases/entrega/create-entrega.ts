import { EntregaEntity } from '../../entities';
import { CreateEntregaDto } from '../../dtos/entregas';
import { EntregaRepository } from '../../repositories/entrega.repository';

export interface CreateEntregaUseCase {
    execute(createEntregaDto: CreateEntregaDto): Promise<EntregaEntity>;
}

export class CreateEntrega implements CreateEntregaUseCase {
    constructor(
        private readonly repository: EntregaRepository,
    ) {}

    execute(createEntregaDto: CreateEntregaDto): Promise<EntregaEntity> {
        return this.repository.create(createEntregaDto);
    }
}