import { Injectable } from '@nestjs/common';
import { UserRepository } from './user-repository';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UserRepository) {}

  async createUser(data: any) {}
}
