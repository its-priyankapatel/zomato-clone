import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PartnerRegister = () => {
  const [businessName, setBusinessName] = useState("");
  const [contactName, setContactName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleClick = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/auth/food-partner/register",
        {
          businessName,
          contactName,
          phone,
          email,
          password,
          address,
        },
        { withCredentials: true }
      );
      console.log(data);
      navigate("/create-food");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="h-screen w-full flex justify-center items-center bg-gray-300">
        <div className="h-[500px] w-[450px] bg-white rounded-sm flex flex-col items-center gap-3">
          <h1 className="text-xl font-semibold text-center text-blue-900">
            Partner Sign up
          </h1>
          <p className="text-md text-center">
            Grow your business with our platform
          </p>
          <form
            action="submit"
            onSubmit={handleSubmit}
            className="flex flex-col gap-3"
          >
            <div className="flex flex-col gap-1">
              <label htmlFor="" className="text-sm font-semibold text-blue-900">
                BUSINESS NAME
              </label>
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="bg-gray-200 h-8 outline-none border-none rounded-sm"
              />
            </div>
            <div className="flex gap-3">
              <div className="flex flex-col gap-1">
                <label
                  htmlFor=""
                  className="text-sm font-semibold text-blue-900"
                >
                  CONTACT NAME
                </label>
                <input
                  type="text"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="bg-gray-200 h-8 outline-none border-none rounded-sm"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor=""
                  className="text-sm font-semibold text-blue-900"
                >
                  PHONE
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="bg-gray-200 border-none outline-none h-8 rounded-sm pl-3"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <label htmlFor="" className="text-sm font-semibold text-blue-900">
                EMAIL
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-200 border-none outline-none h-8 w-full rounded-sm pl-3"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="" className="text-sm font-semibold text-blue-900">
                PASSWORD
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-200 border-none outline-none h-8 w-full rounded-sm pl-3"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="" className="text-sm font-semibold text-blue-900">
                ADDRESS
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="bg-gray-200 border-none outline-none h-8 w-full rounded-sm pl-3"
              />
            </div>
            <button
              onClick={handleClick}
              className="bg-blue-900 h-10 w-full cursor-pointer text-white"
            >
              Create Partner Account
            </button>
            <p className="text-center">
              Already a partner?{" "}
              <span
                className="text-blue-900 cursor-pointer"
                onClick={() => navigate("/food-partner/login")}
              >
                Sign in
              </span>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default PartnerRegister;
