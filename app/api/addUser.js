// pages/api/addUser.js
import dbConnect from '../../utils/dbConnect';
import User from '../../models/User';

export default async function handler(req, res) {
  console.log('API route hit'); // Log to confirm route is hit

  try {
    await dbConnect();
    console.log('Database connected'); // Log to confirm database connection
  } catch (error) {
    console.error('Database connection error:', error);
    return res.status(500).json({ success: false, error: 'Database connection error' });
  }

  if (req.method === 'POST') {
    try {
      console.log('Request body:', req.body); // Log request body
      const { name, email, image } = req.body;
      const user = new User({ name, email, image });
      await user.save();
      console.log('User saved:', user); // Log saved user
      res.status(201).json({ success: true, data: user });
    } catch (error) {
      console.error('Error saving user:', error);
      res.status(400).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}
