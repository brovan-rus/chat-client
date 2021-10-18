import { createContext } from 'react';
import io from 'socket.io-client';
import { socketIOServerURL } from '../utils/constants';

const socket = io(socketIOServerURL);
const SocketContext = createContext<typeof socket>(undefined!);

export { SocketContext, socket };
