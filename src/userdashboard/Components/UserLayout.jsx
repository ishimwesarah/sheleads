import Sidebar from "./sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

function UserLayout()
{
    return(
        <>
        
<Navbar/>
<Sidebar/>
<Outlet/>
<Footer/>
</>
    )
}
export default UserLayout;