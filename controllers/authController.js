import { OAuth2Client } from 'google-auth-library';
import User from '../models/User.js';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const verifyGoogleToken = async (req, res) => {
    
    const { idToken } = req.body;
    if (!idToken) { return res.status(400).json({ success: false, message: 'No ID token provided' });}

    let payload;
    try {
        const ticket = await client.verifyIdToken({
            idToken,
            audience: process.env.GOOGLE_CLIENT_ID
        });
        payload = ticket.getPayload();
        console.log('Token payload:', payload);
    } catch (err) {
        console.error('Invalid ID token:', err);
        return res.status(401).json({ success: false, message: 'Invalid ID token' });
    }

    try {
        const email = payload.email;
        const user = await User.findOne({ email });
        if (!user) {
            console.warn('User not approved:', email);
            return res.status(403).json({ success: false, message: 'User not approved' });
        }
        console.log('User approved:', email, 'Role:', user.role);
        return res.json({ success: true, message: 'Access granted', email, role: user.role });

    } catch (dbErr) {
        console.error('Database error:', dbErr);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

export const listUsers = async (req, res) => {
    try {
        const users = await User.find().select('email role -_id').lean();
        res.json({ success: true, users });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
