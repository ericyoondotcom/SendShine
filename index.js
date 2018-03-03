const express = require('express');
const app = express();
const language = require('@google-cloud/language');



const client = new language.LanguageServiceClient();

var messages = [

];

app.use(express.static(__dirname + "/public"));

app.get("/sendMessage/:msg", function(req, res) {
    console.log(req.params.msg);
    const document = {
      content: req.params.msg,
      type: 'PLAIN_TEXT',
    };

    client
    .analyzeSentiment({document: document})
    .then(results => {
        const sentiment = results[0].documentSentiment;

        console.log(`Sentiment score: ${sentiment.score}`);
        console.log(`Sentiment magnitude: ${sentiment.magnitude}`);

        if(sentiment.score <= 0){
            console.log("negative post detected");
        }else{
            messages.push(req.params.msg);
        }

        res.json({"sentiment": sentiment.score});
        
    })
    .catch(err => {
        console.error('ERROR:', err);
    });

});

app.get("/getMessages/", function(req, res) {
    res.json(messages);
});

app.get("/clearMessages/", function(req, res) {
    messages = [];
    res.sendStatus(200).end();
});

app.listen(1234, () => console.log('SendShine on port 1234!'))