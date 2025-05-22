import { Navigate, useLocation } from "react-router";
import Loader from "../components/Loader/Loader";
import useAuth from "../hooks/useAuth";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useAuth();

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );

  if (!user)
    return <Navigate to="/auth/login" replace state={{ from: location }} />;

  return children;
};

export default ProtectedRoute;
