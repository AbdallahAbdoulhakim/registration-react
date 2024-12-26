import { Link } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import useAuth from "../hooks/useAuth";

const Home = () => {
  const { auth } = useAuth();
  const logout = useLogout();

  const handleLogout = async (e) => {
    e.preventDefault();
    await logout();
    window.location.reload();
  };

  return (
    <section className="bg-blue-700 p-4 w-[75vw] sm:w-[55vw] md:w-[35vw] lg:w-[25vw] text-slate-100 border border-blue-800 rounded-md">
      <h1 className="text-2xl text-center mb-5">Welcome to the App</h1>
      <div className="flex flex-col space-y-5">
        {!auth?.user && (
          <div className="flex mt-5 justify-around">
            <Link
              className="border border-blue-500 p-2 bg-blue-600 rounded-md hover:bg-blue-300 active:scale-95"
              to="/register"
            >
              Register
            </Link>
            <Link
              className="border border-blue-500 p-2 bg-blue-600 rounded-md hover:bg-blue-300 active:scale-95"
              to="/login"
            >
              Log In
            </Link>
          </div>
        )}
        <div className="flex flex-col space-y-5">
          <Link
            className="border rounded-md hover:bg-blue-500 border-blue-300 bg-blue-200 active:scale-95"
            to="editor"
          >
            Go to the Editor page
          </Link>
          <Link
            className="border rounded-md hover:bg-blue-500 border-blue-300 bg-blue-200 active:scale-95"
            to="admin"
          >
            Go to the Admin page
          </Link>
          <Link
            className="border rounded-md hover:bg-blue-500 border-blue-300 bg-blue-200 active:scale-95"
            to="lounge"
          >
            Go to the Lounge page
          </Link>
          <Link
            className="border rounded-md hover:bg-blue-500 border-blue-300 bg-blue-200 active:scale-95"
            to="linkpage"
          >
            Go to the link page
          </Link>
        </div>
        {auth.user && (
          <div className="flex flex-col text-center space-y-5">
            <button
              onClick={handleLogout}
              className="border rounded-md hover:bg-blue-500 border-blue-300 bg-blue-200 active:scale-95"
            >
              Log Out
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
export default Home;
