import Users from "./Users";

const Admin = () => {
  return (
    <section className="text-center bg-blue-400 p-4 w-[75vw] sm:w-[55vw] md:w-[35vw] lg:w-[25vw] text-slate-100 border border-blue-800 rounded-md">
      <h1 className="text-2xl text-center">Admin</h1>
      <p className="text-xl">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Neque, aut!
      </p>

      <Users />
    </section>
  );
};
export default Admin;
