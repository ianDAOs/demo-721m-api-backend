const express = require('express');
const apiRoute = require('./routes/apiRoute');
const cors = require('./middlewares/cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors);
app.use(apiRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});