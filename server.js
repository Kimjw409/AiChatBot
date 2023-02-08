var express = require('express');
var cors = require('cors');
var app = express();
var request = require('request');
var { OpenAIApi, Configuration } = require('openai');
require('dotenv').config();
app.use(cors());
app.use(express.static(__dirname + '/public'));

let config = new Configuration({
  apiKey: process.env.API_CHAT
});
let openai = new OpenAIApi(config);


app.get('/', function(req,res){
    res.sendFile(__dirname + '/index.html')
})

app.get('/ai', function(req,res){
     var query = req.query.q;

     openai.createCompletion({
        model: "text-davinci-002",
        prompt: query,
        temperature: 0.7,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      }).then((result)=>{
        
        res.status(200).json(result.data.choices[0].text);
      })

    });


 app.listen(3000, function () {
   console.log('http://localhost:3000/ app listening on port 3000!');
 });