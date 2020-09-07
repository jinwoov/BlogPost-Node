'use strict';

// Dependencies for site work
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const yup = require("yup");
const monk = require("monk");
const schema = yup.object().shape({
    slug: yup.string(),
    date: yup.date(),
    title: yup.string(),
    content: yup.string()
});

// using the noanoid to create unique id
const {nanoid} = require("nanoid");

require("dotenv").config();

// mongoDB dependencies
const db = monk(process.env.MONGO_URI);
const posts = db.get('title');
posts.createIndex('postNum');

const app = express();
 
// using middlewares
app.use(helmet());
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());

app.get('/post', (req, res) => {
     return posts.find({})
      .then((post) => {
          res.json(post);
      });

});

// post blog post
app.post('/post', async (req, res, next) => {
    let { slug, date, title, content } = req.body;
    try{
        await schema.validate({
            slug,
            date,
            title,
            content
        });
        if(!slug) {
            slug = nanoid(5);
        } else {
            const existing = await posts.findOne({ slug });
            if(existing) {
                throw new Error('Slug in use');
            }
        }
        const newPosts = {
            slug,
            date,
            title,
            content
        };
        const created = await posts.insert(newPosts);
        res.json(created);
    } catch (error) {
        next(error);
    }
});

app.use((error, req, res, next) => {
    if(error.status) {
        res.status(error.status);
    } else {
        res.status(500);
    }
    res.json({
        message: error.message,
        stack: process.env.NODE_ENV == 'production' ? 'sorry' : error.stack
    });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.error(`Listening at ${PORT}`);
});

//// it is still in working phase i am trying to get get route to work to pull up mango db collections