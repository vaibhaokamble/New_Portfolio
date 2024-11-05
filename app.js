const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Nodemailer transporter configuration (using Gmail SMTP)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'vaibhaokamble17@gmail.com', // Replace with your email
        pass: 'Vaibhao@1711'    // Replace with your password or app-specific password
    }
});

// Endpoint to handle form submissions and send email
app.post('/send-email', (req, res) => {
    const { name, email, subject, message } = req.body;

    const mailOptions = {
        from: email,
        to: 'vaibhaokamble17@gmail.com',  // Replace with your receiving email
        subject: `Contact Form: ${subject}`,
        text: `You received a new message from your contact form.\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).send('Failed to send email.');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Email sent successfully!');
        }
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
