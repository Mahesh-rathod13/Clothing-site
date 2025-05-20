import { Outlet, Navigate} from 'react-router'
import Navbar from '../../components/Navbar/Navbar'
import useAuth from '../../hooks/useAuth'

const AuthLayout = () => {
  const { user } = useAuth();

  if(user) return <Navigate to='/' />

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

export default AuthLayout