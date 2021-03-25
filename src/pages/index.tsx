import { connectToDatabase } from '../util/mongodb';

export async function getServerSideProps(context) {
  const { client } = await connectToDatabase();

  const isConnected = await client.isConnected();

  return {
    props: { isConnected },
  };
}

export default function Home({ isConnected }) {
  return (
    <div>

      <h1>Here are some users</h1>
      {isConnected ? (
        <h2>You are connected to MongoDB</h2>
      ) : (
        <h2>
          You are NOT connected to MongoDB. Check the

          <code>README.md</code>

          for instructions.
        </h2>
      )}

    </div>
  );
}
