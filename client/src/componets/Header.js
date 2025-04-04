import React, { useEffect, useState } from "react";
import {
  AppBar,
  Typography,
  Toolbar,
  Box,
  Button,
  Tabs,
  Tab,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions, setDarkmode } from "../store";
import { lightTheme, darkTheme } from "../utils/theme";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isDark = useSelector((state) => state.theme.isDarkmode);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const theme = isDark ? darkTheme : lightTheme;

  const [value, setValue] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (location.pathname === "/blogs") setValue(0);
    else if (location.pathname === "/myBlogs") setValue(1);
    else if (location.pathname === "/blogs/add") setValue(2);
    else setValue(false);
  }, [location.pathname]);

  const handleLoginClick = () => navigate("/login", { state: { isSignupButtonPressed: false } });
  const handleSignupClick = () => navigate("/login", { state: { isSignupButtonPressed: true } });
  const handleLogout = () => { dispatch(authActions.logout()); navigate("/login"); };
  const handleThemeToggle = () => dispatch(setDarkmode(!isDark));

  const drawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={() => setDrawerOpen(false)}>
      <List>
        <ListItem button component={Link} to="/blogs">
          <ListItemText primary="All Blogs" />
        </ListItem>
        {isLoggedIn && (
          <>
            <ListItem button component={Link} to="/myBlogs">
              <ListItemText primary="My Blogs" />
            </ListItem>
            <ListItem button component={Link} to="/blogs/add">
              <ListItemText primary="Add Blog" />
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <AppBar position="sticky" sx={{ background: `${theme.bg}` }}>
      <Toolbar>
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", fontSize: { xs: "1.2rem", sm: "1.5rem", md: "2rem" } }}
        >
          BlogsApp
        </Typography>

    
        <Box sx={{ display: { xs: "flex", sm: "none" }, ml: "auto" }}>
          <IconButton color="inherit" onClick={() => setDrawerOpen(true)}>
            <MenuIcon />
          </IconButton>
        </Box>

       
        <Box sx={{ display: { xs: "none", sm: "flex" }, ml: "auto", mr: "auto" }}>
          <Tabs
            textColor="inherit"
            value={value}
            onChange={(e, val) => setValue(val)}
            variant="scrollable"
            scrollButtons
            allowScrollButtonsMobile
          >
            <Tab label="All Blogs" LinkComponent={Link} to="/blogs" />
            {isLoggedIn && (
              <>
                <Tab label="My Blogs" LinkComponent={Link} to="/myBlogs" />
                <Tab label="Add Blog" LinkComponent={Link} to="/blogs/add" />
              </>
            )}
          </Tabs>
        </Box>

        <Box display="flex" alignItems="center" sx={{ ml: "auto" }}>
          {!isLoggedIn ? (
            <>
              <Button onClick={handleLoginClick} sx={{ m: 1, fontWeight: "bold", color: "white", borderRadius: 10 }}>
                Login
              </Button>
              <Button onClick={handleSignupClick} sx={{ m: 1, fontWeight: "bold", color: "white", borderRadius: 10 }}>
                SignUp
              </Button>
            </>
          ) : (
            <Button onClick={handleLogout} variant="contained" sx={{ m: 1, borderRadius: 10 }} color="warning">
              Logout
            </Button>
          )}
          <Box onClick={handleThemeToggle} sx={{ px: 2, cursor: "pointer" }}>
            {isDark ? <LightModeIcon /> : <DarkModeIcon />}
          </Box>
        </Box>
      </Toolbar>
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        {drawerList}
      </Drawer>
    </AppBar>
  );
};

export default Header;
