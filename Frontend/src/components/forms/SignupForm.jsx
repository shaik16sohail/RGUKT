import React from 'react'

export default function SignupForm(){
    return(
        <>
            <div className='login-page'>
      <div className='signup-main'>
        <div className='login-heading'>
          <img style={{ width: '45px' }} src='/rguktLogo.png'></img>
          <div className='text-3xl font-medium'>Stay Master</div>
        </div>
        <p className='text-xl text-center font-normal'>Register</p>
        <div className='form-label'>
         {/* <label>Email:</label><br></br> */}
         <input type='text' placeholder='Enter your name'></input><br></br><br></br>
         <input type='text' placeholder='Enter your email'></input><br></br><br></br>
         
          {/* <label>Password</label><br></br> */}
          <input type='password' placeholder='Enter your Password'></input>
          <br></br><br></br>
          <div className='text-sm form-buttons'>
            <button>Send Otp</button>
            <button>forgot Password</button>
        </div><br></br>
        <input type='number' placeholder='Enter the Otp'></input><br></br>
        </div>
        <div className='text-center text-xl'>
        <button className='bg-black px-2 py-2 rounded-lg '>Submit</button>
        </div>
        
        <br></br><br></br>
        
        
      </div>
    </div>
        </>
    );
}