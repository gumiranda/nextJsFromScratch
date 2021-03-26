import { connectToDatabase } from '@/util/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Process a POST request
    const { db } = await connectToDatabase();
    const { userId, id, title } = req.body;
    if (id) {
      const favorite = await db.collection('favorites').findOne({ userId, key: id });
      if (favorite) {
        const favorites = await db.collection('favorites').find({ userId }).toArray();
        res.status(200).json({ favorites });
        return;
      }
    }
    if (title) {
      const favorite = await db.collection('favorites').findOne({ userId, key: title });
      if (favorite) {
        const favorites = await db.collection('favorites').find({ userId }).toArray();
        res.status(200).json({ favorites });
        return;
      }
    }

    const result = await db.collection('favorites').insertOne(req.body);
    if (result?.ops[0]) {
      const favorites = await db.collection('favorites').find({ userId }).toArray();
      res.status(200).json({ favorites });
    } else {
      res.status(400).json({ message: 'Bad request error' });
    }
  } else if (req.method === 'DELETE') {
    const { db } = await connectToDatabase();
    const { userId, key } = req.query;
    console.log(userId, key);
    const result = await db.collection('favorites').deleteOne({ userId, key });
    console.log(result.deletedCount);
    const favorites = await db.collection('favorites').find({ userId }).toArray();
    res.status(200).json({ favorites });
  } else if (req.method === 'GET') {
    const { db } = await connectToDatabase();
    const { userId, sort, query, field } = req.query;
    const search = { userId };
    if (field && query) {
      search[field] = query;
    }
    const sortBy = { [sort]: 1 };
    const favorites = await db.collection('favorites').find(search).sort(sortBy).toArray();
    res.status(200).json({ favorites });
  } else {
    res.status(200).json({ message: 'Method not implemented' });
  }
}
