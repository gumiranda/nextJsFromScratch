import Head from 'next/head';
import Header from '../Header/Header';

function Layout({ children }) {
  return (
    <div>
      <Head>
        <title>GrowthHackTest</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="min-h-80vh">{children}</div>
    </div>
  );
}
export default Layout;
