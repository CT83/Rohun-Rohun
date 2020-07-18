import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from 'dotenv'
dotenv.config()

// var express = require('express');
// const bodyParser = require("body-parser");
// var cors = require('cors');
// require('dotenv').config()
var app = express();
import { IntentManager } from "./IntentManager.mjs";
// require("./IntentManager.js")
// import './IntentManager.js'

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
    im.getResponse(input);
    res.send({ "msg": "Success" });
});

// Listen
var port = process.env.PORT || 6969;
app.listen(port);

console.log('Listening on localhost:' + port);