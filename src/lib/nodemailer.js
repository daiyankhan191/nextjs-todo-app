// /lib/nodemailer.js
import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  service: 'gmail', // You can also use other SMTP services
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendResetEmail = async (email, resetToken) => {
  const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${resetToken}`;

  const mailOptions = {
    from: `Your App <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Reset Your Password',
    html: `<p>Click the link below to reset your password:</p><a href="${resetLink}">${resetLink}</a>`
  };

  await transporter.sendMail(mailOptions);
};
