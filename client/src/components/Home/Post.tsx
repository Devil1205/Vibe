import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link } from "react-router-dom";
import { AiOutlineLike } from "react-icons/ai";
import { BiSolidLike } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";

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
        <div className="postContainer max-w-[90%] mx-auto space-y-4 rounded">
            <div className="postInfo flex justify-between space-x-6">
                <div>
                    <Link to="/user" className="flex items-center space-x-2">
                        <FaUserCircle className="text-3xl" />
                        <div>
                            <h3 className="text-lg font-[500]">Pulkit Sachdeva</h3>
                            <div className="text-gray-700 text-xs font-[500]">
                                <span>01 March, 2024 at </span>
                                <span className="font-bold">12:10</span>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="font-[500] text-gray-600 text-xl">
                    <button
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                        className="hover:bg-slate-100 rounded-full p-2"
                    >
                        <BsThreeDotsVertical />
                    </button>
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
            <div className="content">
                <img src="https://cdn.pixabay.com/photo/2016/05/05/02/37/sunset-1373171_1280.jpg" alt="" className="w-full h-full rounded" />
                <p className="caption text-gray-800 text-lg">This is my first post</p>
                <div className="contentInfo flex space-x-4 font-bold mt-2">
                    <Link to="/">0 Likes</Link>
                    <Link to="/">0 Comments</Link>
                </div>
            </div>
            <div className="actions flex text-2xl space-x-4">
                <button><AiOutlineLike /></button>
                {/* <button><BiSolidLike /></button> */}
                <button><FaRegComment /></button>
            </div>
        </div>
    )
}

export default Post