import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Action } from './casl/action-enum';
import { Article } from './casl/article';
import { AppAbility } from './casl/casl-ability.factory';
import { CheckPermissions } from './casl/check-permissions-decorator';
import { SignInCredentialsDto } from './dtos/signin-credentials.dto';
import { PermissionGuard } from './guards/permissions-guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @UseGuards(PermissionGuard)
  @CheckPermissions((ability: AppAbility) => ability.can(Action.Read, Article))
  async test() {
    return this.authService.test();
  }

  @Post('/sign-in')
  async signIn(@Body(ValidationPipe) credentialsDto: SignInCredentialsDto) {
    return this.authService.signIn(credentialsDto);
  }
}
