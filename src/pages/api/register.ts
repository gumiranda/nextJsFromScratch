import { connectToDatabase } from '@/util/mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Process a POST request
    const { db } = await connectToDatabase();
    const { email, password } = req.body;
    const user = await db.collection('users').findOne({ email });
    if (user) {
      res.status(200).json({ message: 'Email exists in database' });
      return;
    }
    const result = await db.collection('users').insertOne({ email, password });
    if (result?.ops[0]) {
      const userCreated = result?.ops[0];
      delete userCreated.password;
      res.status(200).json(userCreated);
    } else {
      res.status(400).json({ message: 'Bad request error' });
    }
  } else {
    res.status(200).json({ message: 'Method not implemented' });
  }
}
