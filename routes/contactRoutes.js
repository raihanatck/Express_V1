const express = require("express");
const { GetContact, CreateContact, DeleteContact, EditContact } = require("../controllers/contactController");
const auth = require("../middlewares/auth");
const contactRouter = express.Router();

contactRouter.post("/", auth, CreateContact);
contactRouter.get("/", auth, GetContact);
contactRouter.delete("/:contactid", auth, DeleteContact);
contactRouter.put("/:contactid", auth, EditContact);

module.exports = contactRouter;