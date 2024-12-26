import { useState, useRef, useEffect } from "react";

import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import axios from "../api/axios";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,23}$/;
const EMAIL_REGEX =
  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

const Register = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(user);
    setValidName(result);
  }, [user]);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    setValidPwd(result);

    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    const v3 = PWD_REGEX.test(pwd);

    if (!v1 || !v2 || !v3 || pwd !== matchPwd) {
      setErrMsg("Invalid Entry");
      return;
    }

    (async () => {
      try {
        await axios.post("/user/register", {
          username: user,
          email,
          password: pwd,
        });

        setSuccess(true);
      } catch (error) {
        console.log(error);
        setErrMsg(error?.message);
        return;
      }
    })();
  };

  return (
    <>
      {success ? (
        <section className="w-[75vw] sm:w-[55vw] md:w-[35vw] lg:w-[25vw] bg-green-700 p-4 text-slate-100 border border-green-800 rounded-md flex flex-col">
          <h1>Success</h1>
          <p>
            <a href="/login">Sign In</a>
          </p>
        </section>
      ) : (
        <section className="bg-blue-700 p-4 w-[75vw] sm:w-[55vw] md:w-[35vw] lg:w-[25vw] text-slate-100 border border-blue-800 rounded-md">
          <p
            ref={errRef}
            className={`bg-red-400 z-10 opacity-80 p-2 rounded-md ${
              !errMsg && "hidden"
            }`}
            aria-live="assertive"
          >
            {errMsg}
          </p>

          <form className=" flex flex-col" onSubmit={handleSubmit}>
            <h4 className="text-2xl mb-5">Register</h4>
            <div className="flex flex-col mb-5">
              <label htmlFor="username">
                Username:
                <span className={validName ? "text-green-600 ml-2" : "hidden"}>
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <span
                  className={
                    validName || !user ? "hidden" : "text-red-600 ml-2"
                  }
                >
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              </label>
              <input
                ref={userRef}
                value={user}
                autoComplete="off"
                required
                aria-invalid={validName ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
                onChange={(e) => setUser(e.target.value)}
                className="rounded-md p-1 text-slate-600 focus:outline-blue-500"
                type="text"
                name="username"
                id="username"
              />
              <p
                id="uidnote"
                className={
                  userFocus && user && !validName
                    ? "border mt-4 p-2 border-blue-300 bg-slate-200 text-slate-500 rounded-md"
                    : "hidden"
                }
              >
                <FontAwesomeIcon
                  className="text-blue-600 mr-2"
                  icon={faInfoCircle}
                />
                4 to 24 characters. <br />
                Must begin with a letter. <br />
                Letters, numbers, underscores, hypens allowed.
              </p>
            </div>
            <div className="flex flex-col mb-5">
              <label htmlFor="email">
                Email:
                <span className={validEmail ? "text-green-600 ml-2" : "hidden"}>
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <span
                  className={
                    validEmail || !email ? "hidden" : "text-red-600 ml-2"
                  }
                >
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              </label>
              <input
                value={email}
                autoComplete="off"
                required
                aria-invalid={validName ? "false" : "true"}
                aria-describedby="emailnote"
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-md p-1 text-slate-600 focus:outline-blue-500"
                type="text"
                name="email"
                id="email"
              />
              <p
                id="emailnote"
                className={
                  emailFocus && email && !validEmail
                    ? "border mt-4 p-2 border-blue-300 bg-slate-200 text-slate-500 rounded-md"
                    : "hidden"
                }
              >
                <FontAwesomeIcon
                  className="text-blue-600 mr-2"
                  icon={faInfoCircle}
                />
                Must be a valid email address.
              </p>
            </div>

            <div className="flex flex-col mb-5">
              <label htmlFor="password">
                Password:
                <span className={validPwd ? "text-green-600 ml-2" : "hidden"}>
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <span
                  className={validPwd || !pwd ? "hidden" : "text-red-600 ml-2"}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              </label>
              <input
                value={pwd}
                aria-invalid={validPwd ? "false" : "true"}
                aria-describedby="pwdnote"
                autoComplete="off"
                required
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}
                onChange={(e) => setPwd(e.target.value)}
                className="rounded-md p-1 text-slate-600 focus:outline-blue-500"
                type="password"
                name="password"
                id="password"
              />
              <p
                id="pwdnote"
                className={
                  pwdFocus && pwd && !validPwd
                    ? "border mt-4 p-2 border-blue-300 bg-slate-200 text-slate-500 rounded-md"
                    : "hidden"
                }
              >
                <FontAwesomeIcon
                  className="text-blue-600 mr-2"
                  icon={faInfoCircle}
                />
                8 to 24 characters. <br />
                Must include uppercase and lowercase letters, a number and a
                special character. <br />
                Allowed special characters :{" "}
                <span aria-label="exclamation mark">!</span>
                <span aria-label="at symbol">@</span>
                <span aria-label="hashtag">#</span>
                <span aria-label="dollar sign">$</span>
                <span aria-label="percent">%</span>
              </p>
            </div>
            <div className="flex flex-col mb-5">
              <label htmlFor="confirm-pwd">
                Confirm Password:{" "}
                <span
                  className={
                    validMatch && matchPwd ? "text-green-600 ml-2" : "hidden"
                  }
                >
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <span
                  className={
                    validMatch || !matchPwd ? "hidden" : "text-red-600 ml-2"
                  }
                >
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              </label>
              <input
                value={matchPwd}
                onChange={(e) => setMatchPwd(e.target.value)}
                className="rounded-md p-1 text-slate-600 focus:outline-blue-500"
                aria-invalid={validMatch ? "false" : "true"}
                aria-describedby="confirmnote"
                required
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
                type="password"
                name="confirm-pwd"
                id="confirm-pwd"
              />
              <p
                id="confirmnote"
                className={
                  matchFocus && matchPwd && !validMatch
                    ? "border mt-4 p-2 border-blue-300 bg-slate-200 text-slate-500 rounded-md"
                    : "hidden"
                }
              >
                <FontAwesomeIcon
                  className="text-blue-600 mr-2"
                  icon={faInfoCircle}
                />
                Must match the first password input field.
              </p>
            </div>
            <button
              disabled={
                !validName || !validPwd || !validMatch || !validEmail
                  ? true
                  : false
              }
              className="mb-5 bg-slate-200 hover:bg-slate-300 active:scale-95 text p-1 rounded-md text-slate-700 disabled:scale-100 disabled:bg-slate-400 disabled:opacity-40"
            >
              Sign Up
            </button>
            <p>Already registered ?</p>
            <a className="underline  hover:text-slate-300" href="/login">
              Sign In
            </a>
          </form>
        </section>
      )}
    </>
  );
};
export default Register;
