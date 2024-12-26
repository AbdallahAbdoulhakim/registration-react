import { Outlet } from "react-router-dom";
const Layout = () => {
  return (
    <main className="h-screen w-screen bg-blue-400 flex items-center justify-center">
      <Outlet />
    </main>
  );
};
export default Layout;
