import fetch from 'node-fetch';
import express from 'express';
import { GET_API_URL } from '../data/config';

const router = express.Router();

router.get('/get-metadata', async (req, res) => {
    try {
        const apiResponse = await fetch(GET_API_URL);
        const data = await apiResponse.json();
        res.status(apiResponse.status).json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('An error occurred while fetching data from the API.');
    }
});

export default router;