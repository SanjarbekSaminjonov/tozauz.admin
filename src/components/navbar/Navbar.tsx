import "./navbar.scss"
import SearchIcon from "@mui/icons-material/Search";
import TranslateIcon from "@mui/icons-material/Translate";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";

import FullscreenOutlinedIcon from "@mui/icons-material/FullscreenOutlined";
// import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";

import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
// import import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";

const Navbar = () => {
    return (
        <div className="navbar">
            <div className="wrapper">
                <div className="search">
                    <input type="text" placeholder="Search..." />
                    <SearchIcon />
                </div>

                <div className="items">
                    <div className="item">
                        <TranslateIcon className="icon" />
                        English
                    </div>
                    <div className="item">
                        <NotificationsNoneOutlinedIcon className="icon" />
                        <div className="counter">9+</div>
                    </div>
                    <div className="item">
                        <FullscreenOutlinedIcon className="icon" />
                    </div>
                    <div className="item">
                        <DarkModeOutlinedIcon className="icon" />
                    </div>
                    <div className="item">
                        <img className="avatar" src="https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg" alt="Avatar" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar