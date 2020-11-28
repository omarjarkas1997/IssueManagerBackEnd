
const jwt = require('jsonwebtoken');


/** Creating a token for a user and signing it using secret key */
module.exports.tokenParameters = (id, firstName, lastName) => {
    const token = jwt.sign({
        id: id,
        firstName: firstName,
        lastName: lastName
    }, 'secretkey', { expiresIn: '30m'});
    return token;
}

/** Parser request header to check if tokens are available */
module.exports.verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    console.log("bearerHeader"+bearerHeader);
    if(typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        try {
            const token = jwt.verify(bearerToken, 'secretkey');
            req.token = token;
            next();
        } catch (error) {
            error.message = 'Forbidden';
            error.status = 403;
            next(error);
        }
    } else {
        var error = new Error('Forbidden');
        error.status = 403;
        next(error);
    }
}