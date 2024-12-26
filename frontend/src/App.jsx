import Editor from "./components/Editor";
import Admin from "./components/Admin";
import Lounge from "./components/Lounge";
import LinkPage from "./components/LinkPage";
import Err404 from "./components/Err404";
import Unauthorized from "./components/Unauthorized";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import RequireAuth from "./components/RequireAuth";

import PersistLogin from "./components/PersistLogin";

import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<Err404 />} />
        <Route path="/" element={<Home />} />

        <Route element={<PersistLogin />}>
          <Route
            element={<RequireAuth allowedRoles={["user", "editor", "admin"]} />}
          >
            <Route path="linkpage" element={<LinkPage />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={["editor", "admin"]} />}>
            <Route path="editor" element={<Editor />} />
            <Route path="lounge" element={<Lounge />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={["admin"]} />}>
            <Route path="admin" element={<Admin />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};
export default App;
