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
import QrCode from "./pages/qrcode/QrCode";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="login" element={<Login />} />

                <Route
                    path="/"
                    element={
                        <Layout title="Bosh sahifa">
                            <Home />
                        </Layout>
                    }
                />
                <Route
                    path="users"
                    element={
                        <Layout title="Foydalanuvchilar">
                            <Users />
                        </Layout>
                    }
                />
                <Route
                    path="categories"
                    element={
                        <Layout title="Kategoriyalar">
                            <Categories />
                        </Layout>
                    }
                />
                <Route
                    path="qrcode"
                    element={
                        <Layout title="Qr Kodlar">
                            <QrCode />
                        </Layout>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
