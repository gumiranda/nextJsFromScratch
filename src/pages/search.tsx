import Head from 'next/head';
import SearchPage from '../components/SearchPage/SearchPage';

export default function Home() {
  return (
    <div>
      <Head>
        <title>GrowthHackTest</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SearchPage />
    </div>
  );
}
