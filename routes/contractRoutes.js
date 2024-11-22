const express = require("express");
const { GetContract, CreateContract, DeleteContract, EditContract } = require("../controllers/contractController");
const auth = require("../middlewares/auth");
const contractRouter = express.Router();

contractRouter.post("/", auth, CreateContract);
contractRouter.get("/", auth, GetContract);
contractRouter.delete("/:contractid", auth, DeleteContract);
contractRouter.put("/:contractid", auth, EditContract);

module.exports = contractRouter;