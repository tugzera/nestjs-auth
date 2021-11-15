import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './users-entity';

@Index('pk_userroles', ['id'], { unique: true })
@Entity('userroles', { schema: 'public' })
export class UserRoleEntity {
  @Column('uuid', { primary: true, name: 'id' })
  id: string;

  @PrimaryGeneratedColumn({ type: 'bigint', name: 'alternative_id' })
  alternativeId: string;

  @Column('uuid', { name: 'role_id' })
  roleId: string;

  @Column('timestamp with time zone', { name: 'createddate' })
  createddate: Date;

  @Column('timestamp with time zone', { name: 'updateddate', nullable: true })
  updateddate: Date | null;

  @Column('timestamp with time zone', { name: 'deleteddate', nullable: true })
  deleteddate: Date | null;

  @ManyToOne(() => UserEntity, (users) => users.userRoles, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: UserEntity;
}
