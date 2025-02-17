import { useState,useEffect } from 'react'
import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import LoginForm from './components/forms/LoginForm';
import LandingPage from './components/LandingPage';
import SignupForm from './components/forms/SignupForm';
import CareTakerHome from './components/CareTaker/Home';
import Outpasses from './components/CareTaker/Outpasses';
import OutpassDetails from './components/CareTaker/OutpassDetails';
import Issues from './components/CareTaker/Issues';
import StudentHome from './components/Student/Home';
// import Header from './components/Header/Header'
function App() {
  const [count, setCount] = useState(0)
  

  return (
    <>
      <BrowserRouter>
      
        <Routes>
          <Route path='/' element={<><LandingPage/><Footer/></>}></Route>
        
          <Route path='/home' element={<><Header/><HomePage/><Footer/></>}></Route>
          
          <Route path='/login' element={<><Header></Header><LoginForm/><Footer/></>}></Route>
          <Route path='/signup' element={<><Header></Header><SignupForm/><Footer></Footer></>}></Route>
          <Route path='/caretaker/home' element={<><Header></Header><CareTakerHome/><Footer></Footer></>}></Route>
          <Route path='/caretaker/outpasses' element={<><Header></Header><Outpasses/><Footer></Footer></>}></Route>
          <Route path='/caretaker/outpasses/:id' element={<><Header></Header><OutpassDetails/><Footer></Footer></>}></Route>
          <Route path='/caretaker/issues/' element={<><Header></Header><Issues/> <Footer></Footer></>}></Route>

          <Route path='/student/home' element={<><Header></Header><StudentHome></StudentHome><Footer></Footer></>}></Route>
        </Routes>
        
      </BrowserRouter>
    </>
  )
}

export default App
