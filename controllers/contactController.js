const express = require("express");
const ContactUsModel = require("../models/contact");
const { default: mongoose } = require("mongoose");
const contact = require("../models/contact");


const CreateContact =  ((req,res)=>{
    console.log(req.userId);
    const userId = req.userId;
    const {title, comapnyname, contractyear, managername, number, email, description} = req.body;
    try {
        if(!title.trim()){
            return res.status(404).json({Message:"Title is required"});
        }
        
        if(!comapnyname.trim()){
            return res.status(404).json({Message:"Title is required"});
        }
        
        const contractyearpattern = /^\d{4}\/\d{2}\/\d{2}$/;
        if (!contractyear.match(contractyearpattern)) {
            return res.status(404).json({ Message: "Contract year must be in the format year/month.day, e.g., 2024/11.21." });
        }

        if(!managername.trim()){
            return res.status(404).json({Message:"Title is required"});
        }

        if (!/^\d{10}$/.test(number)) {
            return res.status(404).json({Message:"Please enter a valid 10 digits number"});
        }
        
        emailpattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(!email.match(emailpattern)){
            return res.status(404).json({Message:"Please enter valid email"});
        }
        
        if(!description.trim()){
            return res.status(404).json({Message:"Title is required"});
        }

        const NewContact = new ContactUsModel({
            title,  
            comapnyname,
            contractyear,
            managername,
            number,
            email,
            description,
            userId
        });
        NewContact.save();
        return res.status(201).json({contact : NewContact,Message: "Form submitted successfully."});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ Message: "Something went wrong" });
    }
})
const EditContact =  ((req,res)=>{

})
const DeleteContact =  ((req,res)=>{

})
const GetContact =  ((req,res)=>{

})

module.exports = {CreateContact, EditContact, DeleteContact, GetContact};