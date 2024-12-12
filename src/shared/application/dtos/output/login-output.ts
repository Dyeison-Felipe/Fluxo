import { UserOutput } from './user-output';

export type LoginOutput = {
  user: UserOutput;
  token: string;
};