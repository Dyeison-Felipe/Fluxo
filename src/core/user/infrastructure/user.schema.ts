import { RoleSchema } from "src/core/role/infrastructure/role.schema";
import { AuditableSchema } from "src/shared/infrastructure/schema/auditable.schema";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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

  @ManyToOne(() => RoleSchema, (role) => role.id)
  @JoinColumn({name: 'roleId'})
  roleId: RoleSchema;
}