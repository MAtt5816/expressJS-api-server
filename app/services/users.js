const { Op } = require("sequelize")
const { createHash } = require('crypto');
const User = require('../models/user');

const checkPassword = async (username, password) => {
    let user = await User.findOne({
        where: {
            username: username
        }
    });

    let pass = password + user?.salt;
    let hash = createHash('sha256').update(pass).digest('hex');

    return hash === user?.sha256;
}

module.exports = {
    checkPassword
};