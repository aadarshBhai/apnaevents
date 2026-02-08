import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'https://eventdekho-backend.onrender.com';

export const createSocket = () => {
    const socket = io(SOCKET_URL, {
        transports: ['websocket', 'polling'],
        timeout: 20000,
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000
    });

    // Add connection error handling to reduce console noise
    socket.on('connect_error', (error) => {
        // Only log in development, not in production
        if (import.meta.env.DEV) {
            console.log('Socket connection failed (backend not deployed yet):', error.message);
        }
    });

    socket.on('disconnect', (reason) => {
        if (import.meta.env.DEV) {
            console.log('Socket disconnected:', reason);
        }
    });

    return socket;
};

// Create a mock socket for when backend is not available
export const createMockSocket = () => {
    return {
        on: () => {},
        off: () => {},
        emit: () => {},
        connect: () => {},
        disconnect: () => {},
        connected: false
    };
};

export default createSocket;
