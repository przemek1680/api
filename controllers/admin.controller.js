const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const nodemailer = require('nodemailer');
const Course = require('../models/Course');
const crypto = require('crypto');
exports.adminPanel = async (req, res) => {
  res.render('admin');
};

exports.register = async (req, res) => {
  const user = new User(req.body);
  const activationToken = crypto.randomBytes(32).toString('hex');
  user.activationToken = activationToken;
  try {
    const savedUser = await user.save();
    const activationUrl = `http://localhost:4000/api/user/activate/${activationToken}`;
    const mailOptions = {
      from: process.env.EMAIL,
      to: user.email,
      subject: 'Activate Your Account',
      text: `Click this link to activate your account: ${activationUrl}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    res.send('Please check your email to activate your account');
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
