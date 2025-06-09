import { EntregaEntity } from '../../entities';
import { UpdateEntregaDto } from '../../dtos/entregas';
import { EntregaRepository } from '../../repositories/entrega.repository';

export interface UpdateEntregaUseCase {
    execute(updateEntregaDto: UpdateEntregaDto): Promise<EntregaEntity>;
}

export class UpdateEntrega implements UpdateEntregaUseCase {
    constructor(
        private readonly repository: EntregaRepository,
    ) {}

    execute(updateEntregaDto: UpdateEntregaDto): Promise<EntregaEntity> {
        return this.repository.updateById(updateEntregaDto);
    }
}