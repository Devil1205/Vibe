import './Home.css';
import Post from './Post.tsx';

function Home() {
  return (
    <div className='homeContainer'>
      <div className='posts'>
        <Post />
      </div>
    </div>
  )
}

export default Home