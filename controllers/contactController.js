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
        if (!companyname) {
            return res.status(404).json({Message:"Companyname is required"});
        }
        if (!contractyear) {
            return res.status(404).json({Message:"Contractyear is required"});
        }
        if (!managername) {
            return res.status(404).json({Message:"Managername is required"});
        }
        if (!number) {
            return res.status(404).json({Message:"Number is required"});
        }
        if (!email) {
            return res.status(404).json({Message:"Email is required"});
        }
        if (!description) {
            return res.status(404).json({Message:"Description is required"});
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
        // console.log(savecontact);
        
        return res.status(201).json({contact : savecontact,Message: "Form submitted successfully."});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ Message: "Something went wrong" });
    }
}
const EditContact =  (req,res)=>{

}
const DeleteContact =  (req,res)=>{

}
const GetContact = async (req,res)=>{
    try {
        const notes = await ContactUsModel.find({userId : req.userId});
        return res.status(201).json({notes});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ Message: "Something went wrong" });
    }
}

module.exports = {CreateContact, EditContact, DeleteContact, GetContact};