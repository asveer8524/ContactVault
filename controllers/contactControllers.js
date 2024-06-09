const { response } = require("express");
const asynchandler= require("express-async-handler");
const Contact = require("../models/contactModel");
const { Error } = require("mongoose");

//we are using mongo db so we are using async function and for errorhandling in these function we need tey catch block
// asynchandler add it to function will automatically take care of try catch


const getContacts = asynchandler(async function(req, res) {
    const contacts=await Contact.find({user_id:req.user.id});
    res.status(200).json(contacts);
});

const getContactsById = asynchandler(async function(req, res) {
    const contact= await Contact.findById(req.params.id);
    if(!contact)
    {
        throw new Error ("No contact found");
    }
    res.status(200).json(contact);
});

const postContacts = asynchandler(async function(req, res) {
    const { name, email, phone } = req.body;
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Phone:", phone);
    if (!name || !email || !phone) {
        console.log("Error");
        throw new Error ("All feilds are mandetory");
    } 
  
        const contact=await Contact.create({
            name, 
            email, 
            phone,
            user_id:req.user.id
        });
        console.log("Hiiiiiii");
        console.log(req.body);
        res.status(201).json(contact);
});

const updateContacts = asynchandler(async function(req, res) {
  //  console.log(`${req.params.id}`);
    const contact= await Contact.findById(req.params.id);
    
    if(!contact)
    {
        throw new Error("Insert ID");
    }

    if (contact.user_id.toString() !== req.user.id) {
        console.log(`Hello 333 ${req.params.id}`);
        res.status(403);
        throw new Error("Not Authorised to update this contact");
    }
    
    console.log(`Hello    ${req.params.id}`);
    const updateContacts= await Contact.findByIdAndUpdate(
        req.params.id,   //searching parameter
        req.body,      // data to insert
        {new:true} //   specifies that you want Mongoose to return the updated document. If omitted, it will return the original document before the update.
    );
    res.status(201).json(updateContacts);
});

const deleteContacts = asynchandler(async (req, res) => {
    console.log(`Hello 333 ${req.params.id}`);
    const contact = await Contact.findById(req.params.id);
    console.log(`Hello 333 ${req.params.id}`);
    if (!contact) {
        throw new Error("Contact not found");
    }
    console.log(`Hello 333 ${req.params.id}`);
    if (contact.user_id.toString() !== req.user.id) {
        console.log(`Hello 333 ${req.params.id}`);
        res.status(403);
        throw new Error("Not Authorized to delete this contact");
    }

    await Contact.deleteOne({
        _id:req.params.id
    });

    console.log("Deletion successful");
    res.status(200).json(deletedContact);
});


module.exports = { getContacts, getContactsById, postContacts, updateContacts, deleteContacts };
