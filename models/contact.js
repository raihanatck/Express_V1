const mongoose = require("mongoose");

const ContactUsSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    comapnyname: {
        type: String,
        required: true,
    },
    contractyear: {
        type: Date,
        required: true,
    },
    managername: {
        type: String,
        required: true,
    },
    number : {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("ContactUs",ContactUsSchema);
