import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Header from './components/layout/Header/Header';
import Footer from './components/layout/Footer/Footer';
import RegisterLogin from './components/User/RegisterLogin';
import { useAppDispatch } from './hooks';
import { useEffect } from 'react';
import { fetchUser } from './features/user/userDetailsSlice';
import AllFollowSuggestions from './components/Home/AllFollowSuggestions';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch])

  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/login' element={<RegisterLogin />} />
        <Route path='/follow/suggestions' element={<AllFollowSuggestions />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
