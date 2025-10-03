
import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";
import Home from "../pages/App"; // ta page qui rend <App /> ou équivalent
import UserDetails from "../pages/UserDetails";
import { HOME, Userdetails } from "../constant/route"; // si tu utilises ces constantes

export default function AppRoutes() {
  return (
    <Routes>
      <Route path={HOME} element={<Layout />}>
        <Route index element={<Home />} /> 
        <Route path={Userdetails.replace("/user/:userid", "user/:userid")} element={<UserDetails />} />
      </Route>
    </Routes>
  );
}
