const express = require('express');
const getApi = require('./routes/getApi');
const cors = require('./middlewares/cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors);
app.use(getApi);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});