import { io } from 'socket.io-client';

const isLocal = window.location.hostname === 'localhost';
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || (isLocal ? 'http://localhost:5000' : 'https://apnaevents.onrender.com');

export const createSocket = () => {
    const socket = io(SOCKET_URL, {
        transports: ['polling', 'websocket'],
        timeout: 20000,
        reconnection: true,
        reconnectionAttempts: 10,
        reconnectionDelay: 500,
        reconnectionDelayMax: 5000,
        randomizationFactor: 0.5
    });

    // Suppress verbose connection error logging
    socket.on('connect_error', (error) => {
        // Silently handle connection errors - socket.io handles retries automatically
        // Only log if we've exceeded all retry attempts
    });

    socket.on('disconnect', (reason) => {
        // Silently handle disconnects
    });

    socket.on('connect', () => {
        // Socket successfully connected
    });

    return socket;
};

// Create a mock socket for when backend is not available
export const createMockSocket = () => {
    return {
        on: () => { },
        off: () => { },
        emit: () => { },
        connect: () => { },
        disconnect: () => { },
        connected: false
    };
};

export default createSocket;
