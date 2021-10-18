import { createContext } from 'react';

const CurrentUserContext = createContext({ name: '', room: '' });

export { CurrentUserContext };
