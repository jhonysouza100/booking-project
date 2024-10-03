
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from './room.model';
import { UpdateAvailabilityDto } from './dto/update-availability.dto';

@Injectable()
export class RoomService {
  constructor(@InjectRepository(Room) private roomRepository: Repository<Room>,) { }

  async create(room: Room): Promise<Room> {
    return this.roomRepository.save(room);
  }

  async findAll(): Promise<Room[]> {
    return this.roomRepository.find();
  }

  async findOne(id: number): Promise<Room> {
    return this.roomRepository.findOne(id);
  }

  async update(id: number, room: Partial<Room>): Promise<Room> {
    await this.roomRepository.update(id, room);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.roomRepository.delete(id);
  }

  async getAvailableRoomsByDate(startDate: Date, endDate: Date): Promise<{ date: string; availableRooms: number }[]> {
    const availableRoomsByDate: { date: string; availableRooms: number }[] = [];

    const diffDays = (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24) + 1;

    for (let i = 0; i < diffDays; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(currentDate.getDate() + i);
      const formattedDate = currentDate.toISOString().split('T')[0]; // Formato YYYY-MM-DD

      // Obtener todas las habitaciones
      const rooms = await this.roomRepository.find();
      let totalAvailable = 0;

      for (const room of rooms) {
        const availableRooms = room.dailyAvailability[formattedDate] || room.totalRooms;
        totalAvailable += availableRooms;
      }

      availableRoomsByDate.push({ date: formattedDate, availableRooms: totalAvailable });
    }

    //     Explicación del Método
    // 1. Inicialización: Crea un arreglo availableRoomsByDate para almacenar los resultados.
    // 2. Iteración sobre el rango de fechas: Calcula la diferencia de días y itera sobre cada día en el rango.
    // 3. Obtener habitaciones: Para cada fecha, busca todas las habitaciones y suma las disponibles:
    //    * Usa room.dailyAvailability[formattedDate] para obtener la disponibilidad de esa fecha o el total de habitaciones si no hay datos.
    // 4. Almacenar resultados: Añade el resultado al arreglo availableRoomsByDate.
    // 5. Retornar resultados: Al final, devuelve el arreglo con las habitaciones disponibles por fecha.

    // room.controller.ts
    // @Get('available-rooms')
    // async getAvailableRooms(@Query('start') start: string, @Query('end') end: string) {
    //   const startDate = new Date(start);
    //   const endDate = new Date(end);

    //   const availableRooms = await this.roomService.getAvailableRoomsByDate(startDate, endDate);

    //   return {
    //     status: 'success',
    //     availableRooms,
    //   };

    // La respuesta para una consulta a /room/available-rooms?start=2024-10-01&end=2024-10-07
    // {
    //   "status": "success",
    //   "availableRooms": [
    //     { "date": "2024-10-01", "availableRooms": 10 },
    //     { "date": "2024-10-02", "availableRooms": 8 },
    //     { "date": "2024-10-03", "availableRooms": 7 },
    //     { "date": "2024-10-04", "availableRooms": 5 },
    //     { "date": "2024-10-05", "availableRooms": 6 },
    //     { "date": "2024-10-06", "availableRooms": 4 },
    //     { "date": "2024-10-07", "availableRooms": 9 }
    //   ]
    // }
    
      return availableRoomsByDate;
    }


  async updateAvailability(dto: UpdateAvailabilityDto): Promise < void> {
      const { roomId, dates } = dto;

      const room = await this.roomRepository.findOne({ where: { id: roomId } });

      if(!room) {
        throw new Error(`Habitación no encontrada`);
      }

    for(const { date, roomsToReserve } of dates) {
        const formattedDate = date.toISOString().split('T')[0]; // Formato YYYY-MM-DD
        const availableRooms = room.dailyAvailability[formattedDate] || room.totalRooms;

        if (availableRooms >= roomsToReserve) {
          room.dailyAvailability[formattedDate] = availableRooms - roomsToReserve;
        } else {
          throw new Error(`No hay suficientes habitaciones disponibles para el ${formattedDate}`);
        }
      }

    // Resumen del enfoque
    // 1. Modelo: dailyAvailability almacena la disponibilidad de habitaciones por fecha.
    // 2. Método updateAvailability: Permite actualizar la disponibilidad en función de un arreglo de fechas y habitaciones a reservar.
    // 3. Formato de fecha: Usa toISOString() para manejar las fechas en un formato estándar.
    await this.roomRepository.save(room); // Guardar cambios después de todas las reservas
    }

  async addAvailability(roomId: number, dates: { date: Date; roomsToAdd: number }[]): Promise < void> {
      const room = await this.roomRepository.findOne({ where: { id: roomId } });

      if(!room) {
        throw new Error(`Habitación no encontrada`);
      }

    for(const { date, roomsToAdd } of dates) {
        const formattedDate = date.toISOString().split('T')[0]; // Formato YYYY-MM-DD

        // Inicializa la disponibilidad si no existe
        if (!room.dailyAvailability[formattedDate]) {
          room.dailyAvailability[formattedDate] = room.totalRooms; // Asigna el total si no hay datos
        }

        room.dailyAvailability[formattedDate] += roomsToAdd; // Aumenta la disponibilidad

        // Opcional: Limita la disponibilidad al total de habitaciones
        if (room.dailyAvailability[formattedDate] > room.totalRooms) {
          room.dailyAvailability[formattedDate] = room.totalRooms;
        }
      }

    // Explicación del Método
    // 1. Buscar la habitación por ID: Utiliza findOne para buscar la habitación.
    // 2. Validar existencia: Si la habitación no se encuentra, lanza un error.
    // 3. Iterar sobre las fechas: Por cada fecha en el arreglo:
    //    * Formatea la fecha a YYYY-MM-DD.
    //     * Si no existe disponibilidad para esa fecha, inicialízala con el total de habitaciones.
    //     * Aumenta la cantidad de habitaciones disponibles.
    //     * (Opcional) Asegúrate de que la disponibilidad no exceda el total de habitaciones.
    // 4. Guardar cambios: Al final, guarda la habitación actualizada.

    await this.roomRepository.save(room); // Guardar cambios
    }

  }

