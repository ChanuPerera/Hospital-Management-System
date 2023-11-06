import { BrowserRouter, Routes, Route } from "react-router-dom";
import WebRoutes from "./WEB/Routes";
import SystemRoutes from "./SYSTEM/Routes/Routes";


function App() {

  return (
    <>
      <SystemRoutes />
    </>
   
  );
}

export default App;
