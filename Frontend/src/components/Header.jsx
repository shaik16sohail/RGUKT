import React, { useState, useEffect, useRef } from 'react'
import '../index.css'
import { Link } from 'react-router-dom';

function Header ({ toggleTheme, darkMode }) {
  const [activeLink, setActiveLink] = useState('') // Track the active link
  const handleLinkClick = link => {
    setActiveLink(link) // Set the clicked link as active
  }
  const [typeUser,setTypeUser]=useState(false);
  const [isBoxVisible, setIsBoxVisible] = useState(false)
  const popupRef = useRef(null)
  const handleDivClick = event => {
    event.stopPropagation()
    setIsBoxVisible(!isBoxVisible) // Toggle visibility
  }
  const [isDivVisible, setIsDivVisible] = useState(false); // State to toggle the new div

  // Toggle the div visibility
  const toggleDiv = () => {
    setIsDivVisible((prevState) => !prevState);
  };

  useEffect(() => {
    const handleClickOutside = event => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsBoxVisible(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  return (
    <>
    <div className='overall-head'> 
      <div className='header container mx-auto '>
        {/* <div className='m'> */}
        <div className='header-logo'>
        <div className="bars" onClick={toggleDiv}>
        {/* <i class="fa-regular fa-user"></i> */}
            <i className="fa-solid fa-bars text-white" style={{ cursor: "pointer" }}></i>
          </div>
          <a href='#'><img
            src='/rguktLogo.png'
            style={{
              width: '60px',
              height: '60px'
            }}
            className="rotating-image"
          ></img></a>
          
          <h1 style={{color:"rgb(137, 24, 26)"}}>Stay Master</h1>
        </div>
        {/* New Div */}
      {isDivVisible && (
        <div
          style={{
            border:"1px solid white",
            position: "fixed",
            // bottom: "0",
            top:"5rem",
            left: "0",
            width: "100%",
            height: "8rem",
            backgroundColor: "white", // Black background
            zIndex: 2000, // Higher than other elements
          }}
        >
         
        </div>
      )}
{/* {typeUser==true?
          <ul>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/request-outpass">Request a Outpass</Link>
          </li>
          <li>
            <Link to="/raise-complaint">Raise a Complaint</Link>
          </li>
        </ul>
        
        
        :
        <ul>
        <li>
          <a
            href='#'
            onClick={() => handleLinkClick('home')}
            className={activeLink === 'home' ? 'active-link' : ''}
          >
            Home
          </a>
        </li>
        <li>
          <a
            href='#'
            onClick={() => handleLinkClick('request-outpass')}
            className={
              activeLink === 'request-outpass' ? 'active-link' : ''
            }
          >
            Request a Outpass
          </a>
        </li>
        <li>
          <a
            href='#'
            onClick={() => handleLinkClick('raise-complaint')}
            className={
              activeLink === 'raise-complaint' ? 'active-link' : ''
            }
          >
            Raise a Complaint
          </a>
        </li>
      </ul>} */}
        <div className='header-links'>
          <div className='first'>
          {typeUser?
          <ul>
          <li>
            <a
              href='/caretaker/home'
              onClick={() => handleLinkClick('home')}
              className={activeLink === 'home' ? 'active-link' : ''}
            >
              Home
            </a>
          </li>
          <li>
            <a
              href='/caretaker/outpasses'
              onClick={() => handleLinkClick('request-outpass')}
              className={
                activeLink === 'request-outpass' ? 'active-link' : ''
              }
            >
              Outpasses
            </a>
          </li>
          <li>
            <a
              href='/caretaker/issues'
              onClick={() => handleLinkClick('raise-complaint')}
              className={
                activeLink === 'raise-complaint' ? 'active-link' : ''
              }
            >
              Issues
            </a>
          </li>
        </ul>:
          <ul>
          <li>
            <a
              href='#'
              onClick={() => handleLinkClick('home')}
              className={activeLink === 'home' ? 'active-link' : ''}
            >
              Home
            </a>
          </li>
          <li>
            <a
              href='#'
              onClick={() => handleLinkClick('request-outpass')}
              className={
                activeLink === 'request-outpass' ? 'active-link' : ''
              }
            >
              Request a Outpass
            </a>
          </li>
          <li>
            <a
              href='#'
              onClick={() => handleLinkClick('raise-complaint')}
              className={
                activeLink === 'raise-complaint' ? 'active-link' : ''
              }
            >
              Raise a Complaint
            </a>
          </li>
        </ul>
          
          }
          </div>
          
          <div className='profile' onClick={handleDivClick}>
            <img
              src='/virat kohli.jpg'
              alt='Profile Icon'
              style={{ height: '1.8rem', cursor: 'pointer',height:'36px',width:'36px',borderRadius:'50%' }}
            />
          </div>
          {isBoxVisible && (
            <div
              ref={popupRef} // Attach the reference to the popup
              style={{
                position: 'fixed',
                top: '80px',
                right: '30px',
                padding: '2rem',
                borderRadius: '20px',
                color:"white",
                width: '12.5rem',
                height:"17rem",
                backgroundColor: '#3B3B3B',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                textAlign:"center",
                zIndex: 1000 // Ensures the dialog is above other elements
              }}
            >
               <img
              src='/virat kohli.jpg'
              alt='Profile Icon'
              style={{ height: '1.8rem', cursor: 'pointer',height:'72px',width:'72px',borderRadius:'50%',marginLeft:"2rem",marginBottom:'1rem' }}
            />
            

              <h1 style={{fontSize:"1.8rem"}}> Hi Shaik !</h1>
              <p style={{ fontSize: '15px' }}>rr200088@rguktrkv.ac.in</p>
              <br></br>
              <p>Profile Details</p>
              <Link to="/" >
                  <button
                    onClick={() => setIsBoxVisible(false)}
                    style={{
                      backgroundColor: 'rgb(137, 24, 26)',
                      color: 'white',
                      border: 'none',
                      padding: '5px 10px',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      width: '100%'
                    }}
                  >
                    Logout
                  </button>
              </Link>
             
            </div>
          )}
        </div>
        {/* </div> */}
      </div>
      </div>
    </>
  )
}
export default Header
