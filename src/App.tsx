import "./App.scss"

import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import Sidebar from "./components/sidebar/Sidebar"
import Navbar from "./components/navbar/Navbar"

import Home from "./pages/home/Home"
import Login from "./pages/login/Login";
import Users from "./pages/users/Users";
import UserDetail from "./pages/users/UserDetail";
import UserCreate from "./pages/users/UserCreate";

function App() {
    return (
        <div className="layout">
            <Sidebar />
            <div className="container">
                <Navbar />
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
        </div>
    );
}

export default App;
