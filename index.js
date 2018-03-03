const express = require('express');
const app = express();

app.use(express.static(__dirname + "/public"));

app.get("/sendMessage/:msg", function(req, res) {
    console.log(req.params.msg);
});

app.listen(1234, () => console.log('SendShine on port 1234!'))