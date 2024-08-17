const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Import your Sequelize instance
const Location = require('./location');
const Picture = require('./picture');

const Student = sequelize.define('Student', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    gender: {
        type: DataTypes.STRING(10),
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    first_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    last_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            isEmail: true,
        },
    },
    dob: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    registered: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    phone: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    id_name: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    id_value: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    nat: {
        type: DataTypes.STRING(10),
        allowNull: false,
    },
}, {
    tableName: 'students', // Define the table name if it's different from the model name
    timestamps: false, // Disable automatic timestamps if not needed
});

Student.hasOne(Location, { foreignKey: 'student_id', as: 'location', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Student.hasOne(Picture, { foreignKey: 'student_id', as: 'picture', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

module.exports = Student;
