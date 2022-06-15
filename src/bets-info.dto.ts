import { BetsDto } from "./bets.dto";
import { IsArray, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class BetsInfoDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BetsDto)
  betsInfo: BetsDto[];
}