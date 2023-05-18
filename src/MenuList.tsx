import * as React from 'react';
import { Link } from "react-router-dom";

import ListSubheader from '@mui/material/ListSubheader';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import { QrCode } from '@mui/icons-material';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import InventoryIcon from '@mui/icons-material/Inventory';

export const mainListItems = (
    <React.Fragment>
        <ListItemButton component={Link} to={"/"}>
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
        </ListItemButton>
        <ListItemButton component={Link} to={"/categories"}>
            <ListItemIcon>
                <LayersIcon />
            </ListItemIcon>
            <ListItemText primary="Kategoriyalar" />
        </ListItemButton>
        <ListItemButton component={Link} to={"/users"}>
            <ListItemIcon>
                <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Foydalanuvchilar" />
        </ListItemButton>
        <ListItemButton component={Link} to={"/qrcode"}>
            <ListItemIcon>
                <QrCode />
            </ListItemIcon>
            <ListItemText primary="Qr kodlar" />
        </ListItemButton>
        <ListItemButton component={Link} to={"/packets"}>
            <ListItemIcon>
                <LocalMallIcon />
            </ListItemIcon>
            <ListItemText primary="Monitoring" />
        </ListItemButton>

        <ListItemButton component={Link} to={"/boxes"}>
            <ListItemIcon>
                <InventoryIcon />
            </ListItemIcon>
            <ListItemText primary="Yashiklar" />
        </ListItemButton>

        {/* ---------------------------------------------------------------- */}

        <hr />
        <ListSubheader component="div" inset>
            <h3>Hodimlar uchun</h3>
        </ListSubheader>

        <ListItemButton component={Link} to={"/payme/emp"}>
            <ListItemIcon>
                <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="Pul so'rovlari" />
        </ListItemButton>

        <ListItemButton component={Link} to={"/earnings/emp"}>
            <ListItemIcon>
                <LocalAtmIcon />
            </ListItemIcon>
            <ListItemText primary="Daromadlar" />
        </ListItemButton>

        {/* ---------------------------------------------------------------- */}

        <hr />
        <ListSubheader component="div" inset>
            <h3>Aholi uchun</h3>
        </ListSubheader>

        <ListItemButton component={Link} to={"/payme/pop"}>
            <ListItemIcon>
                <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="Pul so'rovlari" />
        </ListItemButton>

        <ListItemButton component={Link} to={"/earnings/pop"}>
            <ListItemIcon>
                <LocalAtmIcon />
            </ListItemIcon>
            <ListItemText primary="Daromadlar" />
        </ListItemButton>
    </React.Fragment>
);
