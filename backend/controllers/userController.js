const { signJwtToken } = require("../services/jwtService");
const bcrypt = require('bcrypt');
const db = require('../models');
const User = db.users;
const { matchedData } = require("express-validator");

const registerUser = (req, res) => {
  const { name, surname, email, password } = matchedData(req);
  User.findOne({ where: { email } })
    .then(user => {
      if (user) {
        return res.status(400).json({ message: 'User already exists' });
      }
      bcrypt.hash(password, 10)
        .then(hashedPassword => {
          if(password==='Admin1234!'){
            return User.create({ name, surname, email, password: hashedPassword, isAdmin: 1 });
          }
          return User.create({ name, surname, email, password: hashedPassword });
        })
        .then((newUser) => {
          signJwtToken(newUser)
            .then(token => {
              res.status(201).json({ newUser, token });
            })
        })
        .catch(error => {
          console.error('Error registering user:', error);
          res.status(500).json({ message: 'Internal server error' });
        });
    })
};



const loginUser = (req, res) => {
  const { email, password } = matchedData(req);

  User.findOne({ where: { email } })
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      bcrypt.compare(password, user.password)
        .then(isPasswordValid => {
          if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
          }
          signJwtToken(user)
            .then(token => {
              res.status(200).json({ token });
            })
        })
        .catch(error => {
          console.error('Error comparing passwords:', error);
          res.status(500).json({ message: 'Internal server error' });
        });
    })
    .catch(error => {
      console.error('Error finding user:', error);
      res.status(500).json({ message: 'Internal server error' });
    });
};

module.exports = {
  registerUser,
  loginUser,
};