import axios from "../api/axios";

import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get("/user/refresh");

    setAuth((prev) => {
      return {
        ...prev,
        user: response.data.data.user,
        role: response.data.data.role,
        accessToken: response.data.data.accessToken,
      };
    });

    return response.data.data.accessToken;
  };
  return refresh;
};
export default useRefreshToken;
