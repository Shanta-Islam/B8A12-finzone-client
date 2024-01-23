import NotificationsIcon from '@mui/icons-material/Notifications';
import { useContext, useState } from "react";
import {
    AppBar,
    Avatar,
    Badge,
    Box,
    Button,
    Divider,
    Drawer,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Typography,
} from "@mui/material";
import Logo from "../../../assets/logo.png";

import MenuIcon from "@mui/icons-material/Menu";
import { Link, NavLink } from "react-router-dom";
import "../../../styles/HeaderStyles.css";
import { AccountCircle, Translate } from '@mui/icons-material';
import { AuthContext } from '../../../Context/AuthProvider';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    // hndle menu click
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error));
    }
    const axiosPublic = useAxiosPublic();
    const { data } = useQuery({
        queryKey: ['announcements'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/announcements`)
            return res.data
        }
    })
    //menu drawer
    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
            <Typography
                
                variant="h6"
                component="div"
                sx={{ flexGrow: 1, my: 2 }}
            >
                <img src={Logo} alt="logo" className="logo" />

            </Typography>
            <Divider />
            <ul className="mobile-navigation">
                <li>
                    <NavLink to="/" className={({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? " hover:text-white focus:text-white text-white px-5 py-2 text-md rounded bg-transparent underline" : " hover:text-white text-white px-5 py-2 mx-2 text-md rounded"}>Home</NavLink>
                </li>
                <li>
                    <NavLink to="/membership" className={({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? " hover:text-white focus:text-white text-white px-5 py-2 text-md rounded bg-transparent underline" : " hover:text-white text-white px-5 py-2 mx-2 text-md rounded"}>Membership</NavLink>
                </li>
                <li><NotificationsIcon></NotificationsIcon></li>
                {user ?
                    <div>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}>Profile</MenuItem>
                            <MenuItem onClick={handleClose}>Dashboard</MenuItem>
                            <MenuItem onClick={handleLogOut}>Logout</MenuItem>
                        </Menu>
                    </div>
                    :
                    <li><Link to='/login'><Button varient='contained' sx={{ backgroundColor: '#000', color: '#fff' }}>Join US</Button></Link></li>
                }
            </ul>
        </Box>
    );
    return (
        <>
            <Box>
                {/* <AppBar component={"nav"} sx={{ bgcolor: "#fff", position: "absolute", width: "1200px", left:"50%", top: "10%", transform: "translate(-50%, -50%)", borderRadius: "6px", }}> */}
                <AppBar component={"nav"} sx={{ bgcolor: "#fff" }}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            sx={{
                                mr: 2,
                                display: { sm: "none" },
                            }}
                            onClick={handleDrawerToggle}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            color={"black"}
                            variant="h4"
                            component="div"
                            sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', }}
                        >
                            <img src={Logo} alt="logo"/>
                            <Typography variant="h4" component="div" sx={{ flexGrow: 1, fontWeight: '600' }}>
                                FinZone
                            </Typography>

                        </Typography>
                        <Box sx={{ display: { xs: "none", sm: "block" } }} color={"black"}>
                            <ul className="navigation-menu">
                                <li>
                                    <NavLink to="/" className={({ isActive, isPending }) =>
                                        isPending ? "pending" : isActive ? "" : ""}>Home</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/about" className={({ isActive, isPending }) =>
                                        isPending ? "pending" : isActive ? "" : ""}>About</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/membership" className={({ isActive, isPending }) =>
                                        isPending ? "pending" : isActive ? "" : ""}>Membership</NavLink>
                                </li>
                                <li><Badge badgeContent={data?.length} color="primary"><NotificationsIcon ></NotificationsIcon></Badge></li>

                                {user ?
                                    <div>
                                        <IconButton
                                            size="large"
                                            aria-label="account of current user"
                                            aria-controls="menu-appbar"
                                            aria-haspopup="true"
                                            onClick={handleMenu}
                                            color="inherit"
                                        >
                                            <Avatar alt="user img" src={user?.photoURL ? user?.photoURL : 'https://i.ibb.co/X2xMzwL/defultuser.png'} />

                                        </IconButton>
                                        <Menu
                                            id="menu-appbar"
                                            anchorEl={anchorEl}
                                            anchorOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                            keepMounted
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                            open={Boolean(anchorEl)}
                                            onClose={handleClose}
                                        >
                                            <MenuItem onClick={handleClose} sx={{ pointerEvents: 'none' }}>{user?.displayName ? user?.displayName : "User"}</MenuItem>
                                            <Link to='/dashboard' style={{ textDecoration: 'none' }}><MenuItem onClick={handleClose} sx={{ color: 'black', textDecoration: 'none' }}>Dashboard</MenuItem></Link>
                                            <MenuItem onClick={handleLogOut}>Logout</MenuItem>
                                        </Menu>
                                    </div>
                                    :
                                    <li><Link to='/login'><Button varient='contained' sx={{ backgroundColor: '#fff', color: '#000' }}>Join US</Button></Link></li>
                                }
                            </ul>
                        </Box>
                    </Toolbar>
                </AppBar>
                <Box component="nav">
                    <Drawer
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        sx={{
                            display: { xs: "block", sm: "none" },
                            "& .MuiDrawer-paper": {
                                boxSizing: "border-box",
                                width: "240px",
                                
                            },
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Box>
                <Box>
                    <Toolbar />
                </Box>
            </Box>
        </>
    );
};

export default Navbar;