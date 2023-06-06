const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const studentRoute = require('./routes/student.routes');
const courseRoute = require('./routes/course.routes');
const lecturerRoute = require('./routes/lecturer.routes');
const authRoute = require('./routes/auth.routes');
const adminRoutes = require('./routes/admin.routes');
const authController = require('./controllers/auth.controller');
const cookieParser = require('cookie-parser');
const profileRoute = require('./routes/profile.routes');
const methodOverride = require('method-override');
const session = require('express-session');
require('dotenv').config();
const app = express();
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 }, // make sure to use HTTPS in production
  })
);
app.use(cors());
app.use(methodOverride('_method'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/students', studentRoute);
app.use('/api/user', authRoute);
app.use('/profile', profileRoute);
app.use('/lecturers', lecturerRoute);
app.use('/courses', courseRoute);
app.set('view engine', 'pug');
app.set('views', './views');
app.use('/admin', adminRoutes);
const uri = 'mongodb+srv://test:test@cluster0.gwhe7fm.mongodb.net/';
//const uri = 'mongodb://localhost:27017/uczelniaDB';
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/lecturers', (req, res) => {
  res.render('lecturers');
});

app
  .route('/login')
  .get((req, res) => {
    res.render('login');
  })
  .post(authController.login);

app
  .route('/register')
  .get((req, res) => {
    res.render('register');
  })
  .post(authController.register);

app.get('/logout', authController.logout);
const db = mongoose.connection;

db.on(
  'error',
  console.error.bind(console, 'MongoDB connection error:')
);

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Server is running on Port: ${PORT}`);
});
