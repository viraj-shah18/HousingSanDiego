import * as React from 'react';
import HomePage from './components/homePage';
import ProfilePage from './components/profilePage';
import SearchPage from './components/searchPage';
import PropertyPopup from './components/propertyPopup'
import FindRoommate from './components/findRoommate';
import LoginPage from './components/loginPage';
import Cards from  './components/flatCardsWindow';
import LaJollaMap from './components/map'; //testing
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import PeopleIcon from '@mui/icons-material/People';
import {useNavigate,useLocation} from 'react-router-dom';

import {
  Routes,
  Route,
} from "react-router-dom";
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import CollectionsSearchPage from './components/viewCollectionSearchPage';


const pages = [{
  name: 'Home',
  path: '/',
},{
  name: 'Find Roommates',
  path: '/find-roommate',
},{
  name: 'Search',
  path: '/search',
},{
  name: 'About',
  path: '/',
}
];
const settings = ['Profile', 'Logout'];


function App(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleNavigation = (gotoPage) => {
    console.log(gotoPage.name);
    setAnchorElNav(null);
    if(gotoPage.name!="About")
    {
      navigate(gotoPage.path,{state:location.state});
    }
  };
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    console.log("openusermenu");
    if((!location.state) ||(!location.state.loginInfo) ){
      navigate("/login");
    }else{
      setAnchorElUser(event.currentTarget);
    }
    
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);

  };
  const handleClickUserOptions = (option) => {
    setAnchorElUser(null);
    console.log(option)
    console.log("need login before visit profile",location)
    if((!location.state) ||(!location.state.loginInfo) ){
      navigate("/login");
    }
    else if(option == 'Profile'){
      console.log(location.state)
      navigate("/profile",{state:location.state});
    }
    else if(option == 'Logout'){
      navigate("/")
    }

  };

  const handleViewCollection = event => {
    navigate("/collections", {state:location.state})
  }

  return (
    
    <div>
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={()=>handleNavigation(page)}>
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={()=>handleNavigation(page)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 , display: { xs: 'none', md: 'flex' }}}>
            {/* <IconButton aria-label="Friends">
              <PeopleIcon />
            </IconButton> */}
            {location.state ? <><IconButton onClick={handleViewCollection}><CollectionsBookmarkIcon/></IconButton>
            <Button onClick={handleViewCollection}></Button></> : <></>}
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={()=>handleClickUserOptions(setting)}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/collections" element={<CollectionsSearchPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/find-roommate" element={<FindRoommate />} />   
          <Route path="/map" element={<LaJollaMap />} /> 
          <Route path="/cards" element={<Cards />} />   
          <Route path="/popup" element={<PropertyPopup />} />   
          
      </Routes>
    </div>
  );
}

export default App;
