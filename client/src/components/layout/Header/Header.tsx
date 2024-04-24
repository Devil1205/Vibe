import * as React from 'react';
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
import MenuItem from '@mui/material/MenuItem';
import logo from '../../../images/logo.png';
import { Link, useLocation } from 'react-router-dom';

const pages = ['Home', 'Following'];
const settings = ['Profile', 'Account', 'Logout'];

function Header() {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const location = useLocation().pathname;

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <div className='bg-green-900'>
            <AppBar position="static" color="transparent" className='p-2'>
                <Container className='max-w-screen-2xl' style={{ maxWidth: "100%", paddingRight: "5px", paddingLeft: "0" }}>
                    <Toolbar disableGutters className='justify-between' sx={{ color: "white" }}>
                        <Link to="/" className='hidden sm:block'>
                            <img src={logo} alt="" className='h-16 mr-3' />
                        </Link>

                        <Box className="flex sm:hidden" >
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
                                className='block sm:hidden'
                            >
                                {pages.map((page) => (
                                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center">{page}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                        <Link to="/" className='sm:hidden'>
                            <img src={logo} alt="" className='h-16 mr-3' />
                        </Link>
                        <Box sx={{ flexGrow: 1 }} className='hidden sm:flex'>
                            {pages.map((page) => (
                                <Link key={page} to={`/${page.toLowerCase()}`} className={`py-2 px-3 border-white ${location === '/' + page.toLowerCase() ? 'border-b-[3px]' : ''}`} ><Button
                                    onClick={handleCloseNavMenu}
                                    sx={{ padding: 0, color: 'white', display: 'block' }}
                                >
                                    {page}
                                </Button>
                                </Link>
                            ))}
                        </Box>

                        <Box sx={{ flexGrow: 0 }}>
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                            </IconButton>
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
                                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center">{setting}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </div>
    );
}
export default Header;