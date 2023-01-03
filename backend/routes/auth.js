const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../user');

app.post('/api/login',(req, res) => {
  let foundUser;

    User.findOne({ email: req.body.email }).then(user => {

      if(!user)
      {
        return res.status(401).json({message: 'User not found', email: req.body.email});
      }
      foundUser = user;

      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if(!result)
      {
        return res.status(401).json({message: 'Authentication failed'});
      }
      //Successful authentication
      const token = jwt.sign({email: foundUser.email, userId: foundUser._id },'my secret-key',{expiresIn: '1H'});
      res.status(200).json({
        token: token,
        expiresIn: 3600
      });
    })
    .catch(err => {
      console.log(err);
      return res.status(401).json({message: 'Authentication failed'});
    })
});

module.exports = app;
