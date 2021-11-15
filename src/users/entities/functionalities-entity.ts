import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('pk_functionalities', ['id'], { unique: true })
@Entity('functionalities', { schema: 'public' })
export class FunctionalityEntity {
  @Column('uuid', { primary: true, name: 'id' })
  id: string;

  @PrimaryGeneratedColumn({ type: 'bigint', name: 'alternative_id' })
  alternativeId: string;

  @Column('character varying', { name: 'name', length: 150 })
  name: string;

  @Column('character varying', { name: 'slug', length: 50 })
  slug: string;

  @Column('character varying', {
    name: 'description',
    nullable: true,
    length: 500,
  })
  description: string | null;

  @Column('timestamp with time zone', { name: 'createddate' })
  createddate: Date;

  @Column('timestamp with time zone', { name: 'updateddate', nullable: true })
  updateddate: Date | null;

  @Column('timestamp with time zone', { name: 'deleteddate', nullable: true })
  deleteddate: Date | null;
}
