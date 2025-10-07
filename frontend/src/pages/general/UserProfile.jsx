import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState("");
  const [open, setOpen] = useState(false);
  const logoutRef = useRef(null);
  const navigate = useNavigate();

  const handleClickOutside = (e) => {
    if (logoutRef.current && !logoutRef.current.contains(e.target)) {
      setOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.addEventListener("mousedown", handleClickOutside);
    };
  };
  useEffect(() => {
    handleClickOutside();
  }, []);

  const handleUserProfile = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:3000/api/auth/get/user",
        { withCredentials: true }
      );
      console.log(data.isUserExist);
      setUserProfile(data.isUserExist);
    } catch (error) {
      console.log("Error in fetch user profile data");
    }
  };
  useEffect(() => {
    handleUserProfile();
  }, []);

  const handleUserLogOut = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:3000/api/auth/user/logout",
        { withCredentials: true }
      );
      console.log(data);
      navigate("/user/login");
    } catch (error) {
      console.log("Error in user Logout");
    }
  };
  return (
    <>
      <div className="bg-gray-100 h-screen w-full">
        <div className="bg-gray-200 w-full h-40 flex justify-center items-center border-b-2 border-blue-950">
          <div className="w-[99%] h-[98%] flex justify-between">
            <div className="flex w-1/2 items-center gap-10">
              <div className="h-32 w-32 bg-blue-950 rounded-full flex justify-center items-center overflow-hidden">
                <img
                  src={userProfile.image}
                  alt="profile.jsx"
                  className="h-30 w-30 rounded-full"
                />
              </div>
              <div className="flex flex-col justify-center gap-3">
                <p className="text-xl text-blue-950 font-sans">
                  {userProfile.fullName}
                </p>
                <p className="text-sm text-blue-950">{userProfile.email}</p>
              </div>
            </div>
            <div className="flex flex-col relative group">
              <BsThreeDotsVertical
                onClick={() => setOpen(!open)}
                className="text-xl text-blue-950 cursor-pointer"
              />
              {open && (
                <div
                  ref={logoutRef}
                  className="h-10 w-20 bg-blue-950 absolute top-6 right-4 rounded-lg flex justify-center items-center cursor-pointer"
                >
                  <p className="text-white" onClick={handleUserLogOut}>
                    Logout
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
