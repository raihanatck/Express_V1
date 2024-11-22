const express = require("express");
const ContactUsModel = require("../models/contact");
const mongoose = require('mongoose');
const contact = require("../models/contact");


const CreateContact = async (req, res) => {
    const userId = req.userId;
    console.log(userId);
    const { title, companyname, contractyear, managername, number, email, description } = req.body;
    try {
        if (!title) {
            return res.status(404).json({ Message: "Title is required" });
        }
        if (!companyname) {
            return res.status(404).json({ Message: "Companyname is required" });
        }
        if (!contractyear) {
            return res.status(404).json({ Message: "Contractyear is required" });
        }
        if (!managername) {
            return res.status(404).json({ Message: "Managername is required" });
        }
        if (!number) {
            return res.status(404).json({ Message: "Number is required" });
        }
        if (!email) {
            return res.status(404).json({ Message: "Email is required" });
        }
        if (!description) {
            return res.status(404).json({ Message: "Description is required" });
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

        return res.status(201).json({ contact: savecontact, Message: "Form submitted successfully." });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ Message: "Something went wrong" });
    }
}
const EditContact = async (req, res) => {
    const id = req.params.contactid;
    const { title, companyname, contractyear, managername, number, email, description } = req.body;
    try {
        const newContact = {
            title: title,
            companyname: companyname,
            contractyear: contractyear,
            managername: managername,
            number: number,
            email: email,
            description: description,
            userId: req.userId
        }

        await ContactUsModel.findByIdAndUpdate(id, newContact, { new: true });
        res.status(201).json({newContact});
    } catch (error) {

    }
}
const DeleteContact = async (req, res) => {
    const id = req.params.contactid;
    try {
        const DelContact = await ContactUsModel.findByIdAndDelete(id);
        res.status(201).json(DelContact);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ Message: "Something went wrong" });
    }
}
const GetContact = async (req, res) => {
    try {
        const notes = await ContactUsModel.find({ userId: req.userId });
        return res.status(201).json({ notes });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ Message: "Something went wrong" });
    }
}

module.exports = { CreateContact, EditContact, DeleteContact, GetContact };