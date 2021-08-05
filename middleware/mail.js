const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const config = require('config');

// Create Transporter
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: config.get('emailhostname'),
    pass: config.get('emailhostpass'),
  },
});

function sendConfirmation(payload, user) {
  console.log(payload);
  try {
    jwt.sign(
      payload,
      config.get('emailSecret'),
      { expiresIn: '1h' },
      (err, emailToken) => {
        const url = `http://localhost:5000/api/confirmation/${emailToken}`;
        transporter.sendMail({
          to: user.email,
          subject: 'Confirm Email',
          html: `Please click this email to confirm your email: <a href="${url}">${url}</a>`,
        });
        res.json({ emailtoken });
      }
    );
  } catch (err) {
    console.log(err);
  }
}

module.exports = sendConfirmation;
