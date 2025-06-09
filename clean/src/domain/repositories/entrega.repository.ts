import { EntregaEntity } from '../entities';
import { CreateEntregaDto, UpdateEntregaDto } from '../dtos/entregas';
import { EntregaDatasource } from '../datasources/entrega.datasource';

export abstract class EntregaRepository {
    // Necesita una referencia al datasource abstracto para operar
    // Esto se suele inyectar en la implementación concreta

    abstract create(createEntregaDto: CreateEntregaDto): Promise<EntregaEntity>;
    abstract getAll(): Promise<EntregaEntity[]>;
    abstract getById(id: string): Promise<EntregaEntity | null>;
    abstract updateById(updateEntregaDto: UpdateEntregaDto): Promise<EntregaEntity>;
    abstract deleteById(id: string): Promise<EntregaEntity>;
}