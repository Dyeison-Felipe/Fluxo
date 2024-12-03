export type AuditableEntityProps = {
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

export class AuditableEntity {
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;

  constructor(props: AuditableEntityProps) {
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.deletedAt = props.deletedAt;
  }
}