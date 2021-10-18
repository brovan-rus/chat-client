import { createContext } from 'react';

interface IUser {
  user?: string;
  room?: string;
  id?: string;
}

let users: IUser[] = [];
const UsersContext = createContext<typeof users>(users);

export { UsersContext };
