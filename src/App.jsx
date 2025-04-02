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
import MentorAdminPage from "./Dashboard/Components/mentor"
import AdminBlog from "./Dashboard/Components/Blog"
import BlogDetails from "./components/blogDetail"
import AdminContactUs from "./Couses/components/adminContact"
import UserContactUs from "./userdashboard/Components/userContact"
import MentorDashboard from "./mentordash/Components/mentordash"
import Mentees from "./mentordash/Components/mentees"
import MLayout from "./mentordash/Components/Mlayout"
import MentorProfile from "./mentordash/Components/profile"
import BookMentor from "./userdashboard/Components/Book"
import CourseDetails from "./userdashboard/Components/singlecourse"

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
       <Route path="/blog/:id" element={<BlogDetails />} />       
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
        <Route path="/mentor"  element={<MentorAdminPage/>} />
        <Route path="/AdminBlog" element={<AdminBlog/>} />

       </Route>    
       <Route path="/"   element={<UserLayout/>} >
       <Route path="/" index element={<DashboardView/>} />
       <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
       <Route path="/Dashbo" index element={<DashboardView/>} />
       <Route path="/UserContact"  element={<UserContactUs/>} />
       <Route path="/progre" index element={<ProgressTracker/>} />
       <Route path="/bookMentor"element={<BookMentor/>}/>
       <Route path="/course/:id" element={<CourseDetails />} /> 
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
       <Route path="/adminContact"  element={<AdminContactUs/>} />
       <Route path="/Investing"  element={<Investing/>} />
       <Route path="/Debt"  element={<Debt/>} />      
       </Route>
       <Route path="/"   element={<MLayout/>} >
       <Route path="/mentordash"  element={<MentorDashboard/>} />
       <Route path="/mentorpro"  element={<MentorProfile/>} />
       <Route path="/mentees" element={<Mentees/>}/>
       
         </Route>    
        
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
