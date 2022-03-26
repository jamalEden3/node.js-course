const express = require("express");
const path = require("path");
const Ajv = require("ajv");
const app = express();
const port = process.env.PORT||5000;

/* const schema = {
    "type": "object",
    "properties": {
        "name": {
            "type": "string",
            "pattern": "^[A-Z][a-z]*$"
        },
        "desk":{
            "type": "string",
            "enum": ["SD", "SA", "MD"],
            "maxLength": 2,
            "minLength": 2
        },
        "required":true
    }
} */

/* const ajv = new Ajv();
let validator = ajv.compile(schema); */
app.use(express.json());
app.use(express.urlencoded({extended: true}));

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
app.get('/api/students', (req, res) => {
    res.json(students);
});

app.get('/api/students/:id', (req, res) => {

    let id = req.params.id;
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
    req.body.id = students.length +1;
    students.push(req.body);

    res.json(req.body.name);
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
    console.log(req.body);
    res.send(`Thanks alot ${req.body.name}`)
});



app.listen(port, () => {console.log(`Listen to ${port} ...`)});