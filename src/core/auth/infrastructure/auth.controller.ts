import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FastifyReply } from 'fastify';
import { LoginUseCase } from '../application/usecase/login.usecase';
import { LoginRequestDto } from './dtos/login-request.dto';
import { LoginPresenter } from 'src/shared/infrastructure/presenters/login-presenter';
import { AuthConstants } from 'src/shared/application/constants/auth-constants';

@ApiTags('auth')
@Controller('/api/auth/v1')
export class AuthController {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  @ApiOperation({ summary: 'Verifica se o token de autenticação é válido' })
  @ApiResponse({
    status: 200,
    schema: {
      type: 'object',
      properties: {
        success: {
          type: 'boolean',
        },
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Erro desconhecido',
  })
  @Get('/verify-token')
  @UseGuards(AuthGuard)
  async verifyToken(): Promise<Record<'success', boolean>> {
    return { success: true };
  }

  @ApiOperation({ summary: 'Faz o login de um usuário' })
  @ApiResponse({
    status: 200,
    type: LoginPresenter,
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
  @HttpCode(HttpStatus.OK)
  @Post('/login')
  async login(
    @Res({ passthrough: true }) reply: FastifyReply,
    @Body() loginRequestDto: LoginRequestDto,
  ): Promise<LoginPresenter> {
    return await this.loginUseCase.execute({
      ...loginRequestDto,
      setCookie: reply.setCookie.bind(reply),
    });
  }

  @ApiOperation({ summary: 'Faz o logout de um usuário' })
  @ApiResponse({
    status: 204,
  })
  @ApiResponse({
    status: 500,
    description: 'Erro desconhecido',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('/logout')
  async logout(@Res({ passthrough: true }) reply: FastifyReply): Promise<void> {
    reply.clearCookie(AuthConstants.tokenName);
  }
}