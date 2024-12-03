import { AuditableEntity, AuditableEntityProps } from "src/shared/infrastructure/entities/auditable.entity";

type RoleEntityProps = AuditableEntityProps & {
  id?: number;
  name: string;
}

export class RoleEntity extends AuditableEntity {
  id: number;
  name: string;

  constructor(props: RoleEntityProps) {
    super(props);
    this.id = props.id;
    this.name = props.name;
  }
}
