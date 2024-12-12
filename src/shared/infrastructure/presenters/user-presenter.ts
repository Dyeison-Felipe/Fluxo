import { RolePresenter } from "./roles-presenter";

export class UserPresenter {
  id: number;
  username: string;
  email: string;
  roleId: RolePresenter;
}