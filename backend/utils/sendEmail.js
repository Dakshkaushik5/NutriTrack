/*
File: backend/utils/sendEmail.js
Purpose: A reusable utility for sending emails using Nodemailer.
*/
const nodemailer = require('nodemailer');
require('dotenv').config();

const sendEmail = async (options) => {
  // 1. Create a transporter
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // or another service like SendGrid, Mailgun
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // 2. Define the email options
  const mailOptions = {
    from: `NutriTrack <${process.env.EMAIL_USER}>`,
    to: options.email,
    subject: options.subject,
    html: options.html,
  };

  // 3. Actually send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;