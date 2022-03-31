
const validator = require("../utils/studentsValidator");
const Students = require("../models/studentsModels");
//get all students
const getAllStudents = (req, res) => {

    res.set("Acceess-Control-Allow-Origin", "*");
    Students.fetchAllStudents((obj) => {
        res.render("students.ejs",
        {std: obj});        
    })
}

// get specific student
const getStudent = (req, res) => {

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
}

//create student
const createStudent = (req, res) => {
    let valid = validator(req.body);
    if(valid) {
        let std = new Students(req.body);
        std.saveStudent();
        res.json(req.body);
    } 
    else {
        res.status(403).send("Forbidden input");
    }
}

//delete student
const deleteStudent = (req, res) => {
    let idx = students.findIndex((val) => { return val.id == req.params.id });
    if(idx != -1) {
        let deletedStd = students.splice(idx, 1)
        res.send("Deleted")
    }
    else {
        res.send("student not found")
    }
}
//update student
const updateStudent =  (req, res) => {
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
}

module.exports = {
    getAllStudents,
    getStudent,
    createStudent,
    deleteStudent,
    updateStudent
}