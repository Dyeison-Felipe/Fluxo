import { Global, Module } from '@nestjs/common';
import { LoggedUserServiceImpl } from './logged-user';

const LOGGED_USE_TOKEN='LOGGED_REPOSITORY'

@Global()
@Module({
  providers: [
    { provide: LOGGED_USE_TOKEN, useClass: LoggedUserServiceImpl },
  ],
  exports: [LOGGED_USE_TOKEN],
})
export class LoggedModule {}