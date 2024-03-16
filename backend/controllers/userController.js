const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../models');
const User = db.users;
const jwtConfig = require("../configs/jwtConfig");

const registerUser = (req, res) => {
  const { name, surname, email, password } = req.body;

  if (!name || !surname || !email || !password) {
    return res.status(400).json({ message: 'Please fill all fields' });
  }

  User.findOne({ where: { email } })
    .then(user => {
      if (user) {
        return res.status(400).json({ message: 'User already exists' });
      }
      bcrypt.hash(password, 10)
        .then(hashedPassword => {
          // Create a new user in the database
          return User.create({ name, surname, email, password: hashedPassword });
        })
        .then((newUser) => {
          // Generate JWT token
          const token = jwt.sign({
            Id: newUser.id,
            Name: newUser.name,
            Surname: newUser.surname,
            Email: newUser.email,
            IsAdmin: newUser.isAdmin
          }, jwtConfig.secret, { expiresIn: jwtConfig.exp });
          // Return the newly created user
          res.status(201).json({ newUser, token });
        })
        .catch(error => {
          console.error('Error registering user:', error);
          res.status(500).json({ message: 'Internal server error' });
        });

    })
};



const loginUser = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ where: { email } })
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Compare passwords
      bcrypt.compare(password, user.password)
        .then(isPasswordValid => {
          if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
          }

          // Generate JWT token
          const token = jwt.sign({
            Id: user.id,
            Name: user.name,
            Surname: user.surname,
            Email: user.email,
            IsAdmin: user.isAdmin
          }, jwtConfig.secret, { expiresIn: jwtConfig.exp });

          // Send token to client
          res.status(200).json({ token });
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