import { Injectable } from '@nestjs/common';
import { hashSync } from 'bcrypt';
import { v4 as uuid } from 'uuid';

import { CreateUserDto } from './dtos';
import { UserEntity } from './entities';
import { UserRepository } from './user-repository';

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {}

  private hashPassword(password: string): string {
    return hashSync(password, Number(process.env.HASH_ROUNDS));
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const { password, email, name } = createUserDto;
    const user = this.userRepository.create({
      passwordHash: this.hashPassword(password),
      email,
      name,
      securityStamp: uuid(),
    });
    return this.userRepository.save(user);
  }
}
