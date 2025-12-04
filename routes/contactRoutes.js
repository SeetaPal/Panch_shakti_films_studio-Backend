
const express = require('express');
const router = express.Router();

const { createContact, getAllContacts } =  require('../controllers/contactController');



// Create Contact Message
router.post("/", createContact);

// Get All Contact Messages (Admin)
router.get("/", getAllContacts);

module.exports = router;
