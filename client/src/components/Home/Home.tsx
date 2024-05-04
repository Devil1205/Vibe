import './Home.css';
import Post from './Post.tsx';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { getAllPosts } from '../../features/post/postsSlice.tsx';
import { useAppDispatch, useAppSelector } from '../../hooks.ts';
import Loader from '../layout/Loader/Loader.tsx';
import { getFollowSuggestions } from '../../features/user/suggestionsSlice.tsx';
import { clearErrors } from '../../features/user/userSlice.tsx';
import FollowSuggestions from './FollowSuggestions.tsx';


function Home() {

  const dispatch = useAppDispatch();
  const { posts, loading, error } = useAppSelector(state => state.posts);
  const { followUsers, error: suggestionsError } = useAppSelector(state => state.suggestions);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (suggestionsError) {
      toast.error(suggestionsError);
      dispatch(clearErrors());
    }
    else {
      dispatch(getAllPosts());
      if (!suggestionsError)
        dispatch(getFollowSuggestions());
    }
  }, [dispatch, error])

  return (
    loading ? <Loader /> :
      <div className='homeContainer block sm:grid grid-cols-[80%_20%] sm:px-4 py-6' >
        <div className='posts space-y-8'>
          {
            posts.map((elem, ind) => {
              return (
                <Post post={elem} key={ind} />
              )
            })
          }

        </div>
        <div className="followBar text-center hidden sm:block">
          <FollowSuggestions users={followUsers.slice(0, 10)} />
        </div>
      </div >
  )
}

export default Home