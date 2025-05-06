import sql from 'mssql';
import dbConfig from '../utils/dbConfig.js';

export const subscribeToNewsletter = async (req, res) => {
    const { email } = req.body;
    
    // Validate email
    if (!email) {
        return res.status(400).json({
            success: false,
            message: "Email is required"
        });
    }

    try {
        // Connect to the database
        const pool = await sql.connect(dbConfig);

        // Check if email already exists
        const checkResult = await pool.request()
            .input('email', sql.VarChar, email)
            .query('SELECT * FROM NewsletterSubscribers WHERE email = @email');

        if (checkResult.recordset.length > 0) {
            return res.status(409).json({
                success: false,
                message: "Email is already subscribed"
            });
        }

        // Insert email
        await pool.request()
            .input('email', sql.VarChar, email)
            .query('INSERT INTO NewsletterSubscribers (email) VALUES (@email)');

        return res.status(200).json({
            success: true,
            message: "Subscribed successfully"
        });

    } catch (error) {
        console.error("Error subscribing:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};
