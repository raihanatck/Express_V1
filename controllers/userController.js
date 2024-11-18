const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const user = require("../models/user");
const { default: mongoose } = require("mongoose");
const e = require("express");
const SECRET_KEY = "NOTESAPI";

const signup = async (req, res) => {

    const { username, email, password } = req.body; 
    try {

        // Validation message
        if (!username || !email || !password) {
            res.status(400).json({ Message: "Field is required" });
        }

        // Existing user check
        const existingUser = await userModel.findOne({ email: email })
        if (existingUser) {
            return res.status(400).json({ Message: "User already exist" });
        }


        // Hashed password
        // const hashedPassword = await bcrypt.hash(password, 10);

        // User creation
        const result = await userModel.create({
            email: email,
            password: password,
            username: username
        });

        // Token generate
        const token = jwt.sign({ email: result.email, id: result.id }, SECRET_KEY);
        // console.log("Signup token: ",token);

        // Send response
        res.status(201).json({ user: result, token: token });

    } catch (error) {
        console.log(error);
        res.status(500).json({ Message: "Something went wrong" });

    }
};

const signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Check user is existing 
        const existingUser = await userModel.findOne({ email: email });
        if (!existingUser) {
            res.status(404).json({ Message: "User not found" });
        }

        // Compare password with DB
        const MatchPassword = existingUser.password;

        if (!MatchPassword) {
            res.status(404).json({ Message: "Invalid Credentials" });
        }

        // Geneerate token
        const token = jwt.sign({ email: existingUser.email, id: existingUser.id }, SECRET_KEY);
        // Send response
        res.status(200).json({ user: existingUser, token : token});



    } catch (error) {
        console.log(error);
        res.status(500).json({ Message: "Something went wrong" });
    }
};

module.exports = { signup, signin };