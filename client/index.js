'use strict';

const express = require("express");
const app = express();
const cors = require("cors");
const superagent = require("superagent");

require('dotenv').config();

app.use(cors());
app.use(express.static('./public'));

app.get('/', async (req,res) => {
    res.render('index')
});


const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.error(`Listening at ${PORT}`);
});