'use strict';

const express = require("express");
const app = express();
const cors = require("cors");
const superagent = require("superagent");
const backendAPI = process.env.BACKAPI || "http://localhost:3000/post";

require('dotenv').config();

app.use(cors());
app.use(express.static('./public'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:true}));

app.get('/', homeControl);
app.get('/login', loginUser);

function loginUser(req,res) {
    res.render('pages/login')
}


function homeControl(req, res) {
    let url = backendAPI;
    superagent.get(url)
        .then(data => {
            res.render('pages/index', {bpost: data.body });
        })
}



const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.error(`Listening at ${PORT}`);
});