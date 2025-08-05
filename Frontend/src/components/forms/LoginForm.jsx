import { useState } from 'react'
import '../../index.css'
import axios from 'axios'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
export default function LoginForm () {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const {login,isLoggedIn,user}=useAuth();
  const navigate=useNavigate();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  // const [otp, setOtp] = useState('')
  // const [otpEnabled, setOtpEnabled] = useState(false)

  useEffect(()=>{
    if(isLoggedIn){
      console.log("you are already loggedIn");
      navigate(`/${user.userType}/home/`);
    }
  },[]);

  const sendOtp = async () => {
    try {
      const response = await axios.post(`${backendUrl}/api/auth/send-otp`, { email })
      alert(response.data.message)
      setOtpEnabled(true)
    } catch (err) {
      console.error(err)
      alert('Failed to send OTP')
    }
  }

  const handleSubmit = async () => {
    try {
      // First verify OTP
      // const verifyRes = await axios.post('http://localhost:8080/api/auth/verify-otp', {
      //   email:email,
      //   otp:otp
      // })
      // console.log(verifyRes.data);
      // if (verifyRes.data.message=="Otp Verified") {
        // Now login
        const loginRes = await axios.post(`${backendUrl}/api/auth/login`, {
          email:email,
          password:password
        }, { withCredentials: true });
        login(loginRes.data.user);
        toast.success("Successfully logged in");
        navigate(`/${loginRes.data.user.userType}/home/`);
        // alert(loginRes.data);
        setEmail("");
        setPassword("");
        // setOtp("");
        // setOtpEnabled(false);
        // Add navigation or localStorage logic here if needed
      // } else {
      //   alert('Invalid OTP')
      // }
    } catch (err) {
      console.error(err)
      toast.error("Something went wrong");
    }
  }

  return (
    <div className='login-page'>
      <div className='login-main'>
        <div className='login-heading'>
          <img style={{ width: '45px' }} src='/rguktLogo.png'></img>
          <div className='text-3xl font-medium'>Stay Master</div>
        </div>
        <p className='text-xl text-center font-normal'>Login</p>
        <div className='form-label'>
          <input
            type='text'
            placeholder='Enter your email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <br />
          <input
            type='password'
            placeholder='Enter your Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          {/* <br /> */}
          {/* <div className='text-sm form-buttons'>
            <button>Send Otp</button>
            <button>forgot Password</button>
          </div> */}
          <br />
          {/* <input
            type='number'
            placeholder='Enter the Otp'
            name='otp'
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            disabled={!otpEnabled}
          /> */}
          <br />
        </div>
        <div className='text-center text-xl'>
          <button className='bg-black px-2 py-2 rounded-lg' onClick={handleSubmit}>
            Submit
          </button>
        </div>

        <br />
        <br />
      </div>
    </div>
  )
}
