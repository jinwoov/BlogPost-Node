'use strict';

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const yup = require("yup");
const schema = yup.object().shape({
    date: yup.date(),
    content: yup.string()
});
const {nanoid} = require("nanoid");

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
app.post('/post', (req, res) => {
    const { date, content } = req.body;
    console.log(date);

    try{

    } catch (error) {

    }

})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.error(`Listening at ${PORT}`);
});