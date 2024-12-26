import { Link, useNavigate } from "react-router-dom";
const Unauthorized = () => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);
  return (
    <section className="text-center bg-red-400 p-4 w-[75vw] sm:w-[55vw] md:w-[35vw] lg:w-[25vw] text-slate-100 border border-red-800 rounded-md">
      <h1 className="text-2xl text-center">Error 403: Unauthorized!</h1>
      <p className="text-xl">You are not allowed to access this resource!</p>
      <div className="flex mt-5 justify-around">
        <button
          onClick={goBack}
          className="border border-red-400 p-2 bg-red-300 rounded-md hover:bg-red-300 active:scale-95"
        >
          Go Back
        </button>
      </div>
    </section>
  );
};
export default Unauthorized;
