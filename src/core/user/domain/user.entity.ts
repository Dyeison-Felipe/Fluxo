import { AuditableEntity, AuditableEntityProps } from "src/shared/infrastructure/entities/auditable.entity";

type UserEntityProps = AuditableEntityProps & {
  id: number;
  username: string;
  email: string;
  password: string;
  rolesId: number;
  active: number;
}

export class UserEntity extends AuditableEntity {
  id: number;
  username: string;
  email: string;
  password: string;
  rolesId: number;
  active: number;

  constructor(props: UserEntityProps) {
    super(props);
    this.id = props.id;
    this.username = props.username;
    this.email = props.email;
    this.password = props.password;
    this.rolesId = props.rolesId;
    this.active = props.active;
  }
}