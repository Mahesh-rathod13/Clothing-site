import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import type { ReactNode } from "react";

const ProtectedRoute = ({ children } : {children : ReactNode}) => {
  const location = useLocation();
  const { user, loading } = useAuth();
  
  if(loading) return <div className="flex justify-center items-center h-screen"><Loader /></div>;

  if(!user) return <Navigate to="/auth/login" replace state={{from : location}}/>;

  return children
}


export default ProtectedRoute;