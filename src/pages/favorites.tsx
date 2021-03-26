import ProtectedRoute from '@/components/ProtectedRoute/ProtectedRoute';

export default function Favorites() {
  return (
    <ProtectedRoute>
      <p>route</p>
    </ProtectedRoute>
  );
}
