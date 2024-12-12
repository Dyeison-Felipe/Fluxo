import { RoleEntity } from "src/core/role/domain/role.entity";
import { AuditableEntity, AuditableEntityProps } from "src/shared/infrastructure/entities/auditable.entity";

type UserEntityProps = AuditableEntityProps & {
  id?: number;
  username: string;
  email: string;
  password: string;
  roleId: RoleEntity;
}

export class UserEntity extends AuditableEntity {
  id: number;
  username: string;
  email: string;
  password: string;
  roleId: RoleEntity;

  constructor(props: UserEntityProps) {
    super(props);
    this.id = props.id;
    this.username = props.username;
    this.email = props.email;
    this.password = props.password;
    this.roleId = props.roleId;
  }
}