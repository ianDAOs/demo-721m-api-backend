import express from 'express';
import axios from 'axios';
import FormData from 'form-data';
import path from 'path';
import fs from 'fs';
import getApiKey from '../utils/getApiKey.js';
import { POST_MEDIA_API_URL } from '../data/config.js';

const router = express.Router();

const getImagePath = (style, color) => {
    const imagesFolder = path.join('public', 'images');
    const imageName = `${style}_${color}.png`;
    const imagePath = path.join(imagesFolder, imageName);

    if (fs.existsSync(imagePath)) {
        return imagePath;
    } else {
        throw new Error('Image not found');
    }
};

router.post('/upload-image', async (req, res) => {
    try {
        const { style, color } = req.body;
        const apiKey = await getApiKey();

        const imagePath = getImagePath(style, color);

        const form = new FormData();
        form.append('file', fs.createReadStream(imagePath));

        const response = await axios({
            method: 'post',
            url: POST_MEDIA_API_URL,
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                ...form.getHeaders(),
            },
            data: form,
        });

        res.status(response.status).json(response.data);
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).send('An error occurred while uploading the image.');
    }
});

export default router;
