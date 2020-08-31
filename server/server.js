'use strict';

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");


require("dotenv").config();

const app = express();
 
app.use(helmet());
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());

app.get('/post', (req, res) => {
    /// get all the blog post
    res.json({
        message: "hello this is jin"
    });
});

// post blog post

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.error(`Listening at ${PORT}`);
});