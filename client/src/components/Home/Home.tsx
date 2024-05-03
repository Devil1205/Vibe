import { Link } from 'react-router-dom';
import './Home.css';
import Post from './Post.tsx';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { getAllPosts } from '../../features/post/postsSlice.tsx';
import { useAppDispatch, useAppSelector } from '../../hooks.ts';
import Loader from '../layout/Loader/Loader.tsx';


function Home() {

  const dispatch = useAppDispatch();
  const { posts, loading, error } = useAppSelector(state => state.posts);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    else
      dispatch(getAllPosts());
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
          <Link to="/"><h2 className='text-lg font-[500] border-b border-gray-300'>Follow People</h2></Link>
          <div className='py-4 space-y-4'>
            <div className='flex flex-col items-center'>
              <Link to="/">
                <img src="https://cdn.pixabay.com/photo/2016/05/05/02/37/sunset-1373171_1280.jpg" alt="Person Name" className='w-12 h-12 rounded-full object-cover' />
              </Link>
              <Link to="/">
                <h3 className='text-md font-[500]'>Pulkit Sachdeva</h3>
              </Link>
            </div>
            <div className='flex flex-col items-center'>
              <Link to="/">
                <img src="https://cdn.pixabay.com/photo/2016/05/05/02/37/sunset-1373171_1280.jpg" alt="Person Name" className='w-12 h-12 rounded-full object-cover' />
              </Link>
              <Link to="/">
                <h3 className='text-md font-[500]'>Pulkit Sachdeva</h3>
              </Link>
            </div>
          </div>
        </div>
      </div >
  )
}

export default Home