import nodemailer from 'nodemailer';
import dotenv from 'dotenv'
dotenv.config()
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.FROM_MAIL_ID,
    pass: process.env.FROM_MAIL_PASSWORD, 
  },
});

export const sendWelcomeEmail = async (email) => {
  const mailOptions = {
    from: '"TL Technologies"',
    to: email,
    subject: "Welcome to TL Technologies' Newsletter! Your Insights Await! ✨",
    html: `
      <p>Dear Subscriber,</p>
      <p>Thank you for subscribing to the TL Technologies newsletter! We're thrilled to have you join our community of innovators and tech enthusiasts.</p>
      <p>You're now set to be the first to discover our latest solutions, expert insights, and exclusive offers—delivered straight to your inbox. Get ready for a regular dose of:</p>
      <ul>
        <li><strong>Cutting-edge solutions:</strong> Stay informed about our newest developments and services designed to empower businesses.</li>
        <li><strong>Expert insights:</strong> Gain valuable knowledge and perspectives from our team on emerging technologies, industry trends, and strategic business advice.</li>
        <li><strong>Exclusive offers:</strong> Be the first to know about special promotions and opportunities from TL Technologies.</li>
      </ul>
      <p>We're excited to share our expertise and help you navigate the evolving landscape of technology.</p>
      <p>In the meantime, feel free to visit our website and explore our comprehensive range of services: <a href="https://tltechnologies.net/">https://tltechnologies.net/</a></p>
      <p>If you ever wish to unsubscribe, click here: <a href="https://tl-home-web-new-eight.vercel.app/unsubscribe.html">Unsubscribe</a></p>
      <br />
      <p>Best regards,</p>
      <p><strong>The Team at TL Technologies</strong><br />
      <a href="https://tltechnologies.net/">https://tltechnologies.net/</a><br />
      <a href="https://www.linkedin.com/company/tltechnologiespvtltd">Connect with us on LinkedIn</a></p>
    `,
  };

  await transporter.sendMail(mailOptions);
};

export const sendUnsubscribeEmail = async (email) => {
  const mailOptions = {
    from:"TL Technologies",
    to: email,
    subject: "You've Unsubscribed from TL Technologies' Newsletter 💬",
    html: `
      <p>Dear Subscriber,</p>
      <p>We're sorry to see you go! You've successfully unsubscribed from TL Technologies' newsletter.</p>
      <p>We hope you found our updates valuable and insightful. If you change your mind, you’re always welcome to rejoin us for more tech updates, expert insights, and special offers.</p>
      <p>You can resubscribe any time at: <a href="https://tltechnologies.net/">https://tltechnologies.net/</a></p>
      <br />
      <p>Wishing you continued success in all your endeavors.</p>
      <br />
      <p>Warm regards,</p>
      <p><strong>The Team at TL Technologies</strong><br />
      <a href="https://tltechnologies.net/">https://tltechnologies.net/</a><br />
      <a href="https://www.linkedin.com/company/tltechnologiespvtltd">Connect with us on LinkedIn</a></p>
    `
  };

  await transporter.sendMail(mailOptions);
};



export const sendSubscriptionNotificationEmail = async ({ email, timestamp }) => {
  const mailOptions = {
    from: '"TL Technologies" <your-email@gmail.com>',
    to: process.env.FROM_MAIL_ID, // Replace with internal notification address
    subject: '📬 New Newsletter Subscriber – TL Technologies',
    html: `
      <p>Hello Team,</p>

      <p>A new user has subscribed to the TL Technologies newsletter! 🎉<br />
      Here are their details:</p>

      <p>
        ➤ <strong>Email Address:</strong> ${email}<br />
        ➤ <strong>Subscription Timestamp:</strong> ${timestamp}<br />
        ➤ <strong>Source Page:</strong> { www.tltechnologies.net/home}
      </p>

      <p>Please ensure they are added to our mailing list and receive upcoming newsletters and updates.</p>

      <br />
      <p>Stay connected,<br />
      <strong>TL Technologies – Marketing Automation</strong></p>
    `
  };

  await transporter.sendMail(mailOptions);
};
