const jwt = require('jsonwebtoken');
const jwtConfig = require("../configs/jwtConfig");

function signJwtToken(newUser) {
    return new Promise((resolve, reject) => {
        const tokenPayload = {
            Id: newUser.id,
            Name: newUser.name,
            Surname: newUser.surname,
            Email: newUser.email,
            IsAdmin: newUser.isAdmin
        };
        
        jwt.sign(tokenPayload, jwtConfig.secret, { expiresIn: jwtConfig.exp }, (err, token) => {
            if (err) {
                reject(err);
            } else {
                resolve(token);
            }
        });
    });
}

module.exports={signJwtToken};