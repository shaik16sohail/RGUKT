import React, { useState, useEffect, useRef } from 'react'
import '../index.css'

function Header () {
  const [activeLink, setActiveLink] = useState('') // Track the active link
  const handleLinkClick = link => {
    setActiveLink(link) // Set the clicked link as active
  }
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
            <i className="fa-solid fa-bars" style={{ cursor: "pointer" }}></i>
          </div>
          <img
            src='/rguktLogo.png'
            style={{
              width: '60px',
              height: '60px'
            }}
          ></img>
          <h1>FREEGO</h1>
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
        </div>
      )}

        <div className='header-links'>
          <div className='first'>
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
          </div>
          <div className='profile' onClick={handleDivClick}>
            <img
              src='/profile-user.png'
              alt='Profile Icon'
              style={{ height: '1.8rem', cursor: 'pointer' }}
            />
          </div>
          {isBoxVisible && (
            <div
              ref={popupRef} // Attach the reference to the popup
              style={{
                position: 'fixed',
                top: '70px',
                right: '20px',
                padding: '10px',
                borderRadius: '15px',
                width: '150px',
                backgroundColor: '#E0E0E0',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                zIndex: 1000 // Ensures the dialog is above other elements
              }}
            >
              <p style={{ fontSize: '15px' }}>user@example.com</p>
              <button
                onClick={() => setIsBoxVisible(false)}
                style={{
                  backgroundColor: '#FF4D4D',
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
