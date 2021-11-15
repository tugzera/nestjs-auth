import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CaslModule } from './casl/casl.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [CaslModule],
})
export class AuthModule {}
