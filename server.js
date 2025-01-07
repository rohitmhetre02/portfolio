const express = require('express');
const path = require('path');
const sgMail = require('@sendgrid/mail');
require('dotenv').config();
const fs = require('fs');

const app = express();
const PORT = 3000;
require('dotenv').config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

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



const loadTemplate = (templateName, replacements) => {
    const filePath = `./public/${index}.html`;
  
    if (!fs.existsSync(filePath)) {
      throw new Error(`Template "${templateName}" not found.`);
    }
  
    let templateContent = fs.readFileSync(filePath, 'utf8');
  
    for (const key in replacements) {
      const placeholder = `{{${key}}}`;
      templateContent = templateContent.replace(new RegExp(placeholder, 'g'), replacements[key]);
    }
  
    return templateContent;
  };

// POST route to send emails
app.post('/send-email', async (req, res) => {
    const { fullName, email, mobile, subject, message } = req.body;

    
    if (!fullName || !email || !mobile || !subject || !message) {
        return res.status(400).send('All fields are required.');
    }

    const emailContent = {
        to: 'rohitmhetre2004@gmail.com',
        from: 'rohitmhetre2004@gmail.com', 
        subject: `New Contact Form Submission: ${subject}`,
        text: `
        You have received a new message from your contact form.
  
        Full Name: ${fullName}
        Email: ${email}
        Mobile Number: ${mobile}
        Subject: ${subject}
        Message: ${message}
      `,
        html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Full Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mobile Number:</strong> ${mobile}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    };

    try {
        await sgMail.send(emailContent);
        res.status(200).send('Email sent successfully!');
    } catch (error) {
        console.error('Error sending email:', error.message);
        if (error.response) {
            console.error('SendGrid Response:', error.response.body);
        }
        res.status(500).send('Failed to send email.');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
