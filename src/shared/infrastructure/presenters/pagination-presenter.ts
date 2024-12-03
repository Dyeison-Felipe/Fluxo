import { ApiProperty } from '@nestjs/swagger';

export class MetaPresenter {
  @ApiProperty({
    description: 'Número total de itens presentes no banco de dados',
  })
  totalItems: number;

  @ApiProperty({ description: 'Número de itens vindos na página atual' })
  itemCount: number;

  @ApiProperty({ description: 'Número de itens máximos vindos por página' })
  itemsPerPage: number;

  @ApiProperty({ description: 'Número total de páginas' })
  totalPages: number;

  @ApiProperty({ description: 'Número da página atual' })
  currentPage: number;

  constructor(
    totalItems: number,
    itemCount: number,
    itemsPerPage: number,
    totalPages: number,
    currentPage: number,
  ) {
    this.totalItems = totalItems;
    this.itemCount = itemCount;
    this.itemsPerPage = itemsPerPage;
    this.totalPages = totalPages;
    this.currentPage = currentPage;
  }
}

export class PaginationPresenter<Item> {
  @ApiProperty({ description: 'Lista de itens paginados' })
  items: Item[];

  @ApiProperty({ description: 'Informações sobre a paginação' })
  meta: MetaPresenter;

  constructor(items: Item[], meta: MetaPresenter) {
    this.items = items;
    this.meta = meta;
  }
}