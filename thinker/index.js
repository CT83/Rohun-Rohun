var express = require('express');
const bodyParser = require("body-parser");
var cors = require('cors');
const router = express.Router();
var app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());


// Routes
app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.post('/listen', function (req, res) {
    console.log(req.body);
    res.send({"msg": "Hello"});
});

// Listen
var port = process.env.PORT || 6969;
app.listen(port);

console.log('Listening on localhost:' + port);