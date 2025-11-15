# 🚨 CyberSafe Portal – Cybercrime Reporting & Tracking System

CyberSafe Portal is a secure, modern cybercrime reporting platform built using the **MEN stack (MongoDB, Express, Node.js)** with a professional multi-page frontend.

This platform allows citizens to **report cyber incidents**, track case progress with a **unique token**, and provides an advanced **Admin Panel** for case management.

---

## 📌 Features

### 🧑‍💻 User Features
- Secure Login & Signup (JWT authentication)
- Report cybercrime (supports file uploads)
- Auto-generated Case Token (example: `C-A12BC3`)
- Track case progress by entering token
- User Dashboard with quick actions
- View previously submitted reports
- Profile Management
- Responsive UI and clean interface

---

### 🛡️ Admin Features
- Admin secure login
- Dashboard with **Kanban Board Workflow**:
  - New → In Progress → Completed → Reopened
- View full case details
- Update case status
- Assign cases to admins/investigators
- Timeline history for every action
- Admin profile management
- Statistics (assigned, resolved cases)

---

### 🎨 Frontend UI Includes
- Glass UI effects
- Modern gradients
- Animations & transitions
- Dynamic tables
- Timeline-based case tracking
- Toast notifications
- Clean Auth pages (Login / Signup)

---

## 🏗️ Tech Stack

### Frontend
- HTML5  
- CSS3 (custom design)
- JavaScript (Vanilla)
- FontAwesome Icons

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- Multer (file uploads)
- JWT Authentication
- Bcrypt Password Hashing

---

## 📂 Project Folder Structure

cybersafe-portal/
│
├── server.js
├── package.json
├── .env
├── /uploads # uploaded evidence files
│
├── /public # Frontend
│ ├── index.html
│ ├── login.html
│ ├── signup.html
│ │
│ ├── /user
│ │ ├── dashboard.html
│ │ ├── track-case.html
│ │ ├── my-reports.html
│ │ └── my-profile.html
│ │
│ ├── /admin
│ │ ├── dashboard.html
│ │ └── adminprofile.html
│ │
│ ├── /css
│ │ ├── style.css
│ │ ├── user-style.css
│ │ ├── auth.css
│ │ ├── admin.css
│ │ ├── admin-profile.css
│ │ ├── track.css
│ │ └── my-reports.css
│ │
│ ├── /js
│ │ ├── main.js
│ │ ├── auth.js
│ │ ├── track.js
│ │ ├── my-reports.js
│ │ ├── admin.js
│ │ └── admin-profile.js
│ │
│ └── /img
│ ├── default-user.png
│ └── logo.png
│
└── /backend # Backend Core
├── /config
│ └── db.js
├── /models
│ ├── User.js
│ └── Case.js
├── /controllers
│ ├── authController.js
│ └── caseController.js
├── /routes
│ ├── authRoutes.js
│ └── caseRoutes.js
└── /middleware
└── authMiddleware.js


📘 Case Workflow

User submits case
System generates unique token (e.g., C-AB1234)
Admin sees “New Cases”
Admin assigns → updates status → writes notes
User tracks case via token
Case moves across Kanban stages

🚀 Future Enhancements
OTP / Email verification
Case resolution PDF export
Admin chat with users
Live tracking timeline
Push notifications (WebSockets)
Cloud upload (S3)

🤝 Contributing
Pull requests are welcome!
Please open an issue first for major changes.

📜 License
MIT License © 2025 CyberSafe Portal
