const jwtAuth = require('../middleware/jwt-auth')

exports.hello = async (req, res) => {
    res.status(200).send("Hello World!");
}

exports.authorize = async (req, res) => {
    const { username, passphrase } = req.body;

    // In a real application, you would validate the user credentials here.
    if (username && passphrase) {
        const token = jwtAuth.signJWT(username, '3h');
        res.status(200).send(token);
    } else {
        res.sendStatus(401);
    }
}
