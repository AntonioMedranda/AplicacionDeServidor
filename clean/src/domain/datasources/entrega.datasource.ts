import { EntregaEntity } from '../entities';
import { CreateEntregaDto, UpdateEntregaDto } from '../dtos/entregas'; // Asegúrate que la ruta sea correcta

export abstract class EntregaDatasource {
    abstract create(createEntregaDto: CreateEntregaDto): Promise<EntregaEntity>;
    abstract getAll(): Promise<EntregaEntity[]>;
    abstract getById(id: string): Promise<EntregaEntity | null>;
    abstract updateById(updateEntregaDto: UpdateEntregaDto): Promise<EntregaEntity>;
    abstract deleteById(id: string): Promise<EntregaEntity>;
}