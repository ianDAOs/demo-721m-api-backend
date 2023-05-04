import cors from 'cors';
import express from 'express';
import getMetadata from './routes/getMetadata.js';
import updateMetadata from './routes/updateMetadata.js';
import uploadImage from './routes/uploadImage.js';
import { allowedOrigins } from './data/config.js';

// Express server initialization
const app = express();
const PORT = process.env.PORT || 8080;

// CORS configuration
app.use(cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(express.json());
app.use(getMetadata);
app.use(updateMetadata);
app.use(uploadImage);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});