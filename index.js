'use strict';

const express = require("express");
const app = express();
const cors = require("cors");
const superagent = require("superagent");
require('dotenv').config();
const backendAPI = "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@jinwookim928";


app.use(cors());
app.use(express.static('./public'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:true}));

app.get('/', homeControl);

function homeControl(req, res) {
    let url = backendAPI;
    superagent.get(url)
        .then(data => {
            // console.log(data.body.items)
            res.render('pages/index', {bpost: data.body.items });
        })
}



const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.error(`Listening at ${PORT}`);
});