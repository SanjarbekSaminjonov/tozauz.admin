import "./App.scss"

import React from "react";

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

function Layout({children}: { children: React.ReactNode }) {
    return (
        <div className="layout">
            <Sidebar/>
            <div className="container">
                <Navbar/>
                {children}
            </div>
        </div>
    );
}


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/">
                    <Route path="login" element={<Login/>}/>
                    <Route index element={<Layout><Home/></Layout>}/>
                    <Route path="users" element={<Layout><Users/></Layout>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
