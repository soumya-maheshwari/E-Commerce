const nodemailer = require("nodemailer");
require("dotenv").config();

const sendEmail = async (email, namee, price) => {
  try {
    const msg = {
      from: "soumyamaheshwari2003@gmail.com",
      to: email,
      subject: `  ${namee}`,
      html: `  <div>
          <h1>Welcome to Plypicker !!</h1>
          <p>A new product  ${namee} of price : ${price} has been added to your cart
          </p>
        </div>`,
    };

    console.log(msg);
    const transporter = nodemailer.createTransport({
      service: "gmail",
      port: 587,
      // secure: true,
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });

    transporter.sendMail(msg, (err) => {
      if (err) {
        console.log(err);
        return false;
      } else {
        console.log("Mail sent successfully");
        return true;
      }
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

module.exports = { sendEmail };
