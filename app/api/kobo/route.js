// pages/api/kobo.js

import axios from 'axios';

const token = process.env.TOKEN;

export async function GET(req, res) {
    // console.log(req);
    return new Response("Hello Vick");
    const authToken = req.headers.authorization;
    const { formId } = req.query;
    console.log(formId, authToken);
    try {
        const response = await axios.get(`https://kf.kobotoolbox.org/api/v2/assets/${formId}/data/`, {
            headers: {
                Authorization: authToken,
            },
        });
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response.status).json(error.response.data);
    }
}
