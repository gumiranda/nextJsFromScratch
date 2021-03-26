import { connectToDatabase } from '@/util/mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Process a POST request
    const { db } = await connectToDatabase();
    const { email, password } = req.body;
    const user = await db.collection('users').findOne({ email, password });
    if (user) {
      delete user.password;
      res.status(200).json(user);
      return;
    }
    res.status(400).json({ message: 'Bad request error' });
  } else {
    res.status(200).json({ message: 'Method not implemented' });
  }
}
