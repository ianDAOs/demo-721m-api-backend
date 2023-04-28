import express from 'express';
import axios from 'axios';
import getApiKey from '../utils/getApiKey.js';
import { POST_METADATA_API_URL } from '../data/config.js';

const router = express.Router();

router.post('/update-metadata', async (req, res) => {
    try {
        const { description, image, attributes } = req.body;
        const apiKey = await getApiKey();

        const response = await axios({
            method: 'post',
            url: POST_METADATA_API_URL,
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            data: {
                description,
                image,
                updated: new Date().toISOString(),
                attributes
            }
        });

        res.status(response.status).json(response.data);
    } catch (error) {
        console.error('Error updating token metadata:', error);
        res.status(500).send('An error occurred while updating token metadata.');
    }
});

export default router;
