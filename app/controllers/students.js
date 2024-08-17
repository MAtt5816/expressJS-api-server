const sequelize = require('../config/database');
const studentService = require('../services/students');

exports.getStudent = async (req, res) => {
    const { results = 1 } = req.query;
    const n = parseInt(results, 10);

    let students = await studentService.getStudents(n);

    res.status(200).json(students);
}

exports.postStudent = async (req, res) => {
    const newStudents = req.body;

    let students = []

    const transact = await sequelize.transaction();

    try {
        for (const student of newStudents) {
            let stud = structuredClone(student);
            stud.registered = Date.now();

            let result = await studentService.createStudent(stud);

            if (result !== null)
                students.push(stud);
            else
                throw new Error("Student not added to database");
        }

        await transact.commit();
        res.status(201).json(students);
    }
    catch (e) {
        await transact.rollback()
        res.sendStatus(400);
    }
}

exports.putStudent = async (req, res) => {
    const { studentId } = req.params;
    const updatedStudent = req.body;

    let transact = await sequelize.transaction();

    try {
        let student = await studentService.updateStudent(studentId, updatedStudent);
        if (student === null) {
            await transact.rollback();
            return res.sendStatus(404);
        }
        else {
            await transact.commit();
            return res.status(200).json(student);
        }
    }
    catch (e) {
        await transact.rollback();
        return res.sendStatus(404);
    }
}

exports.patchStudent = async (req, res) => {
    const { studentId } = req.params;
    const updatedStudent = req.body;

    let transact = await sequelize.transaction();

    try {
        let student = await studentService.partiallyUpdateStudent(studentId, updatedStudent);
        if (student === null) {
            await transact.rollback();
            return res.sendStatus(404);
        }
        else {
            await transact.commit();
            return res.status(200).json(student);
        }
    }
    catch (e) {
        await transact.rollback();
        return res.sendStatus(404);
    }
}

exports.deleteStudent = async (req, res) => {
    const { studentId } = req.params;

    try {
        let student = await studentService.getStudentById(studentId);
        if (student !== null) {
            let transact = await sequelize.transaction();
            if (!(await studentService.deleteStudent(student))) {
                await transact.rollback();
                throw new Error("Nothing deleted");
            }
            await transact.commit();
        }
        else {
            return res.sendStatus(404);
        }
    }
    catch (e) {
        return res.sendStatus(404);
    }

    return res.sendStatus(204);
}