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
import EcoPacketBoxes from "./pages/ecoPacketBoxes/EcoPacketBoxes";
import EcoPacketBoxDetail from "./pages/ecoPacketBoxes/EcoPacketBoxDetail";
import {EcoPacketBoxCreate} from "./pages/ecoPacketBoxes/EcoPacketBoxCreate";
import EcoPacketBoxDelete from "./pages/ecoPacketBoxes/EcoPacketBoxDelete";
import PaymeList from "./pages/payme/PaymeList";


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
                        <Layout title="Monitoring">
                            <Packets/>
                        </Layout>
                    }
                />
                <Route
                    path="earnings/:earnerType"
                    element={
                        <Layout title="Ishlab topilgan pullar">
                            <Earnings/>
                        </Layout>
                    }
                />
                <Route
                    path="boxes"
                    element={
                        <Layout title="Eko packet yashiklar">
                            <EcoPacketBoxes/>
                        </Layout>
                    }
                />
                <Route
                    path="boxes/create"
                    element={
                        <Layout title="Eko packet yashik qo'shish">
                            <EcoPacketBoxCreate/>
                        </Layout>
                    }
                />
                <Route
                    path="boxes/:boxId"
                    element={
                        <Layout title="Eko packet yashik haqida barcha ma'lumotlar">
                            <EcoPacketBoxDetail/>
                        </Layout>
                    }
                />
                <Route
                    path="boxes/:boxId/delete"
                    element={
                        <Layout title="Eko packet yashik">
                            <EcoPacketBoxDelete/>
                        </Layout>
                    }
                />
                <Route
                    path="payme/:earnerType"
                    element={
                        <Layout title="pul so'rovlari">
                            <PaymeList/>
                        </Layout>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
