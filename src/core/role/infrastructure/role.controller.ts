import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query, UseGuards, ValidationPipe } from "@nestjs/common";
import { RolePresenter } from "src/shared/infrastructure/presenters/roles-presenter";
import { CreateRoleDto } from "./dtos/create-role.dto";
import { FindAllRoleUseCase } from "../application/find-all-paginate-role.usecase";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiResponse, getSchemaPath } from "@nestjs/swagger";
import { Pagination } from "nestjs-typeorm-paginate";
import { UpdateRoleUseCase } from "../application/update-role.usecase";
import { UpdateRoleDto } from "./dtos/update-role.dto";
import { DeleteRoleUseCase } from "../application/delete-role.usecase";
import { CreateRoleUseCase } from "../application/create-role.usecase";
import { AuthGuard } from "src/core/auth/infrastructure/auth.guard";
import { getItemsSchemaDocs, paginatedSchemaDocs } from "src/shared/infrastructure/docs/pagination";

@Controller('/api/roles/v1')
export class RoleController {
  constructor(private readonly createUseCase: CreateRoleUseCase, private readonly findAllUseCase: FindAllRoleUseCase,
    private readonly updateUseCase: UpdateRoleUseCase, private readonly deleteUseCase: DeleteRoleUseCase
  ) { }

  @Get()
  @ApiOperation({ summary: 'Lista todos as roles' })
  @ApiResponse({
    status: 200,
    schema: {
      type: 'object',
      properties: {
        ...paginatedSchemaDocs,
        ...getItemsSchemaDocs({ $ref: getSchemaPath(RolePresenter) }),
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Erro desconhecido',
  })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async findAll(@Query('page') page = 1, @Query('limit') limit = 10): Promise<Pagination<RolePresenter>> {
    const roles = await this.findAllUseCase.execute({ page, limit });

    return roles;
  }

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Cria uma nova role' })
  @ApiResponse({
    status: 201,
    type: RolePresenter,
  })
  @ApiResponse({
    status: 400,
    description:
      'Ocorre quando o nome da noticia já existe OU quando o nome do tipo da noticia fornecido não é encontrado',
  })
  @ApiResponse({
    status: 401,
    description: 'Acesso não autorizado',
  })
  @ApiResponse({
    status: 422,
    description: 'Parâmetros do body inválidos',
  })
  @ApiResponse({
    status: 500,
    description: 'Erro desconhecido',
  })
  @ApiBody({ type: CreateRoleDto, description: 'Dados para criação de uma nova role' })
  async create(@Body() createRoleDto: CreateRoleDto): Promise<RolePresenter> {
    const newRole = await this.createUseCase.execute(createRoleDto);

    return newRole;
  }

  @Put('/update-role')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Atualiza uma role' })
  @ApiResponse({
    status: 200,
    type: RolePresenter,
  })
  @ApiResponse({
    status: 400,
    description:
      'Ocorre quando a descrição não é encontrada pelo ID fornecido OU o tipo da descrição não é encontrada pelo nome fornecido OU o nome da descrição fornecido já existe',
  })
  @ApiResponse({
    status: 401,
    description: 'Acesso não autorizado',
  })
  @ApiResponse({
    status: 422,
    description: 'Parâmetros do body inválidos',
  })
  @ApiResponse({
    status: 500,
    description: 'Erro desconhecido',
  })
  @UseGuards(AuthGuard)
  async update(@Body() updateRoleDto: UpdateRoleDto): Promise<RolePresenter> {
    const updateRole = await this.updateUseCase.execute({ id: updateRoleDto.id, name: updateRoleDto.name })

    return updateRole;
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async delete(@Param() id: number): Promise<void> {
    return await this.deleteUseCase.execute({ id });
  }

}