const router = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const Users = require('./users-model')
const secrets = require('../config/secrets')

router.post('/', (req, res) => {
  let { username, password } = req.body

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({ token });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' })
      }
    })
    .catch(error => {
      res.status(500).json(error)
    });
});

function generateToken(user) {
  const payload = {
    username: user.username,
  };
  const options = {
    expiresIn: '1d',
  };

  return jwt.sign(payload, secrets.jwtSecret, options);
}

module.exports = router;