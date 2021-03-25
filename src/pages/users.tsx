import { connectToDatabase } from '@/util/mongodb';

export default function Users({ users }) {
  return (
    <div>
      <h1>Top 20 Users of All Time</h1>
      <p>
        <small>(According to Metacritic)</small>
      </p>
      <ul>
        {users.map((user) => (
          <li>
            <h2>{user.email}</h2>
          </li>
        ))}
      </ul>
    </div>
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
