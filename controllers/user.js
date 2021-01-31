const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys').secretOrKey;

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find()
        // .then((response) => {

        //     console.log(response);
        //     return res.json(response);
        // })
        // .catch((error) => console.log(error.message));

        return res.json(users);
    } catch (error) {
        console.log(error.message);
        return res.json({ message: error.message });
    }
}
exports.singleUser = async (req, res) => {
    try {
        const id = req.params.id;

        const user = await User.findById(id);
        return res.json(user);
    } catch (error) {
        console.log(error.message);
        return res.json({ message: error.message });
    }
}
exports.signIn = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) return res.status(404).json({ result: "Invalid Email" });
        //const hashedPassword = bcrypt.hash(password, 12);
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) return res.status(400).json({ result: "Invalid Credentials" });
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, keys, { expiresIn: '12h' });
        return res.status(201).json({
            _id: existingUser.id,
            name: existingUser.name,
            email: existingUser.email,
            isAdmin: existingUser.isAdmin,
            token
        });
    } catch (error) {
        console.log(error.message);
        return res.statue(500).json({ message: ' Something went Wrong.!' })

    }

}
exports.signUp = async (req, res) => {
    const { email, password, confirmPassword, name } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "Email Already Exist in Database. !" });
        if (password !== confirmPassword) return res.status(400).json({ message: "Password does not Match!" });
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = await User.create({ email, password: hashedPassword, name });

        const token = jwt.sign({ email: newUser.email, id: newUser._id }, keys, { expiresIn: '12h' });
        return res.status(201).json({
            _id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
            token
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: ' Something went Wrong.!' })

    }
}