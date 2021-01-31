const express = require('express');
const router = express.Router();
const { getUsers, singleUser, signUp, signIn } = require('../controllers/user.js');
router.get('/users', getUsers);
router.get('/user/:id', singleUser);
router.post('/register', signUp);
router.post('/login', signIn);
module.exports = router;    