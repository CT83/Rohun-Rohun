import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from 'dotenv';
import fetch from "node-fetch";
import stopword from 'stopword';
import wordsToNumbers from 'words-to-numbers';


dotenv.config()

var app = express();
import { IntentManager } from "./IntentManager.mjs";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

var im = new IntentManager(process.env.PROJECT_ID)

var prevInputs = [];
var myRollNumber = 68;
var maxTime = 3;
var iterSpeak = 0;
var coolDown = 40; // 40 mins

// Routes
app.get('/', function (req, res) {
    res.send('Hello World!');
});

function justNumbers(string) {
    var numsStr = string.replace(/[^0-9]/g, '');
    return parseInt(numsStr);
}

// function lastNNumbersWereSorted() {

// }

app.post('/listen', function (req, res) {
    console.log(input);
    var input = req.body[0];

    // preprocess input
    prevInputs.push(input)
    const oldString = input.split(' ')
    input = stopword.removeStopwords(oldString, ['present', "ma'am", 'madam']);
    input = input.join()


    // Are roll calls being called?
    // var rollCalling = lastNNumbersWereSorted(prevInputs)

    // is my roll number called
    console.log(input);
    // var detectedNumber = wordsToNumbers.wordsToNumbers(input, { fuzzy: true });
    var detectedNumber = justNumbers(input);
    console.log(`Detected Number:` + detectedNumber)


    // answer my attendence
    if (detectedNumber == myRollNumber) {
        fetch('http://localhost:5000/answer-attendance', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(response => response.json()).then(data => {
            console.log('Success:', data);
        }).catch((error) => {
            console.error('Error:', error);
        });
    }

    // Send stuff to dialog flow
    // var text = im.getResponse(input).then(text => {
    //     fetch('http://localhost:5000/speak', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({ text }),
    //     }).then(response => response.json()).then(data => {
    //         console.log('Success:', data);
    //     }).catch((error) => {
    //         console.error('Error:', error);
    //     });

    res.send({ "msg": "Success" });
});

// Listen
var port = process.env.PORT || 6969;
app.listen(port);

console.log('Listening on localhost:' + port);