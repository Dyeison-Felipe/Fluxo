import { AuditableSchema } from "src/shared/infrastructure/schema/auditable.schema";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'roles' })
export class RoleSchema extends AuditableSchema {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number

  @Column({ name: 'name' })
  name: string
}