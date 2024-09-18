const { Op } = require('sequelize');
const Student = require('../models/student');
const Location = require('../models/location');
const Picture = require('../models/picture');

/**
 * Get a list of students, optionally limited by a number of results.
 * @param {number} [limit] - Number of students to retrieve.
 * @returns {Promise<Array<Student>>} - A promise that resolves to an array of students.
 */
const getStudents = async (limit = 1) => {
    return await Student.findAll({
        include: [
            { model: Location, as: 'location' },
            { model: Picture, as: 'picture' }
        ],
        limit: limit,
        order: [['id', 'ASC']],
    });
};

/**
 * Get a student by ID.
 * @param {number} id - The ID of the student to retrieve.
 * @returns {Promise<Student|null>} - A promise that resolves to the student or null if not found.
 */
const getStudentById = async (id) => {
    return await Student.findByPk(id, {
        include: [
            { model: Location, as: 'location' },
            { model: Picture, as: 'picture' }
        ],
    });
};

/**
 * Create a new student.
 * @param {Object} studentData - The data to create the student with.
 * @returns {Promise<Student>} - A promise that resolves to the newly created student.
 */
const createStudent = async (studentData) => {
    return await Student.create(studentData, {
        include: [
            { model: Location, as: 'location' },
            { model: Picture, as: 'picture' }
        ],
    });
};

/**
 * Update an existing student by ID.
 * @param {number} id - The ID of the student to update.
 * @param {Object} studentData - The data to update the student with.
 * @returns {Promise<Student|null>} - A promise that resolves to the updated student or null if not found.
 */
const updateStudent = async (id, studentData) => {
    const student = await Student.findByPk(id, {
        include: [
            { model: Location, as: 'location' },
            { model: Picture, as: 'picture' }
        ],
    });
    if (!student) {
        return null;
    }

    studentData.registered = Date.parse(student.registered);
    studentData.location.student_id = student.location.student_id;
    studentData.picture.student_id = student.picture.student_id;

    await student.update(studentData);
    await student.location.update(studentData.location);
    await student.picture.update(studentData.picture);

    return student;
};

/**
 * Partially update an existing student by ID.
 * @param {number} id - The ID of the student to partially update.
 * @param {Object} studentData - The data to partially update the student with.
 * @returns {Promise<Student|null>} - A promise that resolves to the updated student or null if not found.
 */
const partiallyUpdateStudent = async (id, studentData) => {
    const student = await Student.findByPk(id, {
        include: [
            { model: Location, as: 'location' },
            { model: Picture, as: 'picture' }
        ],
    });
    if (!student) {
        return null;
    }

    student.gender = studentData.gender ?? student.gender;
    student.title = studentData.title ?? student.title;
    student.first_name = studentData.first_name ?? student.first_name;
    student.last_name = studentData.last_name ?? student.last_name;
    student.email = studentData.email ?? student.email;
    student.dob = studentData.dob ?? student.dob;
    student.phone = studentData.phone ?? student.phone;
    student.id_name = studentData.id_name ?? student.id_name;
    student.id_value = studentData.id_value ?? student.id_value;
    student.nat = studentData.nat ?? student.nat;

    if (studentData.location) {
        student.location.street_number = studentData.location.street_number ?? student.location.street_number;
        student.location.street_name = studentData.location.street_name ?? student.location.street_name;
        student.location.city = studentData.location.city ?? student.location.city;
        student.location.state = studentData.location.state ?? student.location.state;
        student.location.country = studentData.location.country ?? student.location.country;
        student.location.postcode = studentData.location.postcode ?? student.location.postcode;
        student.location.timezone = studentData.location.timezone ?? student.location.timezone;
    }

    if (studentData.picture) {
        student.picture.large = studentData.picture.large ?? student.picture.large;
        student.picture.medium = studentData.picture.medium ?? student.picture.medium;
        student.picture.thumbnail = studentData.picture.thumbnail ?? student.picture.thumbnail;
    }

    await student.save();
    await student.location.save();
    await student.picture.save();

    return student;
};

/**
 * Delete a student.
 * @param {object} student - The student to delete.
 * @returns {Promise<boolean>} - A promise that resolves to true if the student was deleted, false otherwise.
 */
const deleteStudent = async (student) => {
    await student.location.destroy();
    await student.picture.destroy();
    const deleted = await student.destroy();
    return deleted !== null;
};

module.exports = {
    getStudents,
    getStudentById,
    createStudent,
    updateStudent,
    partiallyUpdateStudent,
    deleteStudent,
};
