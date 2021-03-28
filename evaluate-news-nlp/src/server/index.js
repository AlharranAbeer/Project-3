var path = require('path')
// URL and API Credintials
let projectData={}

/*
    SOME OF THE CODE HERE 
    IS TAKEN FROM MY PREVIOUS PROJECT
    : Weather journal Applicatuion :
*/
//express server variables
// Require Express to run server and routes
const express = require('express');
/* Dependencies */
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
app.use(express.static('dist'))

// env configurations
const dotenv = require('dotenv');
dotenv.config();
// mockAPI test
const mockAPIResponse = require('./mockAPI.js')
const { response } = require('express')
const fetch = require('node-fetch')

// API CRED
const API_KEY=process.env.API_KEY;
const BaseURL='https://api.meaningcloud.com/sentiment-2.1?';

// ROUTES 
app.post('/add', async function(req,res){
    let parm =`key=${API_KEY}&url=${req.body.url}&lang=en`;
    console.log(BaseURL+parm);
    const response = await fetch(BaseURL+parm)
    try {
        const data = await response.json()
        projectData = {
            score_tag:data.score_tag,
            agreement:data.agreement,
            subjectivity:data.subjectivity,
            confidence:data.confidence,
            irony:data.irony
        }
        res.send(projectData);
    }catch(error){
        console.log(error);
    }
})
app.get('/all', function (req, res) {
    res.sendFile('dist/index.html')
})
app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})