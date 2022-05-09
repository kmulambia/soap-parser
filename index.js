const express = require('express')
var bodyParser = require('body-parser');
const soapRequest = require('easy-soap-request');
const { response } = require('express');
var DOMParser = require('xmldom').DOMParser;
var parser = new DOMParser();
// example data
const url = 'http://restapi.adequateshop.com/api/Traveler';
const sampleHeaders = {
    'Content-Type': 'text/xml;charset=UTF-8',
};
var app = express();
app.use(bodyParser.text());
app.post(
    '/interface',
    (req, res) => {
        let xml = req.body;
        // usage of module
        soapRequest({ url: url, headers: sampleHeaders, xml: xml, timeout: 1000 }).then(x => {
           res.send(x.response.body);
           res.end();
        }, (e => {
            console.log(e)
        }))  
    }
)
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})
