import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link } from "react-router-dom";
import { AiOutlineLike } from "react-icons/ai";
import { BiSolidLike } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { post } from '../../interfaces/post';
import { Avatar } from "@mui/material";
import { useAppSelector } from "../../hooks";

function Post({ post }: { post: post }) {

    const { user } = useAppSelector(state => state.userDetails);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const dispDate = (date: Date) => {
        let temp = date.toDateString();
        return temp.slice(8, 10) + " " + temp.slice(4, 7) + ", " + date.getFullYear();
    }

    const dispTime = (date: Date) => {
        let temp = date.toTimeString();
        return temp.slice(0, 5);
    }

    const isLiked = (item: post) => {
        
    }

    return (
        <div className="postContainer max-w-[90%] mx-auto space-y-4 rounded p-5 bg-purple-50">
            <div className="postInfo flex justify-between space-x-6">
                <div>
                    <Link to="/user" className="flex items-center space-x-2">
                        <Avatar src={post.owner.image.url} alt={post.owner.name} />
                        <div>
                            <h3 className="text-lg font-[500]">{post.owner.name}</h3>
                            <div className="text-gray-700 text-xs font-[500]">
                                {/* <span>01 March, 2024 at </span> */}
                                <span>{dispDate(new Date(post.createdAt))} at </span>
                                <span className="font-bold">{dispTime(new Date(post.createdAt))}</span>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="font-[500] text-gray-600 text-xl">
                    {"_id" in user && post.owner._id === user._id && <button
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                        className="hover:bg-slate-100 rounded-full p-2"
                    >
                        <BsThreeDotsVertical />
                    </button>}
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
                {post.images.length > 0 && <img src="https://cdn.pixabay.com/photo/2016/05/05/02/37/sunset-1373171_1280.jpg" alt="" className="w-full h-full rounded" />}
                <p className="caption text-gray-800 text-lg">{post.caption}</p>
                <div className="contentInfo flex space-x-4 font-bold mt-2">
                    <Link to="/">{post.likes.length} Likes</Link>
                    <Link to="/">{post.comments.length} Comments</Link>
                </div>
            </div>
            <div className="actions flex text-2xl space-x-4">
                <button><AiOutlineLike /></button>
                {/* <button><BiSolidLike /></button> */}
                <button><FaRegComment /></button>
            </div>
        </div >
    )
}

export default Post