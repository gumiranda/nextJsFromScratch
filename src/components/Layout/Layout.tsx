import Head from 'next/head';
import Header from '../Header/Header';

function Layout({ children }) {
  return (
    <div>
      <Head>
        <title>GrowthHackTest</title>
        <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"> 
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="min-h-80vh">{children}</div>
    </div>
  );
}
export default Layout;
