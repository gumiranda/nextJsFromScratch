import Layout from '@/components/Layout/Layout';
import Router from 'next/router';
import { useSelector } from 'react-redux';

export default function Favorites() {
  const signed = useSelector((state) => state.auth.signed);
  if (!signed) {
    Router.push('/');
  }
  return (
    <Layout>
      {signed && (
      <p>
        ola
      </p>
      )}
    </Layout>
  );
}
