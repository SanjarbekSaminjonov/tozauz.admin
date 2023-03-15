import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Home from "./pages/home/Home"
import Login from "./pages/login/Login";
import Users from "./pages/users/Users";
import UserDetail from "./pages/users/UserDetail";
import UserCreate from "./pages/users/UserCreate";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="users">
              <Route index element={<Users />} />
              <Route path="new" element={<UserCreate />} />
              <Route path=":userId" element={<UserDetail />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
