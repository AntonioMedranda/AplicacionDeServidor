import { EntregaEntity } from '../../domain/entities';
import { CreateEntregaDto, UpdateEntregaDto } from '../../domain/dtos/entregas';
import { EntregaDatasource } from '../../domain/datasources/entrega.datasource';
import { EntregaRepository } from '../../domain/repositories/entrega.repository';

// Importamos la implementación específica de nuestro datasource en memoria
import { EntregaMemoryDatasource } from '../datasource/entrega.memory.datasource.impl'; // Asegúrate que la ruta sea correcta

export class EntregaRepositoryImpl implements EntregaRepository {

    // El repositorio recibe una instancia del datasource a través de su constructor (inyección de dependencias)
    constructor(
        private readonly datasource: EntregaDatasource, // Aquí se inyecta la implementación concreta (ej. EntregaMemoryDatasource)
    ) {}

    create(createEntregaDto: CreateEntregaDto): Promise<EntregaEntity> {
        return this.datasource.create(createEntregaDto);
    }

    getAll(): Promise<EntregaEntity[]> {
        return this.datasource.getAll();
    }

    getById(id: string): Promise<EntregaEntity | null> {
        return this.datasource.getById(id);
    }

    updateById(updateEntregaDto: UpdateEntregaDto): Promise<EntregaEntity> {
        return this.datasource.updateById(updateEntregaDto);
    }

    deleteById(id: string): Promise<EntregaEntity> {
        return this.datasource.deleteById(id);
    }
}