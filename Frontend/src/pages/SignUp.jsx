import React from "react";
import { useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase.js";
import { toast } from "react-toastify";
function SignOut() {
  const primaryColor = "#ff4d2d";
  const hoverColor = "e64323";
  const bgColor = "#fff9f6";
  const borderColor = "#ddd";

  const [showpassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("user");
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [step,setStep]=useState(1)

  const handleSignUp = async () => {
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/signup`,
        {
          fullName,
          email,
          mobile,
          password,
          role,
        },
        { withCredentials: true },
      );
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  // Google Authentication
  const handleGoogleAuth=async ()=>{
    const provider=new GoogleAuthProvider()
    const result=await signInWithPopup(auth,provider)
    setFullName(result.user.displayName)
    setEmail(result.user.email)
    console.log(result)
    setStep(2)
  }
  
  const afterclickgoogle=async()=>{
    try {
      const {data}=await axios.post(`${serverUrl}/api/auth/google-auth`,{
        fullName,email,mobile,role
      },{withCredentials:true})
      console.log(data)
      toast.success("User Created Successfully")
      navigate("/signin")
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-4"
      style={{ backgroundColor: `${bgColor}` }}
    >
      {step == 1 &&
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
          create your account to get started with delicious food deliveries
        </p>

        {/* full name */}
        <div className="mb-4">
          <label
            htmlFor="fullName"
            className="block text-gray-700 font-medium mb-1"
          >
            FullName
          </label>
          <input
            type="text"
            className="w-full border rounded-lg px-3 py-2 focus:outline-orange-500"
            onChange={(e) => setFullName(e.target.value)}
            value={fullName}
            placeholder="Enter Your Fullname"
            style={{ border: `1px solid ${borderColor}` }}
          />
        </div>

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

        {/* mobile */}
        <div className="mb-4">
          <label
            htmlFor="mobile"
            className="block text-gray-700 font-medium mb-1"
          >
            Mobile
          </label>
          <input
            type="text"
            className="w-full border rounded-lg px-3 py-2 focus:outline-orange-500"
            onChange={(e) => setMobile(e.target.value)}
            value={mobile}
            placeholder="Enter Your Mobie Number"
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

        {/* role */}
        <div className="mb-4">
          <label
            htmlFor="role"
            className="block text-gray-700 font-medium mb-1"
          >
            Role
          </label>
          <div className="flex gap-2">
            {["user", "owner", "deliveryBoy"].map((r) => (
              <button
                className="cursor-pointer flex-1 border rounded-lg px-3 py-2 text-center font-medium transition-colors"
                onClick={() => setRole(r)}
                style={
                  role == r
                    ? { backgroundColor: primaryColor, color: "white" }
                    : { border: `1px solid ${borderColor}`, color: "#333" }
                }
              >
                {r}
              </button>
            ))}
          </div>
        </div>
        <button
          onClick={handleSignUp}
          className={`w-full font-semibold py-2 rounded-lg transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer`}
        >
          Sign Up
        </button>
        <p className="mt-4">
          <hr />
        </p>
        {/* google signup */}
        <button onClick={handleGoogleAuth} className="w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 border-gray-400 hover:bg-gray-100 cursor-pointer">
          <FcGoogle size={20} />
          <span>Sign Up with Google</span>
        </button>
        <p
          className="text-center mt-2 cursor-pointer"
          onClick={() => navigate("/signin")}
        >
          Already have an account ?{" "}
          <span className="text-[#ff4d2d]">SignIn</span>
        </p>
      </div>
      }
            {step == 2 &&
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


        {/* mobile */}
        <div className="mb-4">
          <label
            htmlFor="mobile"
            className="block text-gray-700 font-medium mb-1"
          >
            Mobile
          </label>
          <input
            type="text"
            className="w-full border rounded-lg px-3 py-2 focus:outline-orange-500"
            onChange={(e) => setMobile(e.target.value)}
            value={mobile}
            placeholder="Enter Your Mobie Number"
            style={{ border: `1px solid ${borderColor}` }}
          />
        </div>

        {/* role */}
        <div className="mb-4">
          <label
            htmlFor="role"
            className="block text-gray-700 font-medium mb-1"
          >
            Role
          </label>
          <div className="flex gap-2">
            {["user", "owner", "deliveryBoy"].map((r) => (
              <button
                className="cursor-pointer flex-1 border rounded-lg px-3 py-2 text-center font-medium transition-colors"
                onClick={() => setRole(r)}
                style={
                  role == r
                    ? { backgroundColor: primaryColor, color: "white" }
                    : { border: `1px solid ${borderColor}`, color: "#333" }
                }
              >
                {r}
              </button>
            ))}
          </div>
        </div>
        <button
          onClick={afterclickgoogle}
          className={`w-full font-semibold py-2 rounded-lg transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer`}
        >
          Sign Up
        </button>
      </div>
      }
    </div>
  );
}

export default SignOut;
