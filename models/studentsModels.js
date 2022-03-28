const fs = require('fs');
const path = require("path");
const studentPath = path.join(path.dirname(process.mainModule.filename), "data", "students.json")

module.exports = class Student {
    constructor({name, dept}) {
        this.name = name;
        this.dept = dept;
    }

    saveStudent() {
        fs.readFile(studentPath, (err, info) => {
            let Students = [];

            if(!err) {
                Students = JSON.parse(info);
                this.id = Students.length +1;
                Students.push(this);
            }

            fs.writeFile(studentPath, JSON.stringify(Students), (err) => {console.log("error")})
            
        });
    }

    static fetchAllStudents() {
        return students;
    }


}