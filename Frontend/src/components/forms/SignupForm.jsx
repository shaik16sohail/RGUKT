// import React from 'react'

// export default function SignupForm(){
//     return(
//         <>
//             <div className='login-page'>
//       <div className='signup-main'>
//         <div className='login-heading'>
//           <img style={{ width: '45px' }} src='/rguktLogo.png'></img>
//           <div className='text-3xl font-medium'>Stay Master</div>
//         </div>
//         <p className='text-xl text-center font-normal'>Register</p>
//         <div className='form-label'>
//          {/* <label>Email:</label><br></br> */}
//          <input type='text' placeholder='Enter your name'></input><br></br><br></br>
//          <input type='text' placeholder='Enter your email'></input><br></br><br></br>
         
//           {/* <label>Password</label><br></br> */}
//           <input type='password' placeholder='Enter your Password'></input>
//           <br></br><br></br>
//           <div className='text-sm form-buttons'>
//             <button>Send Otp</button>
//             <button>forgot Password</button>
//         </div><br></br>
//         <input type='number' placeholder='Enter the Otp'></input><br></br>
//         </div>
//         <div className='text-center text-xl'>
//         <button className='bg-black px-2 py-2 rounded-lg '>Submit</button>
//         </div>
        
//         <br></br><br></br>
        
        
//       </div>
//     </div>
//         </>
//     );
// }
import { useState, useEffect } from 'react';
import axios from 'axios';
export default function SignupForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    otp: '',
    password: '',
    confirmPassword: ''
  });
  
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [timer, setTimer] = useState(0);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    if (name === 'confirmPassword' || name === 'password') {
      if (name === 'confirmPassword') {
        setPasswordMatch(formData.password === value);
      } else {
        setPasswordMatch(formData.confirmPassword === value);
      }
    }
  };
  
  const handleOtpSend = async () => {
    try {
      await axios.post('http://localhost:8080/api/auth/send-otp',{ 
        email: formData.email,
        
         });
      alert('OTP sent to your email.');
      // setStep(2);
      setOtpSent(true);          // ✅ Mark OTP as sent
    setTimer(60);              // ✅ Start countdown for resend

    } catch {
      alert('Failed to send OTP.');
    }
  };
  
  const verifyOtp = async () => {
    await axios.post('http://localhost:8080/api/auth/verify-otp', {
    email: formData.email,
    otp: formData.otp
});
setOtpVerified(true);
setTimer(0);
  };
  
  const handleSubmit = async(e) => {
    if (e) e.preventDefault();
    
    if (!otpVerified) {
      alert('Please verify your email with OTP first.');
      return;
    }
    
    if (!passwordMatch) {
      alert('Passwords do not match.');
      return;
    }
    
    if (formData.password.length < 6) {
      alert('Password should be at least 6 characters long.');
      return;
    }
    try {
      await axios.post('http://localhost:8080/api/auth/register', { 
        email: formData.email,
        password:formData.password,
        name:formData.name
       });
      // alert('OTP sent to your email.');
      // setStep(2); 
           setFormSubmitted(true);
    alert('Signup successful!');
    console.log('Form submitted:', formData);
    
    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      otp: '',
      password: '',
      confirmPassword: ''
    });
    setOtpSent(false);
    setOtpVerified(false);

    } catch(err) {
      alert('Failed to register.');
    }
    
  };
  
  return (
    <div className="flex justify-center w-full">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Create Account</h2>
        
        {formSubmitted ? (
          <div className="text-center">
            <div className="text-green-500 text-xl mb-4">
              Account created successfully!
            </div>
            <button 
              onClick={() => setFormSubmitted(false)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Register Again
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="John Doe"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email Address
              </label>
              <div className="flex">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded-l w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="example@email.com"
                  disabled={otpSent}
                />
                <button
                  type="button"
                  onClick={handleOtpSend}
                  disabled={otpSent && timer > 0}
                  className={`px-4 py-2 rounded-r text-white font-medium ${
                    otpSent && timer > 0 ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
                  }`}
                >
                  {otpSent && timer > 0 ? `${timer}s` : 'Send OTP'}
                </button>
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="otp">
                Enter OTP
              </label>
              <div className="flex">
                <input
                  type="text"
                  id="otp"
                  name="otp"
                  value={formData.otp}
                  onChange={handleChange}
                  className={`shadow appearance-none border rounded-l w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${!otpSent ? 'bg-gray-100' : ''}`}
                  placeholder="Enter 6-digit OTP"
                  disabled={!otpSent || otpVerified}
                />
                <button
                  type="button"
                  onClick={verifyOtp}
                  disabled={!otpSent || otpVerified || formData.otp.length !== 6}
                  className={`px-4 py-2 rounded-r text-white font-medium ${
                    otpVerified ? 'bg-green-500' : (!otpSent || formData.otp.length !== 6) ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
                  }`}
                >
                  {otpVerified ? 'Verified' : 'Verify'}
                </button>
              </div>
              {otpSent && otpVerified && (
                <p className="text-green-500 text-xs italic mt-1">Email verified successfully!</p>
              )}
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${!otpVerified ? 'bg-gray-100' : ''}`}
                placeholder="********"
                disabled={!otpVerified}
              />
              {otpVerified && formData.password && formData.password.length < 6 && (
                <p className="text-red-500 text-xs italic mt-1">Password must be at least 6 characters</p>
              )}
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${!otpVerified ? 'bg-gray-100' : ''}`}
                placeholder="********"
                disabled={!otpVerified}
              />
              {otpVerified && formData.confirmPassword && !passwordMatch && (
                <p className="text-red-500 text-xs italic mt-1">Passwords do not match</p>
              )}
            </div>
            
            <div className="flex items-center justify-center">
              <button
                onClick={handleSubmit}
                disabled={!otpVerified}
                className={`font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline w-full ${
                  otpVerified ? 'bg-green-500 hover:bg-green-600 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Sign Up
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}