
const nodemailer = require('nodemailer');

// const transporter = nodemailer.createTransport({
//   host: process.env.SMTP_HOST,
//   port: process.env.SMTP_PORT,
//   auth: {
//     user: process.env.SMTP_USER,
//     pass: process.env.SMTP_PASS,
//   },
//   secure: true,
// });

// for testing account
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'ericka.hilpert55@ethereal.email',
        pass: 'EyNF86vXUxHPDX2gKm'
    }
});
const sendEmail = async (to, subject, html) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM ||'"Saurabh Dixit"<smartds2550@gmail.com>' ,
      to,
      subject,
      html,
    });
    console.log(`Email sent: ${info.messageId}`);
  } catch (err) {
    console.error(err);
  }
};

module.exports = sendEmail;