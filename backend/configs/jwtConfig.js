const jwt = {
    secret: process.env.JWT_SECRET,
    exp: process.env.JWT_EXP
}

module.exports = jwt;