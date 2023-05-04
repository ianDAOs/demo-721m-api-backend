import express from 'express';
import axios from 'axios';
import getApiKey from '../utils/getApiKey.js';
import { POST_METADATA_API_URL } from '../data/config.js';

const router = express.Router();

// Proxy to update metadata for a token with Syndicate API
router.post('/update-metadata/:token', async (req, res) => {

    const { token } = req.params;
    const postMetadataUrl = `${POST_METADATA_API_URL}/${token}`;

    try {
        const { description, image, attributes } = req.body;
        const apiKey = await getApiKey();

        const response = await axios({
            method: 'post',
            url: postMetadataUrl,
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