import axios from 'axios';

const checkApi = async () => {
    try {
        console.log('Fetching events from live API...');
        const response = await axios.get('https://apnaevents.onrender.com/api/events?status=upcoming');
        console.log('Status code:', response.status);
        console.log('Events count:', response.data.events.length);
        response.data.events.forEach(e => {
            console.log(`- ${e.title}`);
        });
    } catch (error) {
        console.error('API Error:', error.message);
        if (error.response) {
            console.error('Response data:', error.response.data);
        }
    }
};

checkApi();
