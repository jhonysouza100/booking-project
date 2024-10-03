import { IsArray, IsDateString, IsInt, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class ReservationDateDto {
  @IsNotEmpty()
  @IsDateString()
  date: Date;

  @IsNotEmpty()
  @IsInt()
  roomsToReserve: number;
}

export class UpdateAvailabilityDto {
  @IsNotEmpty()
  @IsInt()
  roomId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ReservationDateDto)
  dates: ReservationDateDto[];
}

// Explicación de los campos
// * roomId: El ID de la habitación que se desea actualizar.
// * dates: Un arreglo de objetos ReservationDateDto, donde cada objeto contiene:
//     * date: La fecha para la que se desea reservar habitaciones (debe ser una fecha válida).
//     * roomsToReserve: La cantidad de habitaciones que se desean reservar para esa fecha (debe ser un entero positivo).