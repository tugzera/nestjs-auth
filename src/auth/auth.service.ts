import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';

import { UsersService } from '../users/users.service';
import { Action } from './casl/action-enum';
import { Article } from './casl/article';
import { CaslAbilityFactory } from './casl/casl-ability.factory';
import { User } from './casl/user';
import { SignInCredentialsDto } from './dtos/signin-credentials.dto';
import { InvalidCredentialsException } from './exceptions/invalid-credentials-exception';

@Injectable()
export class AuthService {
  constructor(
    private caslAbilityFactory: CaslAbilityFactory,
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async test() {
    const user = new User();
    user.id = 1;
    user.isAdmin = false;

    const article = new Article();
    article.authorId = 2;

    const ability = this.caslAbilityFactory.createForUser(user);
    console.log(ability);
    console.log(ability.can(Action.Read, article)); // true
    console.log(ability.can(Action.Delete, article)); // false
    console.log(ability.can(Action.Create, article)); // false
    console.log(ability.can(Action.Update, article)); // true
  }

  private validatePasswordHash(hash: string, password: string): boolean {
    return compareSync(password, hash);
  }

  async signIn(credentialsDto: SignInCredentialsDto) {
    const { email, password } = credentialsDto;
    const foundUser = await this.usersService.findByEmail(email);
    if (!foundUser) throw new InvalidCredentialsException();
    const isValid = this.validatePasswordHash(foundUser.passwordHash, password);
    if (!isValid) throw new InvalidCredentialsException();
    return {
      accessToken: this.jwtService.sign(
        {
          userId: foundUser.id,
          email: foundUser.email,
        },
        { secret: process.env.JWT_SECRET, expiresIn: '15m' },
      ),
    };
  }
}
