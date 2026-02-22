import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/Home.jsx";
import UserDetails from "./pages/UserDetails.jsx";

function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/user/:id" element={<UserDetails/>}/>
      </Routes>
    </BrowserRouter>
  );
}
export default App;