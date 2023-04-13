import "./App.scss"

import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import Home from "./pages/home/Home"
import Login from "./pages/login/Login";
import Users from "./pages/users/Users";
import Layout from "./components/Layout/Layout";
import Categories from "./pages/categories/Categories";
import QrCodeCreate from "./pages/qrcode/QrCodeCreate";
import UserBank from "./pages/bank/UserBank";
import Earnings from "./pages/earnings/Earnings";
import Packets from "./pages/packets/Packets";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="login" element={<Login/>}/>

                <Route
                    path="/"
                    element={
                        <Layout title="Bosh sahifa">
                            <Home/>
                        </Layout>
                    }
                />
                <Route
                    path="users"
                    element={
                        <Layout title="Foydalanuvchilar">
                            <Users/>
                        </Layout>
                    }
                />
                <Route
                    path="user-bank/:userId"
                    element={
                        <Layout title="Foydalanuvchi hisob kitoblari">
                            <UserBank/>
                        </Layout>
                    }
                />
                <Route
                    path="categories"
                    element={
                        <Layout title="Kategoriyalar">
                            <Categories/>
                        </Layout>
                    }
                />
                <Route
                    path="qrcode"
                    element={
                        <Layout title="Qr Kodlar">
                            <QrCodeCreate/>
                        </Layout>
                    }
                />
                <Route
                    path="packets"
                    element={
                        <Layout title="Paketlar">
                            <Packets/>
                        </Layout>
                    }
                />
                <Route
                    path="earnings"
                    element={
                        <Layout title="Ishlab topilgan pullar">
                            <Earnings/>
                        </Layout>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
