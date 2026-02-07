import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'https://eventdekho-backend.onrender.com';

export const createSocket = () => {
    return io(SOCKET_URL, {
        transports: ['websocket', 'polling'],
        timeout: 20000,
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000
    });
};

export default createSocket;
