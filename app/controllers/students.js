// TODO: Sample in-memory student data
let students = [
    {
        id: 1,
        gender: 'female',
        title: 'Miss',
        first_name: 'Terri',
        last_name: 'Lucas',
        email: 'terri.lucas@example.com',
        dob: '1964-11-23',
        registered: '2014-07-23T03:21:42.259Z',
        phone: '03-2662-3559',
        id_name: 'TFN',
        id_value: '230000682',
        nat: 'AU',
        location: {
            street_number: 2595,
            street_name: 'Main Street',
            city: 'Tamworth',
            state: 'Queensland',
            country: 'Australia',
            postcode: '6066',
            timezone: '+5:30'
        },
        picture: {
            large: 'https://randomuser.me/api/portraits/men/75.jpg',
            medium: 'https://randomuser.me/api/portraits/med/men/75.jpg',
            thumbnail: 'https://randomuser.me/api/portraits/thumb/men/75.jpg'
        }
    }
];

exports.getStudent = async (req, res) => {
    const { results = 1 } = req.query;
    const n = parseInt(results, 10);

    res.status(200).json(students.slice(0, n));
}

exports.postStudent = async (req, res) => {
    const newStudents = req.body;

    newStudents.forEach((student, index) => {
        student.id = students.length + index + 1;
        students.push(student);
    });

    res.status(201).json(newStudents);
}

exports.putStudent = async (req, res) => {
    const { studentId } = req.params;
    const updatedStudent = req.body;

    const studentIndex = students.findIndex(student => student.id === parseInt(studentId, 10));

    if (studentIndex === -1) {
        return res.sendStatus(404);
    }

    students[studentIndex] = { ...students[studentIndex], ...updatedStudent };
    res.status(200).json(students[studentIndex]);
}

exports.patchStudent = async (req, res) => {
    const { studentId } = req.params;
    const updatedFields = req.body;

    const studentIndex = students.findIndex(student => student.id === parseInt(studentId, 10));

    if (studentIndex === -1) {
        return res.sendStatus(404);
    }

    students[studentIndex] = { ...students[studentIndex], ...updatedFields };
    res.status(200).json(students[studentIndex]);
}

exports.deleteStudent = async (req, res) => {
    const { studentId } = req.params;

    const studentIndex = students.findIndex(student => student.id === parseInt(studentId, 10));

    if (studentIndex === -1) {
        return res.sendStatus(404);
    }

    students.splice(studentIndex, 1);
    res.sendStatus(204);
}