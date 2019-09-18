const router = require('express').Router()
const bcrypt = require('bcrypt')

router.post('/', (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 16)
  user.password = hash;

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
})


module.exports = router;