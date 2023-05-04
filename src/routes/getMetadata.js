import fetch from 'node-fetch';
import express from 'express';
import { GET_API_URL } from '../data/config.js';

const router = express.Router();

// Proxy to get metadata for a token from Syndicate API
router.get('/get-metadata/:token', async (req, res) => {

    const { token } = req.params;
    const url = `${GET_API_URL}/${token}`;

    try {
        const apiResponse = await fetch(url);
        const data = await apiResponse.json();
        res.status(apiResponse.status).json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('An error occurred while fetching data from the API.');
    }
});

export default router;