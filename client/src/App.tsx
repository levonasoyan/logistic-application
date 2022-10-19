import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./pages/Home";
import Load from "./pages/Load";
import Order from "./pages/Order";

const App = () => {

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
         <Route element={<Home/>}  path="/"/>
         <Route element={<Home/>}  path="/addLoads"/>
         <Route element={<Load/>}  path="/load"/>
         <Route element={<Load/>}  path="/load/:id"/>
         <Route element={<Order/>} path="/order"/>
         <Route element={<Order/>} path="/order/:id"/>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
