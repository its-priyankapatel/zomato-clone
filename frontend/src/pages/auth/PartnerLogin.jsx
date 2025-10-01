import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PartnerLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleClick = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/auth/food-partner/login",
        {
          email,
          password,
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
        <div className="h-[350px] w-[400px] bg-white rounded-sm flex justify-center items-center">
          <div className="h-[98%] w-[98%] flex flex-col items-center gap-4">
            <h1 className="text-xl font-semibold text-center text-blue-900">
              Partner Login
            </h1>
            <p className="text-md text-center">
              Access your dashboard and manage orders
            </p>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-3 h-[70%] w-[80%]"
            >
              <div className="flex flex-col gap-1">
                <label
                  htmlFor=""
                  className="text-sm font-semibold text-blue-900"
                >
                  EMAIL
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-200 border-none outline-none h-8 w-full rounded-sm"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor=""
                  className="text-sm font-semibold text-blue-900"
                >
                  PASSWORD
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-200 border-none outline-none h-8 w-full rounded-sm pl-3"
                />
              </div>
              <button
                onClick={handleClick}
                className="bg-blue-900 h-10 w-full cursor-pointer text-white"
              >
                Sign in
              </button>
              <p className="text-center">
                New partner?
                <span
                  className="text-blue-900 cursor-pointer"
                  onClick={() => navigate("/food-partner/register")}
                >
                  Create an account
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default PartnerLogin;
