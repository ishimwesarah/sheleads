import Sidebar from "./Sidebar";
import Navbar from "./navbar";
import { Outlet } from "react-router-dom";


function MLayout()
{
    return(
        <>
        
<Navbar/>
<Sidebar/>
<Outlet/>

</>
    )
}
export default MLayout;