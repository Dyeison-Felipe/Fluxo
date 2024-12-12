import { NumericType } from "typeorm"
import { RoleOutput } from "./role-output";

export type UserOutput = {
  id: number;
  username: string;
  email: string;
  roleId: RoleOutput;
}