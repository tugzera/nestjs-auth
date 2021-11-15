import { Injectable } from '@nestjs/common';
import { Action } from './casl/action-enum';
import { Article } from './casl/article';
import { CaslAbilityFactory } from './casl/casl-ability.factory';
import { User } from './casl/user';

@Injectable()
export class AuthService {
  constructor(private caslAbilityFactory: CaslAbilityFactory) {}

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
}
