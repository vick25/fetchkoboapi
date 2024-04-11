'use server';
import axios from 'axios';

const token = process.env.TOKEN;

export const fetchFormData = async (formId) => {
    const headers = { "Authorization": `Token ${token}` };
    try {
        const response = await axios.get(`https://kf.kobotoolbox.org/api/v2/assets/${formId}/data/`, { headers: headers });
        return response.data;
    } catch (error) {
        console.error('Error fetching form data:', error);
    }
};
