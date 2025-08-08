# StayMaster

StayMaster is a full-stack web application designed to simplify and secure the **hostel outpass management process** in college campuses. It addresses real-world problems faced by students and caretakers by integrating modern technologies like QR scanning, face recognition, and location tracking.

---

##  Features

-  **QR Code-Based Outpass System**  
  Students receive a QR code via email once their outpass request is approved by the caretaker.

-  **Face Recognition Verification**  
  Extra layer of security with face recognition after scanning the QR code.

-  **Real-Time Location Tracking**  
  Caretakers can track the location of students who have left the campus using an approved outpass for up to 24 hours.

-  **Hostel-Specific Chat Groups**  
  Each hostel has its own chat group for communication between students and the caretaker.

-  **Issue Reporting**  
  Students can raise complaints or issues directly from their portal.

-  **Caretaker Feedback System**  
  Students can submit anonymous feedback about their caretaker.

-  **Emergency Outpass with Payment Integration**  
  Emergency outpass requests supported with **Stripe test-mode payments**.

---

## 🛠 Tech Stack

- **Frontend:** React.js, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT, Cookies
- **QR Code:** qrcode, EmailJS
- **Face Recognition:** face-api.js
- **Payments:** Stripe (Testing Mode)
- **Others:** Socket.IO (for real-time chat), GeoLocation APIs

