import React from "react";
import { TiArrowBack } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import { FaUtensils } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { setMyShopData } from "../redux/ownerSlice";
import axios from "axios";
import { serverUrl } from "../App";

function CreateEditShop() {
  const navigate = useNavigate();
  const { myShopData } = useSelector((state) => state.owner);
  const { city, state, address } = useSelector((state) => state.user);
  const dispatch=useDispatch()

  const [name, set1Name] = useState(myShopData?.name || "");
  const [Address, set1Address] = useState(myShopData?.address || address);
  const [City, set1City] = useState(myShopData?.city || city);
  const [State, set1State] = useState(myShopData?.state || state);
  const [frontendImage, setFrontendImage] = useState(myShopData?.image || null);
  const [backendImage, setBackendImage] = useState(null);

  const handleImage = (e) => {
    const file = e.target.files[0];
    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  };
  //backend handler sending data to backend
  const handleSubmit=async (e)=>{
    e.preventDefault()
    try {
        const formData=new FormData()
        formData.append("name",name)
        formData.append("city",City)
        formData.append("state",State)
        formData.append("address",Address)
        if(backendImage){
          formData.append("image",backendImage)
        }
        const result=await axios.post(`${serverUrl}/api/shop/create-edit`,formData,{withCredentials:true})
        //after send to store.js for fetching we need to use dispatch
        dispatch(setMyShopData(result.data))
        console.log(result.data)
    } catch (error) {
        console.log(error)
    }
  }


  return (
    <div className="flex justify-center flex-col items-center p-6 bg-gradient-to-br from-orange-50 relative to-white min-h-screen">
      <div
        onClick={() => navigate("/")}
        className="absolute top-[20px] left-[20px] z=[10] mb-[10px]"
      >
        <TiArrowBack size={35} className="text-[#ff4d2d]" />
      </div>
      {/* //formstarts here */}
      <div className="max-w-lg w-full bg-white shadow-xl rounded-2xl p-8 border border-orange-100">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-orange-100 p-4 rounded-full mb-4">
            <FaUtensils className="text-[#ff4d2d] w-16 h-16" />
          </div>

          <div className="text-3xl font-extrabold text-gray-900">
            {myShopData ? "Edit Shop" : "Add Shop"}
          </div>
        </div>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => set1Name(e.target.value)}
              placeholder="Enter Shop Name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          {/* file uplaod */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ShopImage
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            {frontendImage && (
              <div className="mt-4">
                <img
                  src={frontendImage}
                  className="w-full h-48 object-cover rounded-lg border-2 border-amber-600"
                  alt=""
                />
              </div>
            )}
          </div>
          {/* state and city */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                State
              </label>
              <input
                type="text"
                value={State}
                onChange={(e) => set1State(e.target.value)}
                placeholder="State"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <input
                type="text"
                value={City}
                onChange={(e) => set1City(e.target.value)}
                placeholder="City"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>
          {/* shop address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Shop Address
            </label>
            <input
              type="text"
              value={Address}
              onChange={(e) => set1Address(e.target.value)}
              placeholder="Enter Shop Address"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <button className="w-full bg-[#ff4d2d] text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-orange-600 hover:shadow-lg transition-all duration-200 cursor-pointer">
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateEditShop;
