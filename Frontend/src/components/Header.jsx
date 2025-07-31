import React, { useState, useEffect, useRef } from 'react'
import '../index.css'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { toast } from 'react-toastify';
function Header () {
  const { isLoggedIn, user, logout } = useAuth()
  const navigate = useNavigate()
  const [activeLink, setActiveLink] = useState('') // Track the active link
  const handleLinkClick = link => {
    setActiveLink(link) // Set the clicked link as active
  }
  const [typeUser, setTypeUser] = useState(false)
  const [isBoxVisible, setIsBoxVisible] = useState(false)
  const popupRef = useRef(null)
  const handleDivClick = event => {
    event.stopPropagation()
    setIsBoxVisible(!isBoxVisible) // Toggle visibility
  }
  const [isDivVisible, setIsDivVisible] = useState(false) // State to toggle the new div

  // Toggle the div visibility
  const toggleDiv = () => {
    setIsDivVisible(prevState => !prevState)
  }
  const handleLogout = async () => {
    try {
      await axios.post(
        'http://localhost:8080/api/auth/logout',
        {},
        {
          withCredentials: true
        }
      )
      logout();
      toast.success("Successfully logged out");
      navigate('/login')
    } catch (err) {
      console.log('logout failed', err);
      toast.error("Something went wrong");
    }
  }

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

  const headerStyles = {
    overallHead: {
      backgroundColor: '#000000',
      borderBottom: '2px solid #333',
      boxShadow: '0 2px 10px rgba(255, 255, 255, 0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      width: '100%'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0.75rem 1rem',
      maxWidth: '1200px',
      margin: '0 auto',
      minHeight: '70px'
    },
    headerLogo: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem'
    },
    bars: {
      display: 'none',
      cursor: 'pointer',
      padding: '0.5rem',
      borderRadius: '4px',
      transition: 'background-color 0.3s ease'
    },
    logoImage: {
      width: '50px',
      height: '50px',
      borderRadius: '50%',
      transition: 'transform 0.3s ease'
    },
    logoTitle: {
      color: 'rgb(137, 24, 26)',
      fontSize: '1.8rem',
      fontWeight: 'bold',
      textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
      margin: 0
    },
    headerLinks: {
      display: 'flex',
      alignItems: 'center',
      gap: '2rem'
    },
    navList: {
      display: 'flex',
      listStyle: 'none',
      margin: 0,
      padding: 0,
      gap: '2rem',
      alignItems: 'center'
    },
    navItem: {
      margin: 0
    },
    navLink: {
      color: '#ffffff',
      textDecoration: 'none',
      fontSize: '1rem',
      fontWeight: '500',
      padding: '0.5rem 1rem',
      borderRadius: '6px',
      transition: 'all 0.3s ease',
      position: 'relative',
      display: 'block'
    },
    activeLink: {
      backgroundColor: 'rgba(137, 24, 26, 0.2)',
      color: '#ffffff',
      borderBottom: '2px solid rgb(137, 24, 26)'
    },
    profileImage: {
      height: '40px',
      width: '40px',
      borderRadius: '50%',
      cursor: 'pointer',
      border: '2px solid #ffffff',
      transition: 'transform 0.3s ease, border-color 0.3s ease'
    },
    profilePopup: {
      position: 'fixed',
      top: '80px',
      right: '30px',
      padding: '1.5rem',
      borderRadius: '12px',
      color: 'white',
      width: '280px',
      backgroundColor: '#1a1a1a',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.8)',
      textAlign: 'center',
      zIndex: 2000,
      border: '1px solid #333'
    },
    profilePopupImage: {
      height: '80px',
      width: '80px',
      borderRadius: '50%',
      marginBottom: '1rem',
      border: '3px solid #ffffff'
    },
    profileName: {
      fontSize: '1.2rem',
      marginBottom: '0.5rem',
      fontWeight: '600'
    },
    profileEmail: {
      fontSize: '0.9rem',
      color: '#ccc',
      marginBottom: '1rem'
    },
    profileDetails: {
      color: '#ffffff',
      marginBottom: '1rem',
      fontSize: '0.95rem'
    },
    logoutButton: {
      backgroundColor: 'rgb(137, 24, 26)',
      color: 'white',
      border: 'none',
      padding: '0.7rem 1rem',
      borderRadius: '6px',
      cursor: 'pointer',
      width: '100%',
      fontSize: '1rem',
      fontWeight: '500',
      transition: 'background-color 0.3s ease'
    },
    mobileMenu: {
      position: 'fixed',
      top: '70px',
      left: '0',
      width: '100%',
      backgroundColor: '#000000',
      borderTop: '1px solid #333',
      zIndex: 1999,
      padding: '1rem',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.8)'
    },
    mobileNavList: {
      listStyle: 'none',
      margin: 0,
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem'
    },
    mobileNavLink: {
      color: '#ffffff',
      textDecoration: 'none',
      fontSize: '1.1rem',
      padding: '0.75rem 1rem',
      borderRadius: '6px',
      display: 'block',
      transition: 'background-color 0.3s ease'
    },
    authLinks: {
      display: 'flex',
      listStyle: 'none',
      margin: 0,
      padding: 0,
      gap: '1rem',
      alignItems: 'center'
    },
    authLink: {
      color: '#ffffff',
      textDecoration: 'none',
      fontSize: '1rem',
      fontWeight: '500',
      padding: '0.5rem 1.2rem',
      borderRadius: '6px',
      border: '1px solid #ffffff',
      transition: 'all 0.3s ease'
    }
  }

  // Media queries for responsive design
  const mediaQueries = `
    @media (max-width: 768px) {
      .header-desktop-nav {
        display: none;
      }
      .header-mobile-toggle {
        display: block !important;
      }
      .header-logo h1 {
        font-size: 1.4rem;
      }
      .header-logo img {
        width: 40px;
        height: 40px;
      }
    }
    
    @media (min-width: 769px) {
      .header-mobile-toggle {
        display: none;
      }
    }
    
    @media (max-width: 480px) {
      .header-logo h1 {
        font-size: 1.2rem;
      }
      .header-auth-links {
        gap: 0.5rem;
      }
      .header-auth-links a {
        padding: 0.4rem 0.8rem;
        font-size: 0.9rem;
      }
    }
  `

  return (
    <>
      <style>{mediaQueries}</style>
      <div style={headerStyles.overallHead}>
        <div style={headerStyles.header} className='container mx-auto'>
          <div style={headerStyles.headerLogo} className='header-logo'>
            <div 
              style={headerStyles.bars} 
              className='header-mobile-toggle'
              onClick={toggleDiv}
              onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.1)'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
            >
              <i
                className='fa-solid fa-bars text-white'
                style={{ fontSize: '1.2rem' }}
              ></i>
            </div>
            <a href='/'>
              <img
                src='/rguktLogo.png'
                style={headerStyles.logoImage}
                className='rotating-image'
                onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
              />
              
            </a>
            <a href='/'>
              <h1 style={headerStyles.logoTitle}>Stay Master</h1>
            </a>
             
           
          </div>

          {isDivVisible && (
            <div style={headerStyles.mobileMenu}>
              {isLoggedIn ? (
                user.userType === 'caretaker' ? (
                  <ul style={headerStyles.mobileNavList}>
                    <li>
                      <a
                        href='/caretaker/home'
                        onClick={() => {handleLinkClick('home'); setIsDivVisible(false)}}
                        style={{
                          ...headerStyles.mobileNavLink,
                          backgroundColor: activeLink === 'home' ? 'rgba(137, 24, 26, 0.3)' : 'transparent'
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = activeLink === 'home' ? 'rgba(137, 24, 26, 0.3)' : 'transparent'}
                      >
                        Home
                      </a>
                    </li>
                    <li>
                      <a
                        href='/caretaker/outpasses'
                        onClick={() => {handleLinkClick('request-outpass'); setIsDivVisible(false)}}
                        style={{
                          ...headerStyles.mobileNavLink,
                          backgroundColor: activeLink === 'request-outpass' ? 'rgba(137, 24, 26, 0.3)' : 'transparent'
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = activeLink === 'request-outpass' ? 'rgba(137, 24, 26, 0.3)' : 'transparent'}
                      >
                        Outpasses
                      </a>
                    </li>
                    <li>
                      <a
                        href='/caretaker/issues'
                        onClick={() => {handleLinkClick('raise-complaint'); setIsDivVisible(false)}}
                        style={{
                          ...headerStyles.mobileNavLink,
                          backgroundColor: activeLink === 'raise-complaint' ? 'rgba(137, 24, 26, 0.3)' : 'transparent'
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = activeLink === 'raise-complaint' ? 'rgba(137, 24, 26, 0.3)' : 'transparent'}
                      >
                        Issues
                      </a>
                    </li>
                  </ul>
                ) : (
                  <ul style={headerStyles.mobileNavList}>
                    <li>
                      <a
                        href='/student/home'
                        onClick={() => {handleLinkClick('home'); setIsDivVisible(false)}}
                        style={{
                          ...headerStyles.mobileNavLink,
                          backgroundColor: activeLink === 'home' ? 'rgba(137, 24, 26, 0.3)' : 'transparent'
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = activeLink === 'home' ? 'rgba(137, 24, 26, 0.3)' : 'transparent'}
                      >
                        Home
                      </a>
                    </li>
                    <li>
                      <a
                        href='/student/request'
                        onClick={() => {handleLinkClick('request-outpass'); setIsDivVisible(false)}}
                        style={{
                          ...headerStyles.mobileNavLink,
                          backgroundColor: activeLink === 'request-outpass' ? 'rgba(137, 24, 26, 0.3)' : 'transparent'
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = activeLink === 'request-outpass' ? 'rgba(137, 24, 26, 0.3)' : 'transparent'}
                      >
                        Request a Outpass
                      </a>
                    </li>
                    <li>
                      <a
                        href='/student/issue'
                        onClick={() => {handleLinkClick('raise-complaint'); setIsDivVisible(false)}}
                        style={{
                          ...headerStyles.mobileNavLink,
                          backgroundColor: activeLink === 'raise-complaint' ? 'rgba(137, 24, 26, 0.3)' : 'transparent'
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = activeLink === 'raise-complaint' ? 'rgba(137, 24, 26, 0.3)' : 'transparent'}
                      >
                        Raise a Complaint
                      </a>
                    </li>
                  </ul>
                )
              ) : (
                <ul style={headerStyles.mobileNavList}>
                  <li>
                    <Link 
                      to="/login" 
                      style={headerStyles.mobileNavLink}
                      onClick={() => setIsDivVisible(false)}
                      onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                    >
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/signup" 
                      style={headerStyles.mobileNavLink}
                      onClick={() => setIsDivVisible(false)}
                      onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                    >
                      Signup
                    </Link>
                  </li>
                </ul>
              )}
            </div>
          )}

          {isLoggedIn ? (
            <div style={headerStyles.headerLinks}>
              <div className='header-desktop-nav'>
                {user.userType === 'caretaker' ? (
                  <ul style={headerStyles.navList}>
                    <li style={headerStyles.navItem}>
                      <a
                        href='/caretaker/home'
                        onClick={() => handleLinkClick('home')}
                        style={{
                          ...headerStyles.navLink,
                          ...(activeLink === 'home' ? headerStyles.activeLink : {})
                        }}
                        onMouseEnter={(e) => {
                          if (activeLink !== 'home') {
                            e.target.style.backgroundColor = 'rgba(255,255,255,0.1)'
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (activeLink !== 'home') {
                            e.target.style.backgroundColor = 'transparent'
                          }
                        }}
                      >
                        Home
                      </a>
                    </li>
                    <li style={headerStyles.navItem}>
                      <a
                        href='/caretaker/outpasses'
                        onClick={() => handleLinkClick('request-outpass')}
                        style={{
                          ...headerStyles.navLink,
                          ...(activeLink === 'request-outpass' ? headerStyles.activeLink : {})
                        }}
                        onMouseEnter={(e) => {
                          if (activeLink !== 'request-outpass') {
                            e.target.style.backgroundColor = 'rgba(255,255,255,0.1)'
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (activeLink !== 'request-outpass') {
                            e.target.style.backgroundColor = 'transparent'
                          }
                        }}
                      >
                        Outpasses
                      </a>
                    </li>
                    <li style={headerStyles.navItem}>
                      <a
                        href='/caretaker/issues'
                        onClick={() => handleLinkClick('raise-complaint')}
                        style={{
                          ...headerStyles.navLink,
                          ...(activeLink === 'raise-complaint' ? headerStyles.activeLink : {})
                        }}
                        onMouseEnter={(e) => {
                          if (activeLink !== 'raise-complaint') {
                            e.target.style.backgroundColor = 'rgba(255,255,255,0.1)'
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (activeLink !== 'raise-complaint') {
                            e.target.style.backgroundColor = 'transparent'
                          }
                        }}
                      >
                        Issues
                      </a>
                    </li>
                  </ul>
                ) : (
                  <ul style={headerStyles.navList}>
                    <li style={headerStyles.navItem}>
                      <a
                        href='/student/home'
                        onClick={() => handleLinkClick('home')}
                        style={{
                          ...headerStyles.navLink,
                          ...(activeLink === 'home' ? headerStyles.activeLink : {})
                        }}
                        onMouseEnter={(e) => {
                          if (activeLink !== 'home') {
                            e.target.style.backgroundColor = 'rgba(255,255,255,0.1)'
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (activeLink !== 'home') {
                            e.target.style.backgroundColor = 'transparent'
                          }
                        }}
                      >
                        Home
                      </a>
                    </li>
                    <li style={headerStyles.navItem}>
                      <a
                        href='/student/request'
                        onClick={() => handleLinkClick('request-outpass')}
                        style={{
                          ...headerStyles.navLink,
                          ...(activeLink === 'request-outpass' ? headerStyles.activeLink : {})
                        }}
                        onMouseEnter={(e) => {
                          if (activeLink !== 'request-outpass') {
                            e.target.style.backgroundColor = 'rgba(255,255,255,0.1)'
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (activeLink !== 'request-outpass') {
                            e.target.style.backgroundColor = 'transparent'
                          }
                        }}
                      >
                        Request a Outpass
                      </a>
                    </li>
                    <li style={headerStyles.navItem}>
                      <a
                        href='/student/issue'
                        onClick={() => handleLinkClick('raise-complaint')}
                        style={{
                          ...headerStyles.navLink,
                          ...(activeLink === 'raise-complaint' ? headerStyles.activeLink : {})
                        }}
                        onMouseEnter={(e) => {
                          if (activeLink !== 'raise-complaint') {
                            e.target.style.backgroundColor = 'rgba(255,255,255,0.1)'
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (activeLink !== 'raise-complaint') {
                            e.target.style.backgroundColor = 'transparent'
                          }
                        }}
                      >
                        Raise a Complaint
                      </a>
                    </li>
                  </ul>
                )}
              </div>

              <div className='profile' onClick={handleDivClick}>
                <img
                  src='/virat kohli.jpg'
                  alt='Profile Icon'
                  style={headerStyles.profileImage}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'scale(1.1)'
                    e.target.style.borderColor = 'rgb(137, 24, 26)'
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'scale(1)'
                    e.target.style.borderColor = '#ffffff'
                  }}
                />
              </div>
              
              {isBoxVisible && (
                <div ref={popupRef} style={headerStyles.profilePopup}>
                  <img
                    src='/virat kohli.jpg'
                    alt='Profile Icon'
                    style={headerStyles.profilePopupImage}
                  />
                  <h1 style={headerStyles.profileName}>Hi {user.name}!</h1>
                  <p style={headerStyles.profileEmail}>{user.email}</p>
                  <p style={headerStyles.profileDetails}>Profile Details</p>
                  <Link to='/'>
                    <button
                      onClick={handleLogout}
                      style={headerStyles.logoutButton}
                      onMouseEnter={(e) => e.target.style.backgroundColor = 'rgb(180, 30, 32)'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = 'rgb(137, 24, 26)'}
                    >
                      Logout
                    </button>
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <ul style={headerStyles.authLinks} className='header-auth-links'>
              <li>
                <Link 
                  to="/login" 
                  style={headerStyles.authLink}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#ffffff'
                    e.target.style.color = '#000000'
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent'
                    e.target.style.color = '#ffffff'
                  }}
                >
                  Login
                </Link>
              </li>
              <li>
                <Link 
                  to="/signup" 
                  style={headerStyles.authLink}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#ffffff'
                    e.target.style.color = '#000000'
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent'
                    e.target.style.color = '#ffffff'
                  }}
                >
                  Signup
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </>
  )
}
export default Header