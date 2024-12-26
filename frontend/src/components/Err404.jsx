import { Link } from "react-router-dom";
const Err404 = () => {
  return (
    <section className="text-center bg-red-400 p-4 w-[75vw] sm:w-[55vw] md:w-[35vw] lg:w-[25vw] text-slate-100 border border-red-800 rounded-md">
      <h1 className="text-2xl text-center">Error 404: Not Found!</h1>
      <p className="text-xl">The request resource does not exist</p>
      <div className="flex mt-5 justify-around">
        <Link
          className="border border-red-400 p-2 bg-red-300 rounded-md hover:bg-red-300 active:scale-95"
          to="/"
        >
          Return Home
        </Link>
      </div>
    </section>
  );
};
export default Err404;
