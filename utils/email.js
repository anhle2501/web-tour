const nodemailer = require('nodemailer');

const sendEmail = async options => {
  // 1. create transpoter
  const transporter = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: 'ebb53493c74de7',
      pass: '891a88ea8da7ce'
    }
    // active in gmail 'less secure app' option
    // 500 email perday

    // ta sẽ dung mail trap để dev
  });
  // 2. defind the email options
  const mailOptions = {
    from: 'Anh Le <hello@anh.io>',
    to: options.email,
    subject: options.subject,
    text: options.message
  };
  // 3. Actually send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
