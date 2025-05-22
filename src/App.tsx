import { useEffect, useState } from "react";
import { RouterProvider } from "react-router";
import "./App.css";
import SplashScreen from "./components/SplashScreen/SplashScreen";
import router from "./routes";

function App() {
  const [splashScreen, setSplashScreen] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setSplashScreen(false);
    }, 3000);
  });

  if (splashScreen) return <SplashScreen />;
  return <RouterProvider router={router} />;
}

export default App;
