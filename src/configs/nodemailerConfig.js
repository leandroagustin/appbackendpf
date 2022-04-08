const nodemailer = require("nodemailer");

// //Transporter de nodemailer
const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false,
  auth: {
    user: "abbey.hintz4@ethereal.email",
    pass: "jeqc2n1NguNANThSq7",
  },
});

module.exports = transporter;
