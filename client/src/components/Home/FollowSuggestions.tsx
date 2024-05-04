import { Link } from "react-router-dom"
import { user } from "../../interfaces/post"
import { Avatar } from "@mui/material"

function FollowSuggestions({ users }: { users: user[] }) {
    return (
        <div className="space-y-6">
            <Link to="/follow/suggestions"><h2 className='text-lg font-[500] border-b border-gray-300'>Follow People</h2></Link>
            {
                users.length === 0 ?
                    <div className="text-xl">No suggestions found</div>
                    :
                    users.map((elem, ind) => {
                        return (
                            <div className='flex flex-col items-center' key={ind}>
                                <Link to="/">
                                    <Avatar src={elem.image && elem.image.url} alt={elem.name} className='w-12 h-12 rounded-full object-cover' />
                                </Link>
                                <Link to="/">
                                    <h3 className='text-md font-[500]'>{elem.name}</h3>
                                </Link>
                            </div>
                        )
                    })
            }
        </div>
    )
}

export default FollowSuggestions