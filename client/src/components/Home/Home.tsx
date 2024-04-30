import { Link } from 'react-router-dom';
import './Home.css';
import Post from './Post.tsx';

function Home() {
  return (
    <div className='homeContainer block sm:grid grid-cols-[80%_20%] px-4 py-6'>
      <div className='posts space-y-8'>
        <Post />
        <Post />
        <Post />
        <Post />
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
    </div>
  )
}

export default Home