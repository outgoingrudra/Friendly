import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const sendEmail = async ({ to, subject, html }) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER,
      pass: process.env.PASSWORD,
    },
  });

  await transporter.sendMail({
    from: "Friendly",
    to,
    subject,
    html,
  });

  console.log("📧 HTML Email sent to:", to);
};