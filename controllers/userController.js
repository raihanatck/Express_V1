const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const user = require("../models/user");
const mongoose = require('mongoose');
const express = require("express");
const SECRET_KEY = "CONTACTAPI";

function StatusCode() {
    return {
        success: 200,
        serverrr: 500,
        validation: 404
    };
}

const signup = async (req, res) => {

    const { username, email, password } = req.body;
    const Status = StatusCode();
    try {

        // Validation message
        if (!username || username.trim() === "") {
            return res.status(Status.validation).json({ Message: "Username is required" });
        }

        emailpattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!email.match(emailpattern)) {
            return res.status(404).json({ Message: "Please enter valid email" });
        }
        const trimmedpassword = password.trim();
        if (!password || trimmedpassword == '') {
            return res.status(Status.validation).json({ Message: "Password is required" });
        }
        if (trimmedpassword.length < 8 || trimmedpassword.length > 17) {
            return res.status(Status.validation).json({ Message: "Password must be 8 to 16 characters" })
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
        // result.token = token;
        // result.save();

        // Send response
        return res.status(Status.success).json({ user: result, token: token });

    } catch (error) {
        console.log(error);
        return res.status(Status.serverrr).json({ Message: "Something went wrong" });

    }
};

const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, SECRET_KEY);  // This checks the expiration date as well
        return decoded;
    } catch (err) {
        return null;  // Token is invalid or expired
    }
};

const signin = async (req, res) => {
    const { email, password } = req.body;
    const Status = StatusCode();
    try {
        // Check user is existing 
        const existingUser = await userModel.findOne({ email: email });
        if (!existingUser) {
            return res.status(Status.validation).json({ Message: "User not found" });
        }

        emailpattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!email.match(emailpattern)) {
            return res.status(404).json({ Message: "Please enter valid email" });
        }
        // Compare password with DB
        if (existingUser.password !== password) {
            return res.status(Status.validation).json({ Message: "You have entered invalid password" })
        }

        // if above method is not work
        // if (String(existingUser.password).trim() !== String(password).trim()) {
        //     return res.status(Status.validation).json({ Message: "You have entered an invalid password" });
        // }

        // Geneerate token
        const token = jwt.sign({ email: existingUser.email, id: existingUser.id }, SECRET_KEY, { expiresIn: '1d' });
        const decoded = verifyToken(token);
        if (!decoded) {
            return res.status(401).json({ Message: "Session expired or invalid token. Please login again." });
        }
        // Send response
        return res.status(Status.success).json({ user: existingUser, token: token });


    } catch (error) {
        console.log(error);
        return res.status(Status.serverrr).json({ Message: "Something went wrong" });
    }
};

// const userlist = async (req, res) => {
//     const Status = StatusCode();
//     try {
//         // Get users list
//         const users = await userModel.find({}, 'username email password');
//         // console.log(users);
//         // Send user list data
//         return res.status(Status.success).json({ users });
//     } catch (error) {
//         console.log(error);
//         return res.status(Status.serverrr).json({ Message: "Something went wrong" });
//     }
// }

module.exports = { signup, signin };