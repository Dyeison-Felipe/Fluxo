import { NestFastifyApplication } from "@nestjs/platform-fastify";
import { EnvConfigService } from "./shared/infrastructure/env-config/env-config.service";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";
import { ConflictExeptionErrorFilter } from "./shared/infrastructure/exeption-filters/conflict-exeption-error.filter";
import { ResourceNotFoundErrorFilter } from "./shared/infrastructure/exeption-filters/resource-not-found-error.filter";
import { BadRequestExeptionErrorFilter } from "./shared/infrastructure/exeption-filters/bad-request-exeption-error.filter";
import { UnauthorizedErrorFilter } from "./shared/infrastructure/exeption-filters/unauthorized-error.filter";
import { ForbiddenErrorFilter } from "./shared/infrastructure/exeption-filters/forbidden-error.filter";
import { fastifyCookie } from "@fastify/cookie";

export async function applyGlobalConfig(
  app: NestFastifyApplication,
  envConfigService: EnvConfigService,
) {
  // swagger config
  if (envConfigService.getNodeEnv() === 'development') {
    const config = new DocumentBuilder()
      .setTitle('Fluxo')
      .setDescription('Fluxo de caixa & comandas')
      .setVersion('1.0.0')
      .addBearerAuth({
        description: 'Informar o JWT para autorizar o acesso',
        name: 'Authorization',
        scheme: 'Bearer',
        type: 'http',
        in: 'Header',
      })
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);
  }

  // cors config
  app.enableCors({
    origin: envConfigService.getOrigin(),
    methods: envConfigService.getAllowedMethods(),
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  })

  await app.register(fastifyCookie, {
    secret: envConfigService.getCookieSecret(),
  });

  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: 422,
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useGlobalPipes(new ValidationPipe());

  // Error filters configs
  app.useGlobalFilters(
    new ConflictExeptionErrorFilter(),
    new ResourceNotFoundErrorFilter(),
    new BadRequestExeptionErrorFilter(),
    new UnauthorizedErrorFilter(),
    new ForbiddenErrorFilter(),
  );

}