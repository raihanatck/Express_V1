const mongoose = require("mongoose");

const ContractUsSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    companyname: {
        type: String,
        required: true,
    },
    contractyear: {
        type: String,
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

module.exports = mongoose.model("Contract",ContractUsSchema);
