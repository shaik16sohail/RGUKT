import  React,{useState} from 'react'
import '../index.css'
import { Height } from '@mui/icons-material'

function Header () {
  // const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isBoxVisible, setIsBoxVisible] = useState(false);
  const handleDivClick = (event) => {
    event.preventDefault();
    setIsBoxVisible(!isBoxVisible); // Toggle visibility
};
  // const[isProfileDropdownOpen,setIsProfileDropdownOpen]=useState(false);
  // const handleProfileClick = () => {
  //   setIsPopupOpen((prevState) => !prevState); // Toggle the popup
  // };
//   const handleprofileClick=(index)=>{
//     setIsProfileDropdownOpen(!isProfileDropdownOpen);
// }
  return (
    <>
      <div className='header'>
        <div className='header-logo'>

          <img
            src='/rguktLogo.png'
            style={{
              width: '60px',
              height: '60px'
  
            }}
          ></img>
          <h1>FREEGO</h1>
        </div>
        
        <div className='header-links'>
        <ul>
          <li><a href='#'>Home</a></li>
          {/* <li></li> */}
          <li><a href='#'>Request a Outpass</a></li>
          <li><a href='#'>Raise a Complaint</a></li>
        </ul>
        <div className="profile" onClick={handleDivClick}>
            <img
              src="/profile-user.png"
              alt="Profile Icon"
              style={{ height: "1.8rem", cursor: "pointer" }}
            />
          </div>
          {isBoxVisible && (
            <div
              style={{
                position: "fixed",
                top: "70px",
                right: "20px",
                padding: "10px",
                borderRadius: "15px",
                width: "150px",
                backgroundColor: "#E0E0E0",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                zIndex: 1000, // Ensures the dialog is above other elements
              }}
            >
              <p style={{ fontSize: "15px" }}>user@example.com</p>
              <button
                onClick={() => setIsBoxVisible(false)}
                style={{
                  backgroundColor: "#FF4D4D",
                  color: "white",
                  border: "none",
                  padding: "5px 10px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  width: "100%",
                }}
              >
                Logout
              </button>
            </div>
          )}
      
        

        </div>
      </div>
     
    </>
  )
}
export default Header
