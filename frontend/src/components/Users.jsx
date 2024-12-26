import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Loading from "./Loading";
import { useNavigate, useLocation } from "react-router-dom";

import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const GET_USERS_URL = "/user/all";

const Users = () => {
  const [users, setUsers] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [errMsg, setErrMsg] = useState("");
  const axiosPrivate = useAxiosPrivate();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get(GET_USERS_URL, {
          signal: controller.signal,
        });

        isMounted && setUsers(response.data.data);
        setErrMsg("");
      } catch (error) {
        if (error.name === "CanceledError") {
          return;
        }

        navigate("/login", { state: { from: location }, replace: true });
      } finally {
        setIsLoading(false);
      }
    };

    getUsers();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [axiosPrivate, location, navigate]);
  return (
    <div className="flex flex-col justify-center items-center">
      {isLoading ? (
        <Loading />
      ) : (
        <article className="text-center mt-2 font-monserrat bg-blue-300 p-4 w-full text-slate-100 border border-blue-800 rounded-md">
          <h2 className="text-2xl text-center">Users List</h2>
          {errMsg ? (
            <p className="text-red-500">
              <FontAwesomeIcon icon={faExclamationTriangle} /> {errMsg}
            </p>
          ) : !users?.length ? (
            <p className="text-yellow-200">
              <FontAwesomeIcon icon={faExclamationTriangle} /> No users to
              display!
            </p>
          ) : (
            <ul className="flex flex-col justify-around space-y-2">
              {users.map((user, index) => (
                <li
                  className="flex flex-col justify-around space-x-2 border border-slate-200 p-1 rounded-md"
                  key={index}
                >
                  <p>username : {user?.username}</p>
                  <p>email : {user?.email}</p>
                  <p>role : {user?.role}</p>
                </li>
              ))}
            </ul>
          )}
        </article>
      )}
    </div>
  );
};
export default Users;
