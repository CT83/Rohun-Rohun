import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from 'dotenv';
import fetch from "node-fetch";

dotenv.config()

var app = express();
import { IntentManager } from "./IntentManager.mjs";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

var im = new IntentManager(process.env.PROJECT_ID)

// Routes
app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.post('/listen', function (req, res) {
    console.log(req.body);
    var input = req.body[0];
    var text = im.getResponse(input).then(text => {
        fetch('http://localhost:5000/speak', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text }),
        }).then(response => response.json()).then(data => {
            console.log('Success:', data);
        }).catch((error) => {
            console.error('Error:', error);
        });

        res.send({ "msg": "Success" });
    });
});

// Listen
var port = process.env.PORT || 6969;
app.listen(port);

console.log('Listening on localhost:' + port);