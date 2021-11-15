import { Column, Entity, Index, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/entity/base-entity';

import { UserRoleEntity } from './user-roles.entity';

@Index('pk_users', ['id'], { unique: true })
@Entity('users', { schema: 'public' })
export class UserEntity extends BaseEntity {
  @Column('character varying', { name: 'name', length: 400 })
  name: string;

  @Column('character varying', { name: 'email', length: 300 })
  email: string;

  @Column('uuid', { name: 'security_stamp' })
  securityStamp: string;

  @Column('timestamp with time zone', {
    name: 'admin_blocked_date',
    nullable: true,
  })
  adminBlockedDate: Date | null;

  @Column('character varying', { name: 'password_hash', length: 100 })
  passwordHash: string;

  @Column('character varying', {
    name: 'last_login_ip',
    length: 15,
    nullable: true,
  })
  lastLoginIp: string;

  @Column('character varying', {
    name: 'current_access_token',
    nullable: true,
    length: 500,
  })
  currentAccessToken: string | null;

  @Column('character varying', {
    name: 'current_refresh_token',
    nullable: true,
    length: 500,
  })
  currentRefreshToken: string | null;

  @OneToMany(() => UserRoleEntity, (userRoles) => userRoles.user)
  userRoles: UserRoleEntity[];
}
