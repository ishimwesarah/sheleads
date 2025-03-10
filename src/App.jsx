import React from "react"
import "./App.css"
import Navbar from "./components/Navbar"
import Home from "./components/Home"
import Footer from "./components/Footer"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./components/Layout"
import Courses from "./components/Financial"
import Mentorship from "./components/Mentorship"
import ContactUs from "./components/Contact"
import Investing from "./components/investing"
import Budgeting from "./components/Budgeting"
import Saving from "./components/Saving"
import BudgetingTools from "./components/Tools"
import BusinessManagement from "./components/Manage"
import SuccessStories from "./components/Success"
import Community from "./components/Community"
import SearchResults from "./components/Search"

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
       <Route path="/"  element={<Layout/>} >
       <Route path="/" index element={<Home/>} />
       <Route path="/Home"  element={<Home/>} />
       <Route path="/Finance"  element={<Courses/>} />
       <Route path="/mentorship"  element={<Mentorship/>} />
       <Route path="/contact"  element={<ContactUs/>} />
       <Route path="/Investing"  element={<Investing/>} />
       <Route path="/Budget"  element={<Budgeting/>} />
       <Route path="/Saving"  element={<Saving/>} />
       <Route path="/Tools"  element={<BudgetingTools/>} />
       <Route path="/Manage"  element={<BusinessManagement/>} />
       <Route path="/Success"  element={<SuccessStories/>} />
       <Route path="/Community"  element={<Community/>} />
       <Route path="/Search"  element={<SearchResults/>} />
        </Route>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
