import { IsNumber } from "class-validator";

export class UserDto {
  @IsNumber()
  balance: string;
  readonly iat: number;
}