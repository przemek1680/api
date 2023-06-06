const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

let transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: 'haley.gusikowski@ethereal.email',
    pass: 'jNT4rutqYt2yjazquH',
  },
});

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

exports.login = async (req, res) => {
  const user = await User.findOne({ username: req.body.username });

  if (!user)
    return res.status(400).json({
      error: 'Użytkownik nie istnieje lub konto nie jest aktywne',
    });
  if (user.isActivated == false)
    return res.status(400).json({
      error: 'Konto nie jest aktywne',
    });

  const validPassword = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!validPassword)
    return res.status(400).json({ error: 'Błędne hasło' });

  // Create and assign token
  const token = jwt.sign(
    { _id: user._id, admin: user.admin },
    process.env.TOKEN_SECRET
  );
  req.session.token = token;

  console.log('Token saved in session: ', req.session.token); // Dodaj to

  res.header('auth-token', token).redirect('/profile');
};

exports.logout = (req, res) => {
  req.session.token = null;
  res.status(200).json('Wylogowano');
};

exports.changePassword = async (req, res) => {
  const { currentPassword, newPassword, confirmPassword } = req.body;

  if (!currentPassword || !newPassword || !confirmPassword) {
    return res.status(400).send('All fields are required');
  }

  if (newPassword !== confirmPassword) {
    return res
      .status(400)
      .send('New password and confirm password must match');
  }

  try {
    const user = await User.findOne({ _id: req.user._id });

    const validPass = await bcrypt.compare(
      currentPassword,
      user.password
    );
    if (!validPass) {
      return res.status(400).send('Invalid password');
    }
    user.password = newPassword;
    await user.save();

    res.redirect('/profile');
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.activate = async (req, res) => {
  const user = await User.findOne({
    activationToken: req.params.token,
  });

  if (!user) {
    return res.status(400).send('Invalid activation token');
  }

  user.isActivated = true;
  user.activationToken = null;
  await user.save();

  res.send('Your account has been activated, you can now log in');
};
