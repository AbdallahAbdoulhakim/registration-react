import { useEffect, useRef, useState } from "react";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";
import useInput from "../hooks/useInput";
import useToggle from "../hooks/useToggle";

import { Link, useNavigate, useLocation } from "react-router-dom";

import useLocalStorage from "../hooks/useLocalStorage";

const LOGIN_URL = "/user/login";

const Login = () => {
  const { setAuth } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";

  const userRef = useRef();
  const errRef = useRef();

  const [user, resetUser, userAttribs] = useInput("user", "");

  const [pwd, setPWd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const [check, toggleCheck] = useToggle("persist", false);

  useEffect(() => {
    userRef?.current?.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [pwd, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(LOGIN_URL, {
        username: user,
        password: pwd,
      });

      const { accessToken, role } = response?.data?.data;

      setAuth({ user, role, accessToken });
      resetUser();
      setPWd("");

      navigate(from, { replace: true });
    } catch (error) {
      if (!error?.message) {
        setErrMsg("No server Response");
      } else if (error.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (error.response?.status === 401) {
        setErrMsg("Unauthorized! Invalid credentials!");
      } else {
        setErrMsg("Something went wrong! Login Failed!");
      }
      errRef.current.focus();
    }
  };
  return (
    <section className="bg-blue-700 p-4 w-[75vw] sm:w-[55vw] md:w-[35vw] lg:w-[25vw] text-slate-100 border border-blue-800 rounded-md">
      <h1 className="text-center text-2xl">Login</h1>

      <p
        ref={errRef}
        aria-live="assertive"
        className={
          errMsg
            ? "my-2 border border-red-400 bg-red-300 rounded-md p-1"
            : "hidden"
        }
      >
        {errMsg}
      </p>

      <form className="flex flex-col" onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-2">
          <label htmlFor="username">Username:</label>
          <input
            ref={userRef}
            className="p-1 border border-blue-500 rounded-md text-slate-600 focus:outline-blue-700"
            type="text"
            name="username"
            id="username"
            {...userAttribs}
            required
          />
        </div>
        <div className="flex flex-col space-y-2 mt-2">
          <label htmlFor="password">Password:</label>
          <input
            className="p-1 border border-blue-500 rounded-md text-slate-600 focus:outline-blue-700"
            type="password"
            name="password"
            id="password"
            value={pwd}
            onChange={(e) => setPWd(e.target.value)}
            required
          />
        </div>
        <button
          disabled={!pwd || !user}
          className="mt-4 border border-slate-600 p-1 bg-slate-300 rounded-md text-slate-600 hover:bg-slate-400 hover:text-slate-500 active:scale-[99%] disabled:opacity-60 disabled:scale-100 disabled:bg-slate-300 disabled:text-slate-600"
        >
          Sign In
        </button>
        <div className="mt-2 flex space-x-3">
          <input
            id="persist"
            checked={check}
            onChange={toggleCheck}
            type="checkbox"
          />
          <label htmlFor="persist">Trust this device</label>
        </div>
      </form>

      <p className="mt-4">Need an Account ?</p>
      <Link to="/register">Sign Up</Link>
    </section>
  );
};
export default Login;
0;
