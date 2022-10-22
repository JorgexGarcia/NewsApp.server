
const express = require('express');
const { dbConnection } = require('./database/config');
require ('dotenv').config();
const cors = require('cors');

const app = express();
app.use(cors());

_ = dbConnection();



app.listen(process.env.PORT, () => {
    console.log('Server up and running');
    }
);
