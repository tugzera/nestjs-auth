import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { UserRoleEntity } from './user-roles-entity';

@Index('pk_users', ['id'], { unique: true })
@Entity('users', { schema: 'public' })
export class UserEntity {
  @Column('uuid', { primary: true, name: 'id' })
  id: string;

  @PrimaryGeneratedColumn({ type: 'bigint', name: 'alternative_id' })
  alternativeId: string;

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

  @Column('character varying', { name: 'pasword_hash', length: 100 })
  paswordHash: string;

  @Column('character varying', { name: 'last_login_ip', length: 15 })
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

  @Column('timestamp with time zone', { name: 'createddate' })
  createddate: Date;

  @Column('timestamp with time zone', { name: 'updateddate', nullable: true })
  updateddate: Date | null;

  @Column('timestamp with time zone', { name: 'deleteddate', nullable: true })
  deleteddate: Date | null;

  @OneToMany(() => UserRoleEntity, (userRoles) => userRoles.user)
  userRoles: UserRoleEntity[];
}
