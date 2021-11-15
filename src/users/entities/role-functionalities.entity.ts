import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { RoleEntity } from './roles.entity';

@Index('pk_rolefunctionalities', ['id'], { unique: true })
@Entity('rolefunctionalities', { schema: 'public' })
export class RoleFunctionalityEntity {
  @Column('uuid', { primary: true, name: 'id' })
  id: string;

  @PrimaryGeneratedColumn({ type: 'bigint', name: 'alternativeid' })
  alternativeid: string;

  @Column('uuid', { name: 'functionality_id' })
  functionalityId: string;

  @Column('timestamp with time zone', { name: 'createddate' })
  createddate: Date;

  @Column('timestamp with time zone', { name: 'updateddate', nullable: true })
  updateddate: Date | null;

  @Column('timestamp with time zone', { name: 'deleteddate', nullable: true })
  deleteddate: Date | null;

  @ManyToOne(() => RoleEntity, (roles) => roles.roleFunctionalities, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'role_id', referencedColumnName: 'id' }])
  role: RoleEntity;
}
