import { useState,useEffect } from 'react'
import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import LoginForm from './components/forms/LoginForm';
import LandingPage from './components/LandingPage';
// import Header from './components/Header/Header'
function App() {
  const [count, setCount] = useState(0)
  

  return (
    <>
      <BrowserRouter>
      
        <Routes>
          <Route path='/' element={<><LandingPage/><Footer/></>}></Route>
        
          <Route path='/home' element={<><Header/><HomePage/><Footer/></>}></Route>
          
          <Route path='/login' element={<LoginForm/>}></Route>

        </Routes>
        
      </BrowserRouter>
    </>
  )
}

export default App
