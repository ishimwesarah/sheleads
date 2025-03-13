import Sidebar from "./sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";


function DashLayout()
{
    return(
        <>
        
<Navbar/>
<Sidebar/>
<Outlet/>

</>
    )
}
export default DashLayout;