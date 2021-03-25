import {connectToDatabase} from '@/util/mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Process a POST request
    const {db} = await connectToDatabase();
    const {email} = req.body;
    const result = await db.collection('users').insertOne({email});
    if (result?.ops[0]) {
      res.status(200).json(result?.ops[0]);
    } else {
      res.status(400).json({message: 'Bad request error'});
    }
  } else {
    res.status(200).json({message: 'Method not implemented'});
  }
}
