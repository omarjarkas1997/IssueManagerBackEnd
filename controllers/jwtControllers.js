
const jwt = require('jsonwebtoken');


/** Creating a token for a user and signing it using secret key */
generateJwtToken = (id, firstName, lastName) => {
    const token = jwt.sign({
        id: id,
        firstName: firstName,
        lastName: lastName
    }, 'secretkey', { expiresIn: '30m'});
    return token;
}

/** Parser request header to check if tokens are available */
verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
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

parseJwt = (token, next) => {
    try {
        var base64Payload = token.split('.')[1];
        var payload = Buffer.from(base64Payload, 'base64');
        return JSON.parse(payload.toString());  
    } catch (error) {
        error = new Error("JWT not Found!");
        error.status = 401;
        next(error);
    }
  }

module.exports = {
    parseJwt,
    verifyToken,
    generateJwtToken
}