const fetch = require('node-fetch');
const express = require('express');
const router = express.Router();

const apiUrl = 'https://meta-data-usvsm2urta-uc.a.run.app';

router.get('*', async (req, res) => {

    try {
        const apiResponse = await fetch(apiUrl);
        const data = await apiResponse.json();

        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.status(apiResponse.status).json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('An error occurred while fetching data from the API.');
    }

});

module.exports = router;