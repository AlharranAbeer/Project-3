var path = require('path')
var https = require('follow-redirects').https;
var fs = require('fs');
/*
    SOME OF THE CODE HERE 
    IS TAKEN FROM MY PREVIOUS PROJECT
    : Weather journal Applicatuion :
*/
//express server variables
const bodyParser = require('body-parser');
const fetch = require('node-fetch')
const express = require('express')
const cors = require('cors');

// env configurations
const dotenv = require('dotenv');
dotenv.config();

// mockAPI test
const mockAPIResponse = require('./mockAPI.js')
const { response } = require('express')

// server setup
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
app.use(cors());
app.use(express.static('dist'))

// URL and API Credintials
let projectData={}
const API_KEY=process.env.API_KEY;
const BaseURL='https://api.meaningcloud.com/sentiment-2.1?';

// ROUTES 
app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})
app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})
app.post('/add', async function(req,res){
    let parm =`key=${API_KEY}&url=${req.body.articleurl}&lang=en&model=general`;
    const {formText} = req.body;
    const data = await fetch(BaseURL+parm)
    try {
        const data = await response.json()
        projectData = {
            score_tag:data.score_tag,
            agreement:data.agreement,
            subjectivity:data.subjectivity,
            confidence:data.confidence,
            irony:data.irony
        }
        res.send(data);
    }catch(error){
        console.log(error);
    }
})