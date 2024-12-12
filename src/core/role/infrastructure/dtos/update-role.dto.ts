import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class UpdateRoleDto {

  id: number;

  @ApiProperty({ description: 'Nome da role' })
  @IsString()
  @IsNotEmpty()
  name: string;
}