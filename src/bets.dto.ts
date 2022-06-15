import { IsNumber, IsString } from "class-validator";

export class BetsDto {
  @IsNumber()
  betAmount: number;
  @IsString()
  betType: string;
}