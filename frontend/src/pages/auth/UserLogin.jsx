import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleClick = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/auth/user/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      setEmail("");
      setPassword("");

      navigate("/");
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
              Welcome back
            </h1>
            <p className="text-md text-center">
              Sign in to continue your food journey
            </p>
            <form
              action="submit"
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
                  className="bg-gray-200 border-none outline-none h-8 w-full rounded-sm pl-3"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                className="bg-blue-900 h-10 w-full cursor-pointer text-white"
                onClick={handleClick}
              >
                Sign in
              </button>
              <p className="text-center">
                Already have a account?{" "}
                <span
                  className="text-blue-900 cursor-pointer"
                  onClick={() => navigate("/user/register")}
                >
                  Sign up
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserLogin;
