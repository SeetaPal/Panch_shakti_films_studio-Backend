
const Contact = require("../models/Contact");
const transporter = require("../config/email");

exports.createContact = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, message } = req.body;

    if (!fullName || !email || !phoneNumber || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Save in DB
    const newContact = await Contact.create({
      fullName,
      email,
      phoneNumber,
      message,
    });

    // Send email
    await transporter.sendMail({
      from: `"Panch Shakti Films Studio" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // your admin email
      subject: "New Contact Form Submission",
      html: `
        <h2>New Contact Message</h2>
        <p><strong>fullName:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>phoneNumber:</strong> ${phoneNumber}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    res.status(201).json({
      success: true,
      message: "Message sent successfully & email delivered.",
      data: newContact,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong: " + error.message,
    });
  }
};


exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: contacts,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
