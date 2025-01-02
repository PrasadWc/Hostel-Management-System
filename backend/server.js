const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();
const eligibleRouter = require("./routes/Eligible");
let Student = require("./models/Student");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const nodemailer = require("nodemailer");

const PORT = process.env.PORT || 3010;

app.use(
  cors({
    origin: ["http://localhost:3000/"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use("/Student", eligibleRouter);
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    //key: 'user_sid',
    secret: "thisisrandomstuff",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 1000 * 60 * 60 },
  })
);

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const studentRouter = require("./routes/Students.js");
app.use("/Student", studentRouter);

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Mongodb connection successfully established");
});

/*const HOSTELS_URL = process.env.HOSTELS_MONGODB_URL;
const hostelsConnection = mongoose.createConnection(HOSTELS_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

hostelsConnection.once("open", () => {
  console.log("Hostels database connection successfully established");
});*/

const hostelRouter = require("./routes/hostels/Pandukabhaya1.js");
app.use("/hostels", hostelRouter);

app.post("/login", (req, res) => {
  const { uniRegNo, password } = req.body;
  Student.findOne({ uniRegNo: uniRegNo }).then((student) => {
    if (student) {
      if (student.password === password) {
        req.session.name = student.fullName;
        req.session.uniqno = student._id;
        res.json("Log in successfully!");
      } else {
        res.json("The Password is incorrect!");
      }
    } else {
      res.json("No record Exists!");
    }
  });
});

app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      return res.status(500).send("Internal Server Error");
    }

    // Clear all cookies
    Object.keys(req.cookies).forEach((cookieName) => {
      res.clearCookie(cookieName);
    });

    // Send a response indicating successful logout
    res.status(200).send("Logged out successfully");
  });
});

app.get("/", (req, res) => {
  if (req.session.name) {
    return res.json({
      valid: true,
      name: req.session.name,
      uniqno: req.session.uniqno,
    });
  } else {
    return res.json({ valid: false });
  }
});

const transporter = nodemailer.createTransport({
  host: "smtp.office365.com", // Outlook SMTP server
  port: 587, // Outlook SMTP port
  secure: false, // false for TLS - as a boolean not string - but the default is false so just remove this completely
  auth: {
    user: "sanjima@live.com",
    pass: "Wsds2911",
  },
});

// API endpoint for sending emails
app.post("/email", (req, res) => {
  const { to, subject, text } = req.body;

  const mailOptions = {
    from: "sanjima@live.com",
    to,
    subject,
    text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      return res.status(500).send("Internal Server Error");
    } else {
      console.log("Email sent: " + info.response);
      return res.status(200).send("Email sent successfully");
    }
  });
});

app.listen(PORT, () => {
  console.log(`server is up and running on port: ${PORT}`);
});
