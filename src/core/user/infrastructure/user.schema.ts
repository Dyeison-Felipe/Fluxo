import { AuditableSchema } from "src/shared/infrastructure/schema/auditable.schema";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('user')
export class UserSchema extends AuditableSchema {

  @PrimaryGeneratedColumn({name: 'id'})
  id: number;

  @Column({name: 'username'})
  username: string;

  @Column({name: 'email'})
  email: string;

  @Column({name: 'password'})
  password: string;

  @Column({name: 'rolesId'})
  rolesId: string;

  @Column({ name: 'ativo', type: 'bit' })
  active: boolean;
}