const express = require("express");
const path = require("path");
const Ajv = require("ajv");
const app = express();
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const ejs = require("ejs");

const port = process.env.PORT||5000;

const schema = {
    "type": "object",
    "properties": {
        "name": {
            "type": "string",
            "pattern": "^[A-Z][a-z]*$"
        },
        "desk":{
            "type": "string",
            "maxLength": 2,
            "minLength": 2
        },
        "required":true
    }
}

const ajv = new Ajv();
let validator = ajv.compile(schema);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/assets", express.static("public"));

//3rd party middleware
app.use(helmet());

app.use(cookieParser());
// custom middleware
app.use((req, res, nxt) => {
    console.log("logging");

    nxt();
});

// parameter middleware
app.param("id", (req, res, nxt, val) => {
    if(Number(val)) {
        req.id = val;
        nxt();
    }
    else {
        res.send("invalid")
    }
    
});

const students = [
    {name: 'jam', id: 2, desk: 'SD'},
    {name: 'bam', id: 3, desk: 'SA'},
    {name: 'aam', id: 4, desk: 'MD'},
    {name: 'dam', id: 5, desk: 'SA'},
    {name: 'sam', id: 6, desk: 'SA'},
];




app.get('/', (req, res) => {
    
    res.sendFile(path.join(__dirname, "index.html"));
});
app.get('/welcome.html', (req, res) => {
    
    res.sendFile(path.join(__dirname, "/welcome.html"));
});
app.get("/api/students", (req, res, nxt) => {
    console.log("Recieved from somewhere!!!");
    nxt();
});

// set template engine ejs
app.set("template engine", "ejs");

app.get('/api/students', (req, res) => {
    res.set("Acceess-Control-Allow-Origin", "*");
    res.render("students.ejs", {std: students});
});

app.get('/api/students/:id', (req, res) => {

    /* let id = req.params.id; */
    let id = req.id;
    console.log(id);

    const std = students.find((value, idx, arr) => {
         return value.id == id 
        });
        if (std) {
            res.json(std);
        }
        else
        res.send("NotFound!")
});

app.post("/api/students", (req, res) => {
    let valid = validator(req.body);
    if(valid) {
        req.body.id = students.length +1;
        students.push(req.body);
        res.json(req.body);
    } 
    else {
        res.status(403).send("Forbidden input");
    }
});

// update student

app.delete("/api/students/:id", (req, res) => {
    let idx = students.findIndex((val) => { return val.id == req.params.id });
    if(idx != -1) {
        let deletedStd = students.splice(idx, 1)
        res.send("Deleted")
    }
    else {
        res.send("student not found")
    }
});
app.put("/api/students/:id", (req, res) => {
    let idx = students.findIndex((val) => {return val.id == req.params.id});
    if(idx != -1) {
        for(i in req.body) {
            students[idx][i] = req.body[i];
        }
        res.json(students[idx])
    }
    else {
        res.send("not allowed")
    }
})

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