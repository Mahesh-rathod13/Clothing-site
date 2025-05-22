import { Navigate, Outlet, useLocation } from "react-router";
import Loader from "../../components/Loader/Loader";
import Navbar from "../../components/Navbar/Navbar";
import useAuth from "../../hooks/useAuth";

export default function AuthLayout() {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading)
    return (
      <div className="h-screen w-screen">
        <Loader
          variant="orbit"
          size="lg"
          text="Getting Ready in shortly....."
        />
      </div>
    );

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
