import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  roomNumber: string;

  @Column()
  type: string; // Ej: Sencilla, Doble, Suite

  @Column()
  price: number;

  @Column()
  totalRooms: number; // Total de habitaciones de este tipo

  @Column('json')
  dailyAvailability: { [date: string]: number }; // Disponibilidad diaria, con fecha como clave y habitaciones disponibles como valor
}

// Explicación del modelo:
// dailyAvailability: Este campo es un objeto JSON que almacena la disponibilidad diaria de habitaciones. La clave es la fecha (en formato ISO) y el valor es la cantidad de habitaciones disponibles para esa fecha