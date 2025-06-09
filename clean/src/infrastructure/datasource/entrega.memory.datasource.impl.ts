import { EntregaDatasource } from '../../domain/datasources/entrega.datasource';
import { CreateEntregaDto, UpdateEntregaDto } from '../../domain/dtos/entregas';
import { EntregaEntity } from '../../domain/entities';
import { v4 as uuidv4 } from 'uuid'; // Para generar IDs únicos

// Datos en memoria que simulan una base de datos
const entregas: EntregaEntity[] = [
    // Ejemplos iniciales (opcional, puedes dejarlos vacíos)
    new EntregaEntity(
        uuidv4(),
        uuidv4(), // idCliente ficticio
        uuidv4(), // idTransportista ficticio
        new Date(),
        'pendiente',
        uuidv4(), // idDireccion ficticia
    ),
    new EntregaEntity(
        uuidv4(),
        uuidv4(),
        uuidv4(),
        new Date(new Date().setDate(new Date().getDate() + 1)), // Mañana
        'en_proceso',
        uuidv4(),
    ),
];

export class EntregaMemoryDatasource implements EntregaDatasource {

    async create(createEntregaDto: CreateEntregaDto): Promise<EntregaEntity> {
        const nuevaEntrega = new EntregaEntity(
            uuidv4(), // Genera un ID único para la nueva entrega
            createEntregaDto.idCliente,
            createEntregaDto.idTransportista,
            createEntregaDto.fechaHora,
            createEntregaDto.estado,
            createEntregaDto.idDireccion,
        );
        entregas.push(nuevaEntrega);
        return nuevaEntrega;
    }

    async getAll(): Promise<EntregaEntity[]> {
        return entregas;
    }

    async getById(id: string): Promise<EntregaEntity | null> {
        const entrega = entregas.find(e => e.id === id);
        return entrega || null;
    }

    async updateById(updateEntregaDto: UpdateEntregaDto): Promise<EntregaEntity> {
        const { id, idCliente, idTransportista, fechaHora, estado, idDireccion } = updateEntregaDto;
        const entregaIndex = entregas.findIndex(e => e.id === id);

        if (entregaIndex === -1) {
            throw new Error(`Entrega with id ${id} not found`);
        }

        const entrega = entregas[entregaIndex];
        if (idCliente) entrega.idCliente = idCliente;
        if (idTransportista) entrega.idTransportista = idTransportista;
        if (fechaHora) entrega.fechaHora = fechaHora;
        if (estado) entrega.estado = estado;
        if (idDireccion) entrega.idDireccion = idDireccion;

        entregas[entregaIndex] = entrega; // Actualiza la entrega en el arreglo
        return entrega;
    }

    async deleteById(id: string): Promise<EntregaEntity> {
        const entregaIndex = entregas.findIndex(e => e.id === id);

        if (entregaIndex === -1) {
            throw new Error(`Entrega with id ${id} not found`);
        }

        const [deletedEntrega] = entregas.splice(entregaIndex, 1); // Elimina y devuelve el elemento
        return deletedEntrega;
    }
}