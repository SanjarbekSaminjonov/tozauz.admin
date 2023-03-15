import "./sidebar.scss"
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import CategoryIcon from "@mui/icons-material/Category";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import LogoutIcon from "@mui/icons-material/Logout";

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="top">
                <span className="logo">TozaUz</span>
            </div>

            <hr />

            <div className="center">
                <p className="title">Main</p>
                <ul>
                    <li>
                        <DashboardIcon className="icon" />
                        <span>Dashboard</span>
                    </li>
                    <li>
                        <AdminPanelSettingsIcon className="icon" />
                        <span>Settings</span>
                    </li>
                    <li>
                        <PeopleIcon className="icon" />
                        <span>Users</span>
                    </li>
                </ul>
                <p className="title">Services</p>
                <ul>
                    <li>
                        <CategoryIcon className="icon" />
                        <span>Categories</span>
                    </li>
                    <li>
                        <CreditCardIcon className="icon" />
                        <span>Orders</span>
                    </li>
                </ul>
                <p className="title">User</p>
                <ul>
                    <li>
                        <PeopleIcon className="icon" />
                        <span>Users</span>
                    </li>
                    <li>
                        <AdminPanelSettingsIcon className="icon" />
                        <span>Settings</span>
                    </li>
                    <li>
                        <LogoutIcon className="icon" />
                        <span>Logout</span>
                    </li>
                </ul>
            </div>

            <div className="bottom">
                <div className="colorOption"></div>
                <div className="colorOption"></div>
            </div>
        </div>
    )
}

export default Sidebar