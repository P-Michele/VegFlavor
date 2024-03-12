const jwt = {
    secret: process.env.JWT_Secret,
    exp: process.env.JWT_Exp
}

module.exports = jwt;