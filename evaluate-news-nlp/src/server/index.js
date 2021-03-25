var path = require('path')
const express = require('express')
const fetch = require('node-fetch')
const mockAPIResponse = require('./mockAPI.js')
const { response } = require('express')

const app = express()

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

app.use(express.static('dist'))


app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    // res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})


// POST ENDPOINT

app.post('/analysis', function(req,res){
    const API_KEY = process.env.API_KEY;
    const url = req.body.articleurl;
    const BaseURL = 'https://api.meaningcloud.com/sentiment-2.1';
    const parameters = `?key=${API_KEY}&url=${url}&lang=en&model=general`;
    fetch(BaseURL+parameters,{
        method: "POST",
        headers: {
            "Content-Type": "application/JSON",

        }
    }).then((response)=>{
        return response.json();
    }).then((data)=>{
        res.send({
            score_tag: data.score_tag,
            agreement: data.agreement,
            subjectivity: data.subjectivity,
            confidence: data.confidence,
            irony: data.irony
        })
    });
})
