import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RoleFunctionalityEntity } from './role-functionalities.entity';

@Index('pk_roles', ['id'], { unique: true })
@Entity('roles', { schema: 'public' })
export class RoleEntity {
  @Column('uuid', { primary: true, name: 'id' })
  id: string;

  @PrimaryGeneratedColumn({ type: 'bigint', name: 'alternative_id' })
  alternativeId: string;

  @Column('character varying', { name: 'name', length: 150 })
  name: string;

  @Column('timestamp with time zone', { name: 'createddate' })
  createddate: Date;

  @Column('timestamp with time zone', { name: 'updateddate', nullable: true })
  updateddate: Date | null;

  @Column('timestamp with time zone', { name: 'deleteddate', nullable: true })
  deleteddate: Date | null;

  @OneToMany(
    () => RoleFunctionalityEntity,
    (roleFunctionalities) => roleFunctionalities.role,
  )
  roleFunctionalities: RoleFunctionalityEntity[];
}
