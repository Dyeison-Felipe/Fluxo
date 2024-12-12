import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserUsecase } from "../application/create-user.usecase";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UserPresenter } from "src/shared/infrastructure/presenters/user-presenter";

@Controller('/api/user/v1')
export class UserController {

  constructor(private readonly createUsecase:CreateUserUsecase)  {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserPresenter> {
    const user = await this.createUsecase.execute(createUserDto);

    return user;
  }

}