
const express = require('express');
const { dbConnection } = require('./database/config');
require ('dotenv').config();
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

_ = dbConnection();

app.use('/api/news', require('./routes/news'));

app.listen(process.env.PORT, () => {
    console.log('Server up and running');
    }
);
