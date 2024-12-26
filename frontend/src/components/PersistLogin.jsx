import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useLocalStorage from "../hooks/useLocalStorage";
import useAuth from "../hooks/useAuth";
import Loading from "./Loading";

const PersistLogin = () => {
  let isMounted = true;
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();

  const { auth } = useAuth();
  const [persist] = useLocalStorage("persist", false);

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);

    return () => {
      isMounted = false;
    };
  }, [auth?.accessToken, refresh]);

  return <>{!persist ? <Outlet /> : isLoading ? <Loading /> : <Outlet />}</>;
};
export default PersistLogin;
