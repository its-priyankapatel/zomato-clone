import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const userRegister = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleClick = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/auth/user/register",
        {
          fullName: firstName + " " + lastName,
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      setFirstName("");
      setLastName("");
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
        <div className="h-[400px] w-[450px] bg-white rounded-sm flex justify-center items-center ">
          <div className="h-[380px] w-[420px] flex flex-col items-center gap-4">
            <h1 className="text-xl font-semibold text-center text-blue-900">
              Create your account
            </h1>
            <p className="text-md text-center">
              Join to explore and enjoy delicious meals
            </p>
            <form
              action="submit"
              onSubmit={handleSubmit}
              className="flex flex-col gap-2"
            >
              <div className="flex gap-3">
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor=""
                    className="text-sm font-semibold text-blue-900"
                  >
                    FIRST NAME
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    className="bg-gray-200 h-8 outline-none border-none rounded-sm"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor=""
                    className="text-sm font-semibold text-blue-900"
                  >
                    LAST NAME
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    className="bg-gray-200 border-none outline-none h-8 rounded-sm pl-3"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor=""
                  className="text-sm font-semibold text-blue-900"
                >
                  EMAIL
                </label>
                <input
                  type="email"
                  value={email}
                  className="bg-gray-200 border-none outline-none h-8 w-full rounded-sm pl-3"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
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
                Sign Up
              </button>
              <p className="text-center">
                Already have a account?{" "}
                <span
                  className="text-blue-900 cursor-pointer hover:border-b-2"
                  onClick={() => navigate("/user/login")}
                >
                  Sign in
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default userRegister;
