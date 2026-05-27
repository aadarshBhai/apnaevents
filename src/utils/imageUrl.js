const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://apnaevents.onrender.com';

export const getImageUrl = (imagePath) => {
    if (!imagePath) return '';
    if (imagePath.startsWith('http')) return imagePath;
    return `${API_BASE_URL}${imagePath}`;
};

export default getImageUrl;
