import ProtectedRoute from '@/components/ProtectedRoute/ProtectedRoute';
import Layout from '@/components/Layout/Layout';

export default function Favorites() {
  return (
    <Layout>
      <ProtectedRoute>
        <p>route</p>
      </ProtectedRoute>
    </Layout>
  );
}
