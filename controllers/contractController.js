const express = require("express");
const ContractUsModel = require("../models/contract");
const mongoose = require('mongoose');


const CreateContract = async (req, res) => {
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


        const NewContact = new ContractUsModel({
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
const EditContract = async (req, res) => {
    const id = req.params.contractid;
    const { title, companyname, contractyear, managername, number, email, description } = req.body;
    try {
        const newContract = {
            title: title,
            companyname: companyname,
            contractyear: contractyear,
            managername: managername,
            number: number,
            email: email,
            description: description,
            userId: req.userId
        }

        await ContractUsModel.findByIdAndUpdate(id, newContract, { new: true });
        res.status(201).json({newContract});
    } catch (error) {

    }
}
const DeleteContract = async (req, res) => {
    const id = req.params.contractid;
    try {
        const DelContract = await ContractUsModel.findByIdAndDelete(id);
        res.status(201).json(DelContract);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ Message: "Something went wrong" });
    }
}
const GetContract = async (req, res) => {
    try {
        const notes = await ContractUsModel.find({ userId: req.userId });
        return res.status(201).json({ notes });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ Message: "Something went wrong" });
    }
}

module.exports = { CreateContract, EditContract, DeleteContract, GetContract };