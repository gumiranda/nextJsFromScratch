/* eslint-disable no-underscore-dangle */
import { connectToDatabase } from '@/util/mongodb';
import ProtectedRoute from '@/components/ProtectedRoute/ProtectedRoute';
import Layout from '@/components/Layout/Layout';

export default function Users({ users }) {
  return (
    <Layout>
      <ProtectedRoute>
        <div>
          <h1>Top 20 Users of All Time</h1>
          <p>
            <small>(According to Metacritic)</small>
          </p>
          <ul>
            {users.map((user) => (
              <li key={user?._id}>
                <h2>{user.email}</h2>
              </li>
            ))}
          </ul>
        </div>
      </ProtectedRoute>
    </Layout>

  );
}
export async function getServerSideProps() {
  const { db } = await connectToDatabase();
  await db.collection('users').insertOne({ name: 'fulano' });
  const users = await db
    .collection('users')
    .find({})
    .toArray();
  return {
    props: {
      users: JSON.parse(JSON.stringify(users)),
    },
  };
}
