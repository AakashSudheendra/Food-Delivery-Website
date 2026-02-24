import React from "react";
import { useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";
function SignIn() {
  const primaryColor = "#ff4d2d";
  const hoverColor = "e64323";
  const bgColor = "#fff9f6";
  const borderColor = "#ddd";

  const [showpassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/signin`,
        {
          email,
          password,
        },
        { withCredentials: true },
      );
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-4"
      style={{ backgroundColor: `${bgColor}` }}
    >
      <div
        className={`bg-white rounded-xl shadow-lg w-full max-w-md p-8`}
        style={{ border: `1px solid ${borderColor}` }}
      >
        <h1
          className={`text-3xl font-bold mb-2`}
          style={{ color: `${primaryColor}` }}
        >
          Gmax
        </h1>
        <p className="text-gray-600 mb-8">
          Login to your account to get started with delicious food deliveries
        </p>

        {/* email */}
        <div className="mb-4">
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

        {/* password */}
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 font-medium mb-1"
          >
            Password
          </label>
          <div className="relative">
            <input
              type={`${showpassword ? "text" : "password"}`}
              className="w-full border rounded-lg px-3 py-2 focus:outline-orange-500"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="Enter Your Password"
              style={{ border: `1px solid ${borderColor}` }}
            />
            <button
              className="cursor-pointer absolute right-3 top-2.75 text-gray-500 text-xl"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {!showpassword ? <FaRegEye /> : <FaRegEyeSlash />}
            </button>
          </div>
        </div>
        <div
          className="text-right mb-4 text-[#ff4d2d] font-medium"
          onClick={() => navigate("forgot-password")}
        >
          Forgot Password?
        </div>

        <button
          onClick={handleSignIn}
          className={`w-full font-semibold py-2 rounded-lg transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer`}
        >
          Sign In
        </button>
        <p className="mt-4">
          <hr />
        </p>
        {/* google signup */}
        <button className="w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 border-gray-400 hover:bg-gray-100 cursor-pointer">
          <FcGoogle size={20} />
          <span>Sign In with Google</span>
        </button>
        <p
          className="text-center mt-2 cursor-pointer"
          onClick={() => navigate("/signup")}
        >
          Want To Create An Account ?{" "}
          <span className="text-[#ff4d2d]">SignUp</span>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
