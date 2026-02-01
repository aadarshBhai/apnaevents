import api from './config';

export const getEvents = async (params = {}) => {
    const res = await api.get('/events', { params });
    return res.data;
};

export const getFeaturedEvents = async () => {
    const res = await api.get('/events/featured');
    return res.data;
};

export const getEventById = async (id) => {
    const res = await api.get(`/events/${id}`);
    return res.data;
};

export const createEvent = async (eventData) => {
    const res = await api.post('/events', eventData);
    return res.data;
};

export const updateEvent = async (id, eventData) => {
    const res = await api.put(`/events/${id}`, eventData);
    return res.data;
};

export const deleteEvent = async (id) => {
    const res = await api.delete(`/events/${id}`);
    return res.data;
};

export const getEventCategories = async () => {
    const res = await api.get('/events/categories/list');
    return res.data;
};
