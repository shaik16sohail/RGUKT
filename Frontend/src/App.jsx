import { useState,useEffect } from 'react'
import './App.css'
import 'leaflet/dist/leaflet.css';
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
import RequestOutpass from './components/Student/RequestOutpass';
import GeneralOutpass from './components/Student/GeneralOutpass';
import EmergencyOutpass from './components/Student/EmergencyOutpass';
import RaiseIssue from './components/Student/RaiseIssue';

import WardenHome from './components/Warden/Home';

import Nope from './components/Nope';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import ScrollToTop from './utils/ScrollToTop';
import StripeCheckoutButton from './components/StripeCheckoutButton';
import CompletedOutpassesPage from './components/CareTaker/CompletedOutpassesPage';
import CompletedOutpassDetails from './components/CareTaker/CompletedOutpassDetails';
// import Header from './components/Header/Header'
function App() {
  
  return (
    <>
      <BrowserRouter>
        <ScrollToTop/>
        <Routes>
          <Route path='/' element={<><LandingPage/><Footer/></>}></Route>
          <Route path='/stripe' element={<StripeCheckoutButton></StripeCheckoutButton>}></Route>
          <Route path='/login' element={<><Layout><LoginForm/></Layout></>}></Route>
          <Route path='/signup' element={<><Layout><SignupForm></SignupForm></Layout></>}></Route>

          {/* caretaker routes */}
          <Route path='/caretaker/home' element={<ProtectedRoute allowedRole="caretaker"><Layout><CareTakerHome></CareTakerHome></Layout></ProtectedRoute>}></Route>
          <Route path='/caretaker/outpasses' element={<ProtectedRoute allowedRole="caretaker"><Layout><Outpasses></Outpasses></Layout></ProtectedRoute>}></Route>
          <Route path='/caretaker/outpasses/completed' element={<ProtectedRoute allowedRole="caretaker"><Layout><CompletedOutpassesPage/></Layout></ProtectedRoute>}></Route>
          <Route path='/caretaker/outpasses/completed/:id' element={<ProtectedRoute allowedRole="caretaker"><Layout><CompletedOutpassDetails/></Layout></ProtectedRoute>}></Route>
          <Route path='/caretaker/outpasses/:id' element={<ProtectedRoute allowedRole="caretaker"><Layout><OutpassDetails></OutpassDetails></Layout></ProtectedRoute>}></Route>
          <Route path='/caretaker/issues' element={<ProtectedRoute allowedRole="caretaker"><Layout><Issues></Issues></Layout></ProtectedRoute>}></Route>
          {/* Student routes */}
          <Route path='/student/home' element={<ProtectedRoute allowedRole='student'><Layout><StudentHome></StudentHome></Layout></ProtectedRoute>}></Route>
          <Route path='/student/request' element={<ProtectedRoute allowedRole='student'><Layout><RequestOutpass></RequestOutpass></Layout></ProtectedRoute>}></Route>
          <Route path='/student/general-outpass' element={<ProtectedRoute allowedRole='student'><Layout><GeneralOutpass></GeneralOutpass></Layout></ProtectedRoute>}></Route>
          <Route path='/student/emergency-outpass' element={<ProtectedRoute allowedRole='student'><Layout><EmergencyOutpass></EmergencyOutpass></Layout></ProtectedRoute>}></Route>
          <Route path='/student/issue' element={<><ProtectedRoute allowedRole='student'><Layout><RaiseIssue></RaiseIssue></Layout></ProtectedRoute></>}></Route>
          {/* warden routes */}
          <Route path='/warden/home' element={<ProtectedRoute allowedRole='warden'><Layout><WardenHome></WardenHome></Layout></ProtectedRoute>}></Route>
          
          <Route path='*' element={<><Header></Header><Nope></Nope><Footer></Footer></>}></Route>
        </Routes>
        
      </BrowserRouter>
    </>
  )
}

export default App
