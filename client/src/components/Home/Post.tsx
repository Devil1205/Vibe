import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import IconButton from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Link } from "react-router-dom";

function Post() {

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className="postContainer bg-red-200 max-w-[900px] mx-auto p-4 space-y-4">
            <div className="info flex justify-between">
                <Link to="/user" className="flex items-center space-x-2">
                    <FaUserCircle className="text-3xl" />
                    <h3 className="text-lg font-[500]">Pulkit Sachdeva</h3>
                </Link>
                <div className="text-md font-[500] flex space-x-3">
                    <div className="text-gray-700">
                        <div>01/02/24</div>
                        <div>12:10</div>
                    </div>
                    <div>
                        <IconButton
                            id="basic-button"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                            sx={{ minWidth: "30px", padding: "0", color: "gray", borderRadius: "100%" }}
                        >
                            <MoreVertIcon />
                        </IconButton>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            <MenuItem onClick={handleClose}>Edit</MenuItem>
                            <MenuItem onClick={handleClose}>Delete</MenuItem>
                        </Menu>
                    </div>
                </div>
            </div>
            <div className="content">
                <img src="https://cdn.pixabay.com/photo/2016/05/05/02/37/sunset-1373171_1280.jpg" alt="" className="w-full h-full"/>
            </div>
        </div>
    )
}

export default Post