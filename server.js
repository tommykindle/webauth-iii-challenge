const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const loginRouter = require('./users/login-router');
const usersRouter = require('./users/user-router');
const registerRouter = require('./users/register-router')

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api/login', loginRouter);
server.use('/api/users', usersRouter);
server.use('/api/register', registerRouter)



module.exports = server;