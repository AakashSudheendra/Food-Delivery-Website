import React, { useEffect, useState } from "react";
import { IoArrowBackCircle } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../App";
import { toast } from "react-toastify";
import axios from "axios";

function ForgotPassword() {
  const primaryColor = "#ff4d2d";
  const hoverColor = "e64323";
  const bgColor = "#fff9f6";
  const borderColor = "#ddd";

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/send-otp`,
        { email },
        { withCredentials: true },
      );
      if (result.data.success) {
        toast.success("OTP Sent Successfully");
        console.log(result);
        setStep(2);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleVerifyOtp = async () => {
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/verify-otp`,
        { email, otp },
        { withCredentials: true },
      );
      if (result.data.success) {
        toast.success("OTP Verified Successfully");
        console.log(result);
        setStep(3);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleResetPassword = async () => {
    try {
      if (newpassword != confirmPassword) {
        return null;
      }
      const result = await axios.post(
        `${serverUrl}/api/auth/reset-password`,
        { email, newpassword },
        { withCredentials: true },
      );
      if (result.data.success) {
        toast.success("Password Reset Successfully");
        console.log(result);
        navigate("/signin");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(()=>{

  // },[])

  return (
    <div className="flex w-full items-center justify-center min-h-screen p-4 bg-[#fff9f6]">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8">
        <div className="flex items-center gap-4 mb-4">
          <IoArrowBackCircle
            onClick={() => navigate("/signin")}
            size={25}
            className="text-[#ff4d2d] cursor-pointer"
          />
          <h1 className="text-xl font-bold text-center text-[#ff4d2d]">
            Reset Password
          </h1>
        </div>

        {/* --now steps */}
        {step == 1 && (
          <div>
            {/* email */}
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-1"
              >
                Email
              </label>
              <input
                type="email"
                className="w-full border rounded-lg px-3 py-2 focus:outline-orange-500"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder="Enter Your email"
                style={{ border: `1px solid ${borderColor}` }}
              />
            </div>
            <button
              onClick={handleSendOtp}
              className={`w-full font-semibold py-2 rounded-lg transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer`}
            >
              Send Otp
            </button>
          </div>
        )}
        {step == 2 && (
          <div>
            {/* email */}
            <div className="mb-6">
              <label
                htmlFor="otp"
                className="block text-gray-700 font-medium mb-1"
              >
                OTP
              </label>
              <input
                type="text"
                className="w-full border rounded-lg px-3 py-2 focus:outline-orange-500"
                onChange={(e) => setOtp(e.target.value)}
                value={otp}
                placeholder="Enter Otp"
                style={{ border: `1px solid ${borderColor}` }}
              />
            </div>
            <button
              onClick={handleVerifyOtp}
              className={`w-full font-semibold py-2 rounded-lg transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer`}
            >
              Verify
            </button>
          </div>
        )}
        {step == 3 && (
          <div>
            {/* email */}
            <div className="mb-2">
              <label
                htmlFor="newpassword"
                className="block text-gray-700 font-medium mb-1"
              >
                New Password
              </label>
              <input
                type="password"
                className="w-full border rounded-lg px-3 py-2 focus:outline-orange-500"
                onChange={(e) => setNewPassword(e.target.value)}
                value={newpassword}
                placeholder="Enter New Password"
                style={{ border: `1px solid ${borderColor}` }}
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="confirmPassword"
                className="block text-gray-700 font-medium mb-1"
              >
                Confirm Password
              </label>
              <input
                type="password"
                className="w-full border rounded-lg px-3 py-2 focus:outline-orange-500"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                placeholder="Enter password again to confirm"
                style={{ border: `1px solid ${borderColor}` }}
              />
            </div>
            <button
              onClick={handleResetPassword}
              className={`w-full font-semibold py-2 rounded-lg transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer`}
            >
              Reset Password
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;
