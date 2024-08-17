const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Picture = sequelize.define('Picture', {
    student_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'students',
            key: 'id'
        }
    },
    large: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    medium: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    thumbnail: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
}, {
    tableName: 'pictures',
    timestamps: false,
});

module.exports = Picture;
