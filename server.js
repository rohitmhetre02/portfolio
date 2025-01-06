const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 3000;
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static(path.join(__dirname, 'public')));


app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/about.html'));
});

app.get('/projects', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/projects.html'));
});

app.get('/services', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/services.html'));
});


// POST route  contact form
app.post("/send-email", async (req, res) => {
    const { fullName, email, mobile, subject, message } = req.body;

    if (!fullName || !email || !mobile || !subject || !message) {
        return res.status(400).send("All fields are required!");
    }

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "rohitmhetre2004@gmail.com",
            pass: process.env.EMAIL_PASSWORD,
        },
    });


    const mailOptions = {
        from: email,
        to: "rohitmhetre2004@gmail.com",
        subject: subject,
        html: `
        <h3>Contact Form Details</h3>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mobile:</strong> ${mobile}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send("Message sent successfully!");
    } catch (error) {
        res.status(500).send("Error sending email: " + error.message);
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
