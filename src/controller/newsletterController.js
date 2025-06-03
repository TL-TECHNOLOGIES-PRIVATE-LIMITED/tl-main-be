import sql from 'mssql';
import dbConfig from '../utils/dbConfig.js';
import { sendWelcomeEmail, sendUnsubscribeEmail, sendSubscriptionNotificationEmail } from '../utils/nodemailer.js';

export const subscribeToNewsletter = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      success: false,
      message: "Email is required"
    });
  }

  try {
    const pool = await sql.connect(dbConfig);

    const checkResult = await pool.request()
      .input('email', sql.VarChar, email)
      .query('SELECT * FROM NewsletterSubscribers WHERE email = @email');

    if (checkResult.recordset.length > 0) {
      return res.status(409).json({
        success: false,
        message: "Email is already subscribed"
      });
    }

    await pool.request()
      .input('email', sql.VarChar, email)
      .query('INSERT INTO NewsletterSubscribers (email) VALUES (@email)');
    const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
    await sendWelcomeEmail(email);
    await sendSubscriptionNotificationEmail({ email, timestamp })
    return res.status(200).json({
      success: true,
      message: "Subscribed successfully and welcome email sent"
    });

  } catch (error) {
    console.error("Error subscribing:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

export const unsubscribeFromNewsletter = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      success: false,
      message: "Email is required"
    });
  }

  try {
    const pool = await sql.connect(dbConfig);

    const checkResult = await pool.request()
      .input('email', sql.VarChar, email)
      .query('SELECT * FROM NewsletterSubscribers WHERE email = @email');

    if (checkResult.recordset.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Email not found in our subscription list"
      });
    }

    await pool.request()
      .input('email', sql.VarChar, email)
      .query('DELETE FROM NewsletterSubscribers WHERE email = @email');

    await sendUnsubscribeEmail(email);

    return res.status(200).json({
      success: true,
      message: "Unsubscribed successfully and farewell email sent"
    });

  } catch (error) {
    console.error("Error unsubscribing:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};