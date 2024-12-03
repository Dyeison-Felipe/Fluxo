import { Body, Controller, Get, Param, Post, Put, Query } from "@nestjs/common";
import { CreateUseCase } from "../application/create.usecase";
import { RolePresenter } from "src/shared/infrastructure/presenters/roles-presenter";
import { CreateRoleDto } from "./dtos/create-role.dto";
import { FindAllUseCase } from "../application/find-all-paginate.usecase";
import { ApiBody, ApiOperation, ApiQuery, ApiResponse } from "@nestjs/swagger";
import { Pagination } from "nestjs-typeorm-paginate";
import { UpdateUseCase } from "../application/update.usecase";
import { UpdateRoleDto } from "./dtos/update-role.dto";

@Controller('/api/roles/v1')
export class RoleController {
  constructor(private readonly createUseCase: CreateUseCase, private readonly findAllUseCase: FindAllUseCase,
    private readonly updateUseCase: UpdateUseCase
  ) { }

  @Get()
  @ApiOperation({ summary: 'Lista todos as roles' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async findAll(@Query('page') page = 1, @Query('limit') limit = 10): Promise<Pagination<RolePresenter>> {
    const roles = await this.findAllUseCase.execute({ page, limit });

    return roles;
  }

  @Post()
  @ApiOperation({ summary: 'Cria uma nova role' })
  @ApiBody({ type: CreateRoleDto, description: 'Dados para criação de uma nova role' })
  async create(@Body() createRoleDto: CreateRoleDto): Promise<RolePresenter> {
    const newRole = await this.createUseCase.execute(createRoleDto);

    return newRole;
  }

  @Put('/update-role/:id')
  async update(@Param('id') id: number, @Body() updateRoleDto: UpdateRoleDto): Promise<RolePresenter> {
    const updateRole = await this.updateUseCase.execute({ id, name: updateRoleDto.name })

    return updateRole;
  }

}