
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import { NavLink, Outlet } from 'react-router-dom';
import { useState } from 'react';
import { Block, Campaign, Edit, Home, ListAlt, PeopleAlt } from '@mui/icons-material';
import useAdmin from '../Hooks/useAdmin';

const drawerWidth = 240;

function Dashboard(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    // const [isAdmin] = useAdmin();
    const isAdmin = true;
    const drawer = (
        <div>
            <Toolbar />
            {
                isAdmin ?
                    <List>
                        <NavLink to="/dashboard/adminProfile" style={{ textDecoration: 'none', color: '#000' }}>
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <Home />
                                    </ListItemIcon>
                                    <ListItemText>Admin Profile</ListItemText>
                                </ListItemButton>
                            </ListItem>
                        </NavLink>
                        <NavLink to="/dashboard/manageUsers" style={{ textDecoration: 'none', color: '#000' }}>
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <PeopleAlt />
                                    </ListItemIcon>
                                    <ListItemText>Manage Users</ListItemText>
                                </ListItemButton>
                            </ListItem>
                        </NavLink>

                        <NavLink to="/dashboard/report" style={{ textDecoration: 'none', color: '#000' }}>
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <Block />
                                    </ListItemIcon>
                                    <ListItemText>Reported Comments/Activities</ListItemText>
                                </ListItemButton>
                            </ListItem>
                        </NavLink>
                        <NavLink to="/dashboard/createAnnouncement" style={{ textDecoration: 'none', color: '#000' }}>
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <Campaign />
                                    </ListItemIcon>
                                    <ListItemText>Make Announcement</ListItemText>
                                </ListItemButton>
                            </ListItem>
                        </NavLink>
                    </List>
                    :
                    <List>
                        <NavLink to="/dashboard/userProfile" style={{ textDecoration: 'none', color: '#000' }}>
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <Home />
                                    </ListItemIcon>
                                    <ListItemText>My Profile</ListItemText>
                                </ListItemButton>
                            </ListItem>
                        </NavLink>
                        <NavLink to="/dashboard/addPost" style={{ textDecoration: 'none', color: '#000' }}>
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <Edit />
                                    </ListItemIcon>
                                    <ListItemText>Add Post</ListItemText>
                                </ListItemButton>
                            </ListItem>
                        </NavLink>
                        <NavLink to="/dashboard/myPost" style={{ textDecoration: 'none', color: '#000' }}>
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <ListAlt />
                                    </ListItemIcon>
                                    <ListItemText>My Post</ListItemText>
                                </ListItemButton>
                            </ListItem>
                        </NavLink>
                    </List>
            }
            <Divider />
            <List>
                <NavLink to="/" style={{ textDecoration: 'none', color: '#000' }}>
                    <ListItem disablePadding>

                        <ListItemButton>
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText>Home</ListItemText>
                        </ListItemButton>
                    </ListItem>
                </NavLink>
                <NavLink to="/membership" style={{ textDecoration: 'none', color: '#000' }}>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText>Membership</ListItemText>
                        </ListItemButton>
                    </ListItem>
                </NavLink>

            </List>
        </div>
    );

    // Remove this const when copying and pasting into your project.
    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                    backgroundColor: '#06BD95'
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
                <Outlet></Outlet>
            </Box>
            
        </Box>
    );
}

Dashboard.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * Remove this when copying and pasting into your project.
     */
    window: PropTypes.func,
};

export default Dashboard;