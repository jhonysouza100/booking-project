import { IsArray, IsDateString, IsInt, IsNotEmpty } from 'class-validator';

class AvailabilityDateDto {
  @IsNotEmpty()
  @IsDateString()
  date: Date;

  @IsNotEmpty()
  @IsInt()
  roomsToAdd: number;
}

export class AddAvailabilityDto {
  @IsNotEmpty()
  @IsInt()
  roomId: number;

  @IsArray()
  dates: AvailabilityDateDto[];
}
