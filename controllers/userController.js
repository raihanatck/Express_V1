const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const user = require("../models/user");
const { default: mongoose } = require("mongoose");
const express = require("express");
const SECRET_KEY = "NOTESAPI";

function StatusCode() {
    return {
        success : 200,
        serverrr : 500,
        validation : 404
    };
}

const signup = async (req, res) => {

    const { username, email, password } = req.body;
    const Status = StatusCode();
    try {

        // Validation message
        // if (!username || !email || !password) {
        //     res.status(400).json({ Message: username, email, password, "Field is required" });
        // }
        if (!username) {
            res.status(Status.validation).json({ Message: "Username is required" });
        }else if (!email) {
            res.status(Status.validation).json({Message: "Email is required"});
        }else if(!password){
            res.status(Status.validation).json({Message:"Password is required"});
        }

        // Existing user check
        const existingUser = await userModel.findOne({ email: email })
        if (existingUser) {
            return res.status(Status.validation).json({ Message: "User already exist" });
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
        res.status(Status.success).json({ user: result, token: token });

    } catch (error) {
        console.log(error);
        res.status(Status.serverrr).json({ Message: "Something went wrong" });

    }
};

const signin = async (req, res) => {
    const { email, password } = req.body;
    const Status = StatusCode();
    try {
        // Check user is existing 
        const existingUser = await userModel.findOne({ email: email });
        if (!existingUser) {
            res.status(Status.validation).json({ Message: "User not found" });
        }

        // Compare password with DB
        const MatchPassword = existingUser.password;

        if (!MatchPassword) {
            res.status(Status.validation).json({ Message: "Invalid Credentials" });
        }

        // Geneerate token
        const token = jwt.sign({ email: existingUser.email, id: existingUser.id }, SECRET_KEY);
        // Send response
        res.status(Status.success).json({ user: existingUser, token: token });



    } catch (error) {
        console.log(error);
        res.status(Status.serverrr).json({ Message: "Something went wrong" });
    }
};

const userlist = async (req, res) => {
    const Status = StatusCode();
    try {
        // console.log('Searching for users with email:', req.email);
        // Get users list
        const users = await userModel.find();
        // Send user list data
        res.status(Status.success).json({ users });
    } catch (error) {
        console.log(error);
        res.status(Status.serverrr).json({ Message: "Something went wrong" });
    }
}

module.exports = { signup, signin, userlist };