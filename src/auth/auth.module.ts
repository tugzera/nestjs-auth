import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { CaslModule } from './casl/casl.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [CaslModule],
})
export class AuthModule {}
