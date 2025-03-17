import React from "react"
import "./App.css"
import Navbar from "./components/Navbar"
import Home from "./components/Home"
import Footer from "./components/Footer"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./components/Layout"
import Courses from "./userdashboard/Components/Financial"
import Mentorship from "./components/Mentorship"
import ContactUs from "./components/Contact"
import Investing from "./Couses/components/investing"
import Budgeting from "./Couses/components/Budgeting"
import Saving from "./Couses/components/Saving"
import BudgetingTools from "./components/Tools"
import BusinessManagement from "./components/Manage"
import SuccessStories from "./components/Success"
import Community from "./userdashboard/Components/Community"
import SearchResults from "./components/Search"
import Debt from "./Couses/components/Debt"


import AuthModal from "./components/Login"
import Dashboard from "./Dashboard/Components/view"
import UserDashboard from "./userdashboard/Components/UserLayout"
import UserLayout from "./userdashboard/Components/UserLayout"
import DashboardView from "./userdashboard/Components/view"
import ProfileModal from "./userdashboard/Components/Profile"
import CoLayout from "./Couses/components/CoLayout"
import DashLayout from "./Dashboard/Components/DashLayout"
import DashDashboard from "./Dashboard/Components/view"
import UsersPage from "./Dashboard/Components/User"
import CoursesPage from "./Dashboard/Components/Course"
import AdminCommunityPage from "./Dashboard/Components/adminComm"
import ProtectedRoute from "./components/ProtectedRoutes"
import AdminSettings from "./Dashboard/Components/Setting"
import ProgressTracker from "./userdashboard/Components/progress"

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
       <Route path="/"  element={<Layout/>} >
       <Route path="/" index element={<Home/>} />
       <Route path="/Home"  element={<Home/>} />       
       <Route path="/mentorship"  element={<Mentorship/>} />
       <Route path="/contact"  element={<ContactUs/>} />     
       <Route path="/Success"  element={<SuccessStories/>} />       
       <Route path="/Search"  element={<SearchResults/>} />       
       </Route>
       <Route path="/Join"  element={<AuthModal/>} />
       
       <Route path="/"   element={<DashLayout/>} >
       <Route path="/"   index element={<DashboardView/>} />
      
       
       <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
       <Route path="/Dashboard"  element={<DashDashboard/>} />
       </Route>
        <Route path="/Dashboard"  element={<DashDashboard/>} />
        <Route path="/Userpage"  element={<UsersPage/>} />
        <Route path="/CoPage"  element={<CoursesPage/>} />
        <Route path="/AdminComm"  element={<AdminCommunityPage/>} />
        <Route path="/AdminSettings"  element={<AdminSettings/>} />
       </Route>    
       <Route path="/"   element={<UserLayout/>} >
       <Route path="/" index element={<DashboardView/>} />
       <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
       <Route path="/Dashbo" index element={<DashboardView/>} />
       <Route path="/progre" index element={<ProgressTracker/>} />
       </Route>
       <Route path="/Dashbo" index element={<DashboardView/>} />
       <Route path="/Community"  element={<Community/>} />
       <Route path="/Profile"  element={<ProfileModal/>} />
       <Route path="/Tools"  element={<BudgetingTools/>} />   
       <Route path="/Manage"  element={<BusinessManagement/>} />    
       </Route>
       <Route path="/"   element={<CoLayout/>} >
       <Route path="/"  index element={<Courses/>} />
       <Route path="/Finance"  element={<Courses/>} />
       <Route path="/Budget"  element={<Budgeting/>} />
       <Route path="/Saving"  element={<Saving/>} />
       <Route path="/Investing"  element={<Investing/>} />
       <Route path="/Debt"  element={<Debt/>} />      
       </Route>
        
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
