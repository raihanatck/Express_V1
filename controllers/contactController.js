const express = require("express");
const ContactUsModel = require("../models/contact");
const { default: mongoose } = require("mongoose");
const contact = require("../models/contact");


const CreateContact = async (req,res) => {
    const userId = req.userId;
    console.log(userId);
    const {title, companyname, contractyear, managername, number, email, description} = req.body;
    try {
        if (!title) {
            return res.status(404).json({Message:"Title is required"});
        }

        const NewContact = new ContactUsModel({
            title,  
            companyname,
            contractyear,
            managername,
            number,
            email,
            description,
            userId
        });
        const savecontact = await NewContact.save();
        console.log(savecontact);
        
        return res.status(201).json({contact : savecontact,Message: "Form submitted successfully."});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ Message: "Something went wrong" });
    }
}
const EditContact =  ((req,res)=>{

})
const DeleteContact =  ((req,res)=>{

})
const GetContact =  ((req,res)=>{

})

module.exports = {CreateContact, EditContact, DeleteContact, GetContact};