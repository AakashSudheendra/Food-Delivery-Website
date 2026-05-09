import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import ForgotPassword from "./pages/ForgotPassword";
export const serverUrl = "http://localhost:8000";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useGetCurrentUser from "./hooks/useGetCurrentUser";
import { useSelector } from "react-redux";
import Home from "./pages/Home";
import useGetCity from "./hooks/useGetCity";
import useGetMyShop from "./hooks/useGetMyShop";
import CreateEditShop from "./pages/CreateEditShop";

function App() {
  useGetCurrentUser()
  useGetCity()
  useGetMyShop()
  const {userData}=useSelector(state=>state.user)
  const {ownerData}=useSelector(state=>state.owner)

  return (
    <>
      <Routes>
        <Route path="/signup" element={!userData?<SignUp />:<Navigate to={"/"}/>} />
        <Route path="/signin" element={!userData?<SignIn />:<Navigate to={"/"}/>} />
        <Route path="/forgot-password" element={!userData?<ForgotPassword />:<Navigate to={"/"}/>} />
        <Route path="/" element={userData?<Home />:<Navigate to={"/signin"}/>} />
        //for below route no need to use owner data becasue we dont have shop so there in no owner slice in store.js
        <Route path="/create-edit-shop" element={userData?<CreateEditShop />:<Navigate to={"/signin"}/>} />
      </Routes>

      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
}

export default App;
