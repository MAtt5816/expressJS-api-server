const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    salt: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    sha256: {
        type: DataTypes.STRING(64),
        allowNull: false,
    }
});

module.exports = User;