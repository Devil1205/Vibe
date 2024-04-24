import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Header from './components/layout/Header/Header';
import Footer from './components/layout/Footer/Footer';

function App() {

  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
