import './App.css'
import { RouterProvider } from 'react-router';
import router from './routes'
import Loader from './components/Loader/Loader';

function App() {

  return (
    <RouterProvider router={router}/>
  )
}

export default App;