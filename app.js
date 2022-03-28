const express = require("express");
const path = require("path");
const Ajv = require("ajv");
const app = express();
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const ejs = require("ejs");

const logging = require("./middlewares/logging");
const studentsRouter = require('./routes/students');

const port = process.env.PORT||5000;


// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/assets", express.static("public"));

app.use("/api/students",studentsRouter)
//3rd party middleware
app.use(helmet());

app.use(cookieParser());
// custom middleware
app.use(logging);


app.get('/', (req, res) => {
    
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get('/welcome.html', (req, res) => {
    
    res.sendFile(path.join(__dirname, "/welcome.html"));
});


// set template engine ejs
app.set("template engine", "ejs");

app.post("/welcome.html", (req, res) => {
    res.cookie("username", Buffer.from(req.body.name).toString('base64'));
    res.cookie("userhobby", req.body.hoppy);
    console.log(req.body);
    res.send(`Thanks alot ${req.body.name}`)
});

app.get("/abc", (req, res) => {
    console.log(Buffer.from(req.cookies.username, 'base64').toString());
    console.log(req.cookies.userhobby);

    res.sendStatus(200);
})



app.listen(port, () => {console.log(`Listen to ${port} ...`)});