import "./navbar.scss"

import { useNavigate } from "react-router-dom";

import Badge from "@mui/material/Badge";
import Tooltip from '@mui/material/Tooltip';
import SearchIcon from "@mui/icons-material/Search";
// import TranslateIcon from "@mui/icons-material/Translate";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import LogoutIcon from '@mui/icons-material/Logout';
import { Button } from "@mui/material";

import { authServices } from "../../services/auth.services";
import { useEffect } from "react";

const Navbar = () => {
    const navigate = useNavigate();
    const admin = authServices.admin;

    useEffect(() => {
        if (!authServices.isAuthenticated()) {
            navigate("/login");
        }
    }, [navigate])

    const handleLogout = () => {
        authServices.logout();
        navigate("/login");
    }

    return (
        <div className="navbar">
            <div className="wrapper">
                <div className="search">
                    <input type="text" placeholder="Search..." />
                    <SearchIcon />
                </div>

                <div className="items">
                    {/* <div className="item">
                        <TranslateIcon className="icon" />
                        English
                    </div> */}
                    <div className="item">
                        <Badge badgeContent={4} color="primary">
                            <NotificationsNoneOutlinedIcon className="icon" />
                        </Badge>
                    </div>
                    <div className="item">
                        <div className="admin">
                            <div className="info">
                                <span className="name">{admin.firstName}</span>
                                <span className="phone_number">{admin.phoneNumber}</span>
                            </div>

                            <div className="logout">
                                <Tooltip title="Chiqish">
                                    <Button onClick={handleLogout} variant="outlined">
                                        <LogoutIcon />
                                    </Button>
                                </Tooltip>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar