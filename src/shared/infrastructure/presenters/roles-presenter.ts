import { ApiProperty } from "@nestjs/swagger";

export class RolePresenter {

  @ApiProperty({description: 'ID da role'})
  id: number;

  @ApiProperty({description: 'nome da role'})
  name: string;
}