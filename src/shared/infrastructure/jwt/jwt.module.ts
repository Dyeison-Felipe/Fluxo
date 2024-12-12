import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { EnvConfigModule } from '../env-config/env-config.module';
import { EnvConfigService } from '../env-config/env-config.service';
import { JwtRepositoryImpl } from './jwt.repository';

@Module({
  imports: [
    EnvConfigModule,
    JwtModule.registerAsync({
      global: true,
      imports: [EnvConfigModule],
      useFactory: async (configService: EnvConfigService) => ({
        secret: configService.getJwtSecret(),
        signOptions: {
          expiresIn: configService.getExpiresInSeconds(),
        },
      }),
      inject: [EnvConfigService],
    }),
  ],
  controllers: [],
  providers: [
    JwtRepositoryImpl],
  exports: [JwtRepositoryImpl],
})
export class JwtConfigModule {}