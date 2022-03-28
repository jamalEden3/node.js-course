const express = require('express');
const router = express.Router();

const validator = require("../utils/studentsValidator");



const studentsController = require("../controllers/studentsControllers");

// parameter middleware
router.param("id", (req, res, nxt, val) => {
    if(Number(val)) {
        req.id = val;
        nxt();
    }
    else {
        res.send("invalid")
    }
});


router.get("/", (req, res, nxt) => {
    console.log("Recieved from somewhere!!!");
    nxt();
});

router.get('/', studentsController.getAllStudents);

router.get('/:id', studentsController.getStudent);

router.post("/", studentsController.createStudent);

// delete student
router.delete("/:id", studentsController.deleteStudent);
// update student
router.put("/:id", studentsController.updateStudent);

module.exports = router;