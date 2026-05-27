import api from './config';

export const triggerEventCleanup = async () => {
    try {
        const response = await api.post('/cleanup/cleanup');
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Failed to trigger cleanup' };
    }
};

export const getCleanupStatus = async () => {
    try {
        const response = await api.get('/cleanup/status');
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Failed to get cleanup status' };
    }
};
