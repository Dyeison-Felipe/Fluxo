import { ApiProperty } from '@nestjs/swagger';

export class PaginationDto {
  @ApiProperty({ description: 'Número da página atual' })
  page: number;

  @ApiProperty({ description: 'Direção dos dados (ASC, DESC ou null)' })
  direction: 'ASC' | 'DESC' | null;

  @ApiProperty({ description: 'Número máximo de itens na página' })
  limit: number;
}