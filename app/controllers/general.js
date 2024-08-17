const jwtAuth = require('../middleware/jwt-auth')
const userService = require('../services/users');

exports.hello = async (req, res) => {
    res.status(200).send("Hello World!");
}

exports.authorize = async (req, res) => {
    const { username, passphrase } = req.body;

    let isCorrectPassword = await userService.checkPassword(username, passphrase);

    if (isCorrectPassword) {
        const token = jwtAuth.signJWT(username, '3h');
        res.status(200).send(token);
    } else {
        res.sendStatus(401);
    }
}
