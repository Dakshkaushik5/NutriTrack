import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendAdminEmail = async (form) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL,
    subject: 'New Diet Plan Request',
    text: `New request submitted. Client Info:\n${JSON.stringify(form)}`,
  });
};

export const sendClientStatusEmail = async (form) => {
  const userEmail = form?.userId?.email || 'client@example.com';
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: 'Your Diet Plan Status Updated',
    text: `Hello, your request has been marked as: ${form.status}`,
  });
};
