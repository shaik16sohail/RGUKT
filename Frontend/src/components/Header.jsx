import React, { useState, useEffect, useRef } from 'react'
import '../index.css'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { toast } from 'react-toastify';

function Header () {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
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
        `${backendUrl}/api/auth/logout`,
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
      background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #0d0d0d 100%)',
      borderBottom: '3px solid rgba(137, 24, 26, 0.6)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.9), 0 0 50px rgba(137, 24, 26, 0.15)',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      width: '100%',
      backdropFilter: 'blur(15px)',
      WebkitBackdropFilter: 'blur(15px)',
      transition: 'all 0.3s ease'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0.75rem 1rem',
      maxWidth: '1400px',
      margin: '0 auto',
      minHeight: '70px',
      position: 'relative',
      width: '100%',
      boxSizing: 'border-box'
    },
    headerLogo: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.8rem',
      flex: '0 0 auto'
    },
    bars: {
      display: 'none',
      cursor: 'pointer',
      padding: '0.5rem',
      borderRadius: '10px',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      background: 'rgba(137, 24, 26, 0.15)',
      border: '2px solid rgba(137, 24, 26, 0.4)',
      boxShadow: '0 4px 15px rgba(137, 24, 26, 0.2)',
      position: 'relative',
      overflow: 'hidden'
    },
    logoImage: {
      width: '50px',
      height: '50px',
      // borderRadius: '50%',
      // transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      // border: '3px solid rgba(137, 24, 26, 0.4)',
      // boxShadow: '0 6px 20px rgba(137, 24, 26, 0.25), inset 0 2px 10px rgba(255, 255, 255, 0.1)',
      filter: 'brightness(1.1)'
    },
    logoTitle: {
      background: 'linear-gradient(45deg, rgb(137, 24, 26) 0%, #ff4444 50%, #ff6666 100%)',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      fontSize: '2.3rem',
      fontWeight: '900',
      textShadow: '0 0 30px rgba(137, 24, 26, 0.4)',
      margin: 0,
      fontFamily: '"Inter", "Segoe UI", sans-serif',
      letterSpacing: '-0.03em',
      position: 'relative',
      whiteSpace: 'nowrap'
    },
    headerLinks: {
      display: 'flex',
      alignItems: 'center',
      gap: '1.5rem',
      flex: '0 0 auto'
    },
    navList: {
      display: 'flex',
      listStyle: 'none',
      margin: 0,
      padding: 0,
      gap: '0.3rem',
      alignItems: 'center'
    },
    navItem: {
      margin: 0
    },
    navLink: {
      color: '#ffffff',
      textDecoration: 'none',
      fontSize: '0.9rem',
      fontWeight: '600',
      padding: '0.6rem 1.2rem',
      borderRadius: '10px',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      position: 'relative',
      display: 'block',
      fontFamily: '"Inter", sans-serif',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      background: 'rgba(255, 255, 255, 0.03)',
      backdropFilter: 'blur(5px)',
      WebkitBackdropFilter: 'blur(5px)'
    },
    activeLink: {
      background: 'linear-gradient(135deg, rgba(137, 24, 26, 0.4), rgba(137, 24, 26, 0.6))',
      color: '#ffffff',
      borderRadius: '10px',
      boxShadow: '0 4px 15px rgba(137, 24, 26, 0.4), inset 0 1px 3px rgba(255, 255, 255, 0.2)',
      border: '1px solid rgba(137, 24, 26, 0.7)',
      transform: 'translateY(-1px)'
    },
    profileImage: {
      height: '42px',
      width: '42px',
      borderRadius: '50%',
      cursor: 'pointer',
      border: '3px solid rgba(255, 255, 255, 0.4)',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      boxShadow: '0 6px 20px rgba(0, 0, 0, 0.4), inset 0 2px 8px rgba(255, 255, 255, 0.1)',
      filter: 'brightness(1.05)'
    },
    profilePopup: {
      position: 'fixed',
      top: '85px',
      right: '20px',
      padding: '1.5rem',
      borderRadius: '20px',
      color: 'white',
      width: '280px',
      background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 50%, #1f1f1f 100%)',
      boxShadow: '0 25px 80px rgba(0, 0, 0, 0.95), 0 0 0 1px rgba(255, 255, 255, 0.1), inset 0 1px 10px rgba(255, 255, 255, 0.05)',
      textAlign: 'center',
      zIndex: 2000,
      border: '2px solid rgba(137, 24, 26, 0.4)',
      backdropFilter: 'blur(25px)',
      WebkitBackdropFilter: 'blur(25px)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      animation: 'slideIn 0.3s ease-out'
    },
    profilePopupImage: {
      height: '75px',
      width: '75px',
      borderRadius: '50%',
      marginBottom: '1rem',
      border: '4px solid rgba(137, 24, 26, 0.6)',
      boxShadow: '0 8px 25px rgba(137, 24, 26, 0.4), inset 0 2px 8px rgba(255, 255, 255, 0.1)',
      alignSelf: 'center',
      filter: 'brightness(1.1)'
    },
    profileName: {
      fontSize: '1.3rem',
      marginBottom: '0.4rem',
      fontWeight: '800',
      background: 'linear-gradient(45deg, #ffffff, #f0f0f0, #ffffff)',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      textShadow: '0 2px 10px rgba(255, 255, 255, 0.1)'
    },
    profileEmail: {
      fontSize: '0.9rem',
      color: '#ccc',
      marginBottom: '0.8rem',
      opacity: 0.9,
      fontWeight: '500'
    },
    profileDetails: {
      color: '#ffffff',
      marginBottom: '1rem',
      fontSize: '0.95rem',
      opacity: 0.95,
      fontWeight: '500'
    },
    logoutButton: {
      background: 'linear-gradient(135deg, rgb(137, 24, 26) 0%, #ff3333 50%, #ff4444 100%)',
      color: 'white',
      border: 'none',
      padding: '0.8rem 1.5rem',
      borderRadius: '12px',
      cursor: 'pointer',
      width: '100%',
      fontSize: '1rem',
      fontWeight: '700',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      boxShadow: '0 6px 20px rgba(137, 24, 26, 0.5), inset 0 1px 3px rgba(255, 255, 255, 0.2)',
      fontFamily: '"Inter", sans-serif',
      textTransform: 'uppercase',
      letterSpacing: '0.5px'
    },
    mobileMenu: {
      position: 'fixed',
      top: '70px',
      left: '0',
      width: '100%',
      background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #0d0d0d 100%)',
      borderTop: '3px solid rgba(137, 24, 26, 0.6)',
      zIndex: 1999,
      padding: '1.5rem 1rem',
      boxShadow: '0 12px 40px rgba(0, 0, 0, 0.95), inset 0 1px 10px rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(15px)',
      WebkitBackdropFilter: 'blur(15px)',
      animation: 'slideDown 0.3s ease-out'
    },
    mobileNavList: {
      listStyle: 'none',
      margin: 0,
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: '0.8rem',
      maxWidth: '400px',
      marginLeft: 'auto',
      marginRight: 'auto'
    },
    mobileNavLink: {
      color: '#ffffff',
      textDecoration: 'none',
      fontSize: '1.1rem',
      padding: '1rem 1.5rem',
      borderRadius: '12px',
      display: 'block',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      fontWeight: '600',
      fontFamily: '"Inter", sans-serif',
      background: 'rgba(255, 255, 255, 0.05)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(5px)',
      WebkitBackdropFilter: 'blur(5px)',
      textAlign: 'center'
    },
    authLinks: {
      display: 'flex',
      listStyle: 'none',
      margin: 0,
      padding: 0,
      gap: '0.8rem',
      alignItems: 'center'
    },
    authLink: {
      color: '#ffffff',
      textDecoration: 'none',
      fontSize: '0.95rem',
      fontWeight: '700',
      padding: '0.6rem 1.2rem',
      borderRadius: '12px',
      border: '2px solid rgba(255, 255, 255, 0.4)',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      background: 'rgba(255, 255, 255, 0.08)',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      fontFamily: '"Inter", sans-serif',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)'
    }
  }

  // Enhanced media queries with better responsive handling
  const mediaQueries = `
    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(-10px) scale(0.95);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }
    
    @keyframes slideDown {
      from {
        opacity: 0;
        transform: translateY(-20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @media (max-width: 1024px) {
      .header-desktop-nav {
        display: none;
      }
      .header-mobile-toggle {
        display: block !important;
      }
    }
    
    @media (max-width: 768px) {
      .header-desktop-nav {
        display: none;
      }
      .header-mobile-toggle {
        display: block !important;
      }
      .header-logo h1 {
        font-size: 2rem !important;
      }
      .header-logo img {
        width: 42px !important;
        height: 42px !important;
      }
      .header-auth-links {
        gap: 0.6rem !important;
      }
      .header-auth-links a {
        padding: 0.5rem 0.5rem !important;
        font-size: 0.69rem !important;
      }
      .profile-popup {
        width: 260px !important;
        right: 15px !important;
        top: 75px !important;
      }
    }
    
    @media (min-width: 1025px) {
      .header-mobile-toggle {
        display: none !important;
      }
    }
      @media(max-width:450px){
        fontSize:0.69rem;
        fontWeight:500;
      }
    
    
    @media (max-width: 480px) {
      .header-container {
        padding: 0.5rem 0.75rem !important;
      }
      .logoutButton{
        fontSize:0.75rem;
        font weight:500;
      }
      .header-logo {
        gap: 0.6rem !important;
      }
      .header-logo h1 {
        font-size: 1.7rem !important;
        letter-spacing: -0.02em !important;
      }
      .header-logo img {
        width: 38px !important;
        height: 38px !important;
      }
      .header-auth-links {
        gap: 0.4rem !important;
      }
      .header-auth-links a {
        padding: 0.4rem 0.4rem !important;
        font-size: 0.69rem !important;
        letter-spacing: 0.2px !important;
      }
      .profile-popup {
        width: 250px !important;
        right: 10px !important;
        top: 70px !important;
        padding: 1.2rem !important;
      }
      .mobile-menu {
        padding: 1rem 0.75rem !important;
      }
    }
    
    @media (max-width: 400px) {
      .header-container {
        padding: 0.4rem 0.5rem !important;
        min-height: 65px !important;
      }
      .header-logo h1 {
        font-size: 1.6rem !important;
      }
      .header-logo img {
        width: 35px !important;
        height: 35px !important;
      }
      .header-auth-links a {
        padding: 0.35rem 0.6rem !important;
        font-size: 0.75rem !important;
      }
      .profile-popup {
        width: 240px !important;
        right: 5px !important;
      }
    }
    
    @media (max-width: 320px) {
      .header-logo h1 {
        font-size: 0.9rem !important;
      }
      .header-logo img {
        width: 32px !important;
        height: 32px !important;
      }
      .header-auth-links {
        flex-direction: column !important;
        gap: 0.3rem !important;
      }
      .header-auth-links a {
        padding: 0.3rem 0.5rem !important;
        font-size: 0.7rem !important;
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
      { ...baseStyle, backgroundColor: 'rgba(137, 24, 26, 0.5)', border: '2px solid rgba(137, 24, 26, 0.7)', transform: 'scale(1.02)' } : 
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
              { backgroundColor: 'rgba(137, 24, 26, 0.5)', border: '2px solid rgba(137, 24, 26, 0.7)', transform: 'scale(1.02)' } : 
              headerStyles.activeLink) : {})
          }}
          onMouseEnter={(e) => {
            if (activeLink !== item.key) {
              e.target.style.backgroundColor = isMobile ? 'rgba(137, 24, 26, 0.25)' : 'rgba(137, 24, 26, 0.2)';
              e.target.style.borderColor = 'rgba(137, 24, 26, 0.6)';
              e.target.style.transform = isMobile ? 'scale(1.05)' : 'translateY(-3px) scale(1.05)';
              e.target.style.boxShadow = '0 8px 25px rgba(137, 24, 26, 0.3)';
            }
          }}
          onMouseLeave={(e) => {
            if (activeLink !== item.key) {
              e.target.style.backgroundColor = isMobile ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.03)';
              e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
              e.target.style.transform = isMobile ? 'scale(1)' : 'translateY(0) scale(1)';
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
        <div style={headerStyles.header} className='container mx-auto header-container'>
          <div style={headerStyles.headerLogo} className='header-logo'>
            {isLoggedIn && user.userType !== 'warden' && (
              <div 
                style={headerStyles.bars} 
                className='header-mobile-toggle'
                onClick={toggleDiv}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = 'rgba(137, 24, 26, 0.4)';
                  // e.target.style.transform = 'scale(1.1) rotate(5deg)';
                  e.target.style.boxShadow = '0 6px 20px rgba(137, 24, 26, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'rgba(137, 24, 26, 0.15)';
                  e.target.style.transform = 'scale(1) rotate(0deg)';
                  e.target.style.boxShadow = '0 4px 15px rgba(137, 24, 26, 0.2)';
                }}
              >
                <i
                  className='fa-solid fa-bars text-white'
                  style={{ fontSize: '1.2rem' }}
                ></i>
              </div>
            )}
            <a href='/'>
              <img
                src='/rguktLogo.png'
                style={headerStyles.logoImage}
                className='rotating-image'
                onMouseEnter={(e) => {
                  e.target.style.transform = 'scale(1.2) rotate(15deg)';
                  e.target.style.borderColor = 'rgb(137, 24, 26)';
                  e.target.style.boxShadow = '0 10px 35px rgba(137, 24, 26, 0.5), inset 0 3px 15px rgba(255, 255, 255, 0.2)';
                  e.target.style.filter = 'brightness(1.3)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1) rotate(0deg)';
                  e.target.style.borderColor = 'rgba(137, 24, 26, 0.4)';
                  e.target.style.boxShadow = '0 6px 20px rgba(137, 24, 26, 0.25), inset 0 2px 10px rgba(255, 255, 255, 0.1)';
                  e.target.style.filter = 'brightness(1.1)';
                }}
              />
            </a>
            <a href='/'>
              <h1 style={headerStyles.logoTitle}>Stay Master</h1>
            </a>
          </div>

          {isDivVisible && isLoggedIn && user.userType !== 'warden' && (
            <div style={headerStyles.mobileMenu} className="mobile-menu">
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
                  src='/profile.png'
                  alt='Profile Icon'
                  style={headerStyles.profileImage}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'scale(1.2) rotate(5deg)';
                    e.target.style.borderColor = 'rgb(137, 24, 26)';
                    e.target.style.boxShadow = '0 10px 30px rgba(137, 24, 26, 0.5), inset 0 3px 12px rgba(255, 255, 255, 0.2)';
                    e.target.style.filter = 'brightness(1.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'scale(1) rotate(0deg)';
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.4)';
                    e.target.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.4), inset 0 2px 8px rgba(255, 255, 255, 0.1)';
                    e.target.style.filter = 'brightness(1.05)';
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
                        e.target.style.background = 'linear-gradient(135deg, rgb(180, 30, 32) 0%, #ff4444 50%, #ff6666 100%)';
                        e.target.style.transform = 'translateY(-3px) scale(1.05)';
                        e.target.style.boxShadow = '0 10px 35px rgba(137, 24, 26, 0.6), inset 0 2px 8px rgba(255, 255, 255, 0.3)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = 'linear-gradient(135deg, rgb(137, 24, 26) 0%, #ff3333 50%, #ff4444 100%)';
                        e.target.style.transform = 'translateY(0) scale(1)';
                        e.target.style.boxShadow = '0 6px 20px rgba(137, 24, 26, 0.5), inset 0 1px 3px rgba(255, 255, 255, 0.2)';
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
                    e.target.style.background = 'linear-gradient(135deg, rgba(137, 24, 26, 0.3), rgba(137, 24, 26, 0.5))';
                    e.target.style.borderColor = 'rgb(137, 24, 26)';
                    e.target.style.transform = 'translateY(-3px) scale(1.05)';
                    e.target.style.boxShadow = '0 8px 25px rgba(137, 24, 26, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'rgba(255, 255, 255, 0.08)';
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.4)';
                    e.target.style.transform = 'translateY(0) scale(1)';
                    e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.3)';
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
                    e.target.style.background = 'linear-gradient(135deg, rgba(137, 24, 26, 0.3), rgba(137, 24, 26, 0.5))';
                    e.target.style.borderColor = 'rgb(137, 24, 26)';
                    e.target.style.transform = 'translateY(-3px) scale(1.05)';
                    e.target.style.boxShadow = '0 8px 25px rgba(137, 24, 26, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'rgba(255, 255, 255, 0.08)';
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.4)';
                    e.target.style.transform = 'translateY(0) scale(1)';
                    e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.3)';
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