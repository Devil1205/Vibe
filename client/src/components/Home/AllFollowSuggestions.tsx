import { Avatar } from "@mui/material"
import { useAppDispatch, useAppSelector } from "../../hooks"
import { useEffect } from "react";
import Loader from "../layout/Loader/Loader";
import { toast } from "react-toastify";
import { clearErrors } from "../../features/user/userSlice";
import { getFollowSuggestions } from "../../features/user/suggestionsSlice";
import { Link } from "react-router-dom";

function AllFollowSuggestions() {
    const { followUsers: users, loading, error } = useAppSelector(state => state.suggestions);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        else {
            dispatch(getFollowSuggestions());
        }
    }, [dispatch, error])


    return (
        loading ? <Loader /> :
            <div className="space-y-6 p-4">
                <h2 className='text-2xl font-[500] border-b border-gray-300 w-fit mx-auto mb-4'>Follow People</h2>
                <div className={`grid ${users.length > 0 ? "grid-cols-1 min-[380px]:grid-cols-2 md:grid-cols-3" : "grid-cols-1 place-items-center"} min-h-[calc(100vh-224px-80px)] justify-items-center gap-6`}>
                    {
                        users.length === 0 ?
                            <div className="text-xl font-medium">No suggestions found</div>
                            : users.map((elem, ind) => {
                                return (
                                    <div className='flex flex-col items-center' key={ind}>
                                        <Link to="/">
                                            <Avatar src={elem.image && elem.image.url} alt={elem.name} sx={{width: "58px", height: "58px", objectFit: "cover"}} />
                                        </Link>
                                        <Link to="/">
                                            <h3 className='text-lg font-[500]'>{elem.name}</h3>
                                        </Link>
                                    </div>
                                )
                            })
                    }
                </div>
            </div>
    )
}

export default AllFollowSuggestions