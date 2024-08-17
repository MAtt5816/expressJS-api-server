const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Location = sequelize.define('Location', {
    student_id: {
        type: DataTypes.INTEGER,
        autoIncrement: false,
        primaryKey: true,
    },
    street_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    street_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    city: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    state: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    country: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    postcode: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    timezone: {
        type: DataTypes.STRING(10),
        allowNull: false,
    },
}, {
    tableName: 'locations',
    timestamps: false,
});

module.exports = Location;
