import useAuth from '../../hooks/useAuth'
import { Loader } from 'lucide-react';
import { Navigate, Outlet, useLocation} from 'react-router';
import Navbar from '../../components/Navbar/Navbar'

export default function AuthLayout() {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) return <Loader />;

  if (user) {
    const from = location.state?.from?.pathname || `/`;
    return <Navigate to={from} replace />;
  }

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}


