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
      background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)',
      borderBottom: '3px solid rgba(137, 24, 26, 0.5)',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.8), 0 0 40px rgba(137, 24, 26, 0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      width: '100%',
      backdropFilter: 'blur(10px)'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 1.5rem',
      maxWidth: '1400px',
      margin: '0 auto',
      minHeight: '80px',
      position: 'relative'
    },
    headerLogo: {
      display: 'flex',
      alignItems: 'center',
      gap: '1.2rem'
    },
    bars: {
      display: 'none',
      cursor: 'pointer',
      padding: '0.6rem',
      borderRadius: '8px',
      transition: 'all 0.3s ease',
      background: 'rgba(137, 24, 26, 0.1)',
      border: '1px solid rgba(137, 24, 26, 0.3)'
    },
    logoImage: {
      width: '55px',
      height: '55px',
      borderRadius: '50%',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      border: '3px solid rgba(137, 24, 26, 0.3)',
      boxShadow: '0 4px 15px rgba(137, 24, 26, 0.2)'
    },
    logoTitle: {
      background: 'linear-gradient(45deg, rgb(137, 24, 26), #ff4444)',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      fontSize: '2rem',
      fontWeight: '800',
      textShadow: '0 0 20px rgba(137, 24, 26, 0.3)',
      margin: 0,
      fontFamily: '"Inter", "Segoe UI", sans-serif',
      letterSpacing: '-0.02em'
    },
    headerLinks: {
      display: 'flex',
      alignItems: 'center',
      gap: '2.5rem'
    },
    navList: {
      display: 'flex',
      listStyle: 'none',
      margin: 0,
      padding: 0,
      gap: '0.5rem',
      alignItems: 'center'
    },
    navItem: {
      margin: 0
    },
    navLink: {
      color: '#ffffff',
      textDecoration: 'none',
      fontSize: '0.95rem',
      fontWeight: '600',
      padding: '0.8rem 1.5rem',
      borderRadius: '8px',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      position: 'relative',
      display: 'block',
      fontFamily: '"Inter", sans-serif'
    },
    activeLink: {
      background: 'linear-gradient(135deg, rgba(137, 24, 26, 0.3), rgba(137, 24, 26, 0.5))',
      color: '#ffffff',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(137, 24, 26, 0.3)'
    },
    profileImage: {
      height: '45px',
      width: '45px',
      borderRadius: '50%',
      cursor: 'pointer',
      border: '3px solid rgba(255, 255, 255, 0.3)',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)'
    },
    profilePopup: {
      position: 'fixed',
      top: '90px',
      right: '30px',
      padding: '1.5rem',
      borderRadius: '16px',
      color: 'white',
      width: '260px',
      background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.9), 0 0 0 1px rgba(255, 255, 255, 0.1)',
      textAlign: 'center',
      zIndex: 2000,
      border: '1px solid rgba(137, 24, 26, 0.3)',
      backdropFilter: 'blur(20px)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    profilePopupImage: {
      height: '70px',
      width: '70px',
      borderRadius: '50%',
      marginBottom: '1rem',
      border: '3px solid rgba(137, 24, 26, 0.5)',
      boxShadow: '0 6px 20px rgba(137, 24, 26, 0.3)',
      alignSelf: 'center'
    },
    profileName: {
      fontSize: '1.2rem',
      marginBottom: '0.4rem',
      fontWeight: '700',
      background: 'linear-gradient(45deg, #ffffff, #f0f0f0)',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent'
    },
    profileEmail: {
      fontSize: '0.9rem',
      color: '#bbb',
      marginBottom: '1rem',
      opacity: 0.8
    },
    profileDetails: {
      color: '#ffffff',
      marginBottom: '1rem',
      fontSize: '0.95rem',
      opacity: 0.9
    },
    logoutButton: {
      background: 'linear-gradient(135deg, rgb(137, 24, 26), #ff3333)',
      color: 'white',
      border: 'none',
      padding: '0.7rem 1.2rem',
      borderRadius: '10px',
      cursor: 'pointer',
      width: '100%',
      fontSize: '1rem',
      fontWeight: '600',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      boxShadow: '0 4px 12px rgba(137, 24, 26, 0.4)',
      fontFamily: '"Inter", sans-serif'
    },
    mobileMenu: {
      position: 'fixed',
      top: '80px',
      left: '0',
      width: '100%',
      background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)',
      borderTop: '2px solid rgba(137, 24, 26, 0.5)',
      zIndex: 1999,
      padding: '1.5rem',
      boxShadow: '0 8px 30px rgba(0, 0, 0, 0.9)',
      backdropFilter: 'blur(10px)'
    },
    mobileNavList: {
      listStyle: 'none',
      margin: 0,
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: '0.8rem'
    },
    mobileNavLink: {
      color: '#ffffff',
      textDecoration: 'none',
      fontSize: '1.1rem',
      padding: '1rem 1.5rem',
      borderRadius: '8px',
      display: 'block',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      fontWeight: '500',
      fontFamily: '"Inter", sans-serif'
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
      fontWeight: '600',
      padding: '0.7rem 1.5rem',
      borderRadius: '12px',
      border: '2px solid rgba(255, 255, 255, 0.3)',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(5px)',
      fontFamily: '"Inter", sans-serif'
    }
  }

  // Enhanced media queries for better responsiveness
  const mediaQueries = `
    @media (max-width: 768px) {
      .header-desktop-nav {
        display: none;
      }
      .header-mobile-toggle {
        display: block !important;
      }
      .header-logo h1 {
        font-size: 1.5rem;
      }
      .header-logo img {
        width: 45px;
        height: 45px;
      }
      .header-auth-links {
        gap: 0.8rem;
      }
      .header-auth-links a {
        padding: 0.6rem 1rem;
        font-size: 0.9rem;
      }
    }
    
    @media (min-width: 769px) {
      .header-mobile-toggle {
        display: none;
      }
    }
    
    @media (max-width: 480px) {
      .header-logo h1 {
        font-size: 1.3rem;
      }
      .header-auth-links {
        gap: 0.5rem;
      }
      .header-auth-links a {
        padding: 0.5rem 0.8rem;
        font-size: 0.85rem;
      }
      .profile-popup {
        width: 280px;
        right: 10px;
      }
    }
    
    @media (max-width: 360px) {
      .header-logo h1 {
        font-size: 1.1rem;
      }
      .header-logo img {
        width: 35px;
        height: 35px;
      }
    }
  `

  // Enhanced navigation items with Chats
  const getNavigationItems = (userType, isMobile = false) => {
    if (userType === 'warden') {
      return null; // No navigation items for warden
    }

    const baseStyle = isMobile ? headerStyles.mobileNavLink : headerStyles.navLink;
    const activeStyle = isMobile ? 
      { ...baseStyle, backgroundColor: 'rgba(137, 24, 26, 0.4)', border: '1px solid rgba(137, 24, 26, 0.6)' } : 
      { ...baseStyle, ...headerStyles.activeLink };

    const navItems = userType === 'caretaker' ? [
      { key: 'home', label: 'Home', href: '/caretaker/home' },
      { key: 'outpasses', label: 'Outpasses', href: '/caretaker/outpasses' },
      { key: 'issues', label: 'Issues', href: '/caretaker/issues' },
      { key: 'chats', label: 'Chats', href: '/chats' }
    ] : [
      { key: 'home', label: 'Home', href: '/student/home' },
      { key: 'request-outpass', label: 'Request Outpass', href: '/student/request' },
      { key: 'raise-complaint', label: 'Raise Complaint', href: '/student/issue' },
      { key: 'chats', label: 'Chats', href: '/chats' }
    ];

    return navItems.map(item => (
      <li key={item.key} style={isMobile ? {} : headerStyles.navItem}>
        <a
          href={item.href}
          onClick={() => {
            handleLinkClick(item.key);
            if (isMobile) setIsDivVisible(false);
          }}
          style={{
            ...baseStyle,
            ...(activeLink === item.key ? (isMobile ? 
              { backgroundColor: 'rgba(137, 24, 26, 0.4)', border: '1px solid rgba(137, 24, 26, 0.6)' } : 
              headerStyles.activeLink) : {})
          }}
          onMouseEnter={(e) => {
            if (activeLink !== item.key) {
              e.target.style.backgroundColor = isMobile ? 'rgba(137, 24, 26, 0.2)' : 'rgba(137, 24, 26, 0.15)';
              e.target.style.borderColor = 'rgba(137, 24, 26, 0.4)';
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 6px 20px rgba(137, 24, 26, 0.2)';
            }
          }}
          onMouseLeave={(e) => {
            if (activeLink !== item.key) {
              e.target.style.backgroundColor = isMobile ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.05)';
              e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }
          }}
        >
          {item.label}
        </a>
      </li>
    ));
  };

  return (
    <>
      <style>{mediaQueries}</style>
      <div style={headerStyles.overallHead}>
        <div style={headerStyles.header} className='container mx-auto'>
          <div style={headerStyles.headerLogo} className='header-logo'>
            {isLoggedIn && user.userType !== 'warden' && (
              <div 
                style={headerStyles.bars} 
                className='header-mobile-toggle'
                onClick={toggleDiv}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = 'rgba(137, 24, 26, 0.3)';
                  e.target.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'rgba(137, 24, 26, 0.1)';
                  e.target.style.transform = 'scale(1)';
                }}
              >
                <i
                  className='fa-solid fa-bars text-white'
                  style={{ fontSize: '1.3rem' }}
                ></i>
              </div>
            )}
            <a href='/'>
              <img
                src='/rguktLogo.png'
                style={headerStyles.logoImage}
                className='rotating-image'
                onMouseEnter={(e) => {
                  e.target.style.transform = 'scale(1.15) rotate(10deg)';
                  e.target.style.borderColor = 'rgb(137, 24, 26)';
                  e.target.style.boxShadow = '0 8px 30px rgba(137, 24, 26, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1) rotate(0deg)';
                  e.target.style.borderColor = 'rgba(137, 24, 26, 0.3)';
                  e.target.style.boxShadow = '0 4px 15px rgba(137, 24, 26, 0.2)';
                }}
              />
            </a>
            <a href='/'>
              <h1 style={headerStyles.logoTitle}>Stay Master</h1>
            </a>
          </div>

          {isDivVisible && isLoggedIn && user.userType !== 'warden' && (
            <div style={headerStyles.mobileMenu}>
              <ul style={headerStyles.mobileNavList}>
                {getNavigationItems(user.userType, true)}
              </ul>
            </div>
          )}

          {isLoggedIn ? (
            <div style={headerStyles.headerLinks}>
              {user.userType !== 'warden' && (
                <div className='header-desktop-nav'>
                  <ul style={headerStyles.navList}>
                    {getNavigationItems(user.userType, false)}
                  </ul>
                </div>
              )}

              <div className='profile' onClick={handleDivClick}>
                <img
                  src='/virat kohli.jpg'
                  alt='Profile Icon'
                  style={headerStyles.profileImage}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'scale(1.15)';
                    e.target.style.borderColor = 'rgb(137, 24, 26)';
                    e.target.style.boxShadow = '0 8px 25px rgba(137, 24, 26, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'scale(1)';
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                    e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.3)';
                  }}
                />
              </div>
              
              {isBoxVisible && (
                <div ref={popupRef} style={headerStyles.profilePopup} className="profile-popup">
                  <img
                    src='/virat kohli.jpg'
                    alt='Profile Icon'
                    style={headerStyles.profilePopupImage}
                  />
                  <h1 style={headerStyles.profileName}>Hi {user.name}!</h1>
                  <p style={headerStyles.profileEmail}>{user.email}</p>
                 <p style={headerStyles.profileEmail}>{user.hostelName}</p>
                  <Link to='/'>
                    <button
                      onClick={handleLogout}
                      style={headerStyles.logoutButton}
                      onMouseEnter={(e) => {
                        e.target.style.background = 'linear-gradient(135deg, rgb(180, 30, 32), #ff4444)';
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = '0 8px 25px rgba(137, 24, 26, 0.5)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = 'linear-gradient(135deg, rgb(137, 24, 26), #ff3333)';
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '0 4px 15px rgba(137, 24, 26, 0.4)';
                      }}
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
                    e.target.style.background = 'linear-gradient(135deg, rgba(137, 24, 26, 0.2), rgba(137, 24, 26, 0.4))';
                    e.target.style.borderColor = 'rgb(137, 24, 26)';
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 6px 20px rgba(137, 24, 26, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'none';
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
                    e.target.style.background = 'linear-gradient(135deg, rgba(137, 24, 26, 0.2), rgba(137, 24, 26, 0.4))';
                    e.target.style.borderColor = 'rgb(137, 24, 26)';
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 6px 20px rgba(137, 24, 26, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'none';
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