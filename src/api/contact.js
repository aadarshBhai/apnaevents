import api from './config';

export const sendContactMessage = async (formData) => {
    try {
        const response = await api.post('/contact', formData);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Failed to send message' };
    }
};
