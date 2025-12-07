# 🎟️ Graviti - Modern Event Booking Platform

Graviti is a full-stack event management and booking system designed to provide a seamless experience for users to discover, book, and manage event tickets. It features a robust **Admin Dashboard**, **Real-time Seat Locking**, **QR Code Ticket Generation**, and **Interactive Maps**.

![Project Banner](https://via.placeholder.com/1200x500?text=Graviti+Event+Booking+System)
*(Replace this link with a screenshot of your Home Page)*

## 🚀 Features

### 👤 User Features
* **Authentication:** Secure Login & Registration using JWT (JSON Web Tokens).
* **Discover Events:** Browse events with **Search & Filter** (Location, Title, Category).
* **Interactive Calendar:** Visual calendar view to find events by date.
* **Smart Booking:** Real-time seat availability checks to prevent overbooking.
* **My Tickets:** Dashboard to view booking history and status.
* **E-Tickets:** Auto-generated **QR Code Tickets** that can be downloaded as images.
* **Google Maps:** Integrated map view for event locations.
* **Email Notifications:** Automated email confirmation upon booking.
* **Cancellations:** Easy booking cancellation with auto-refund of seat inventory.

### 🛡️ Admin Features
* **Dashboard Overview:** Visual analytics for Total Revenue, Bookings, and Events.
* **Event Management:** Create, Update, and Delete events with **Image Uploads** (Cloudinary).
* **Booking Management:** View all user bookings and statuses.
* **Role-Based Access Control:** Strict security ensuring only Admins can access the dashboard.

---

## 🛠️ Tech Stack

### **Frontend (Client)**
* **React.js** (Vite)
* **Tailwind CSS** (Styling & Responsive Design)
* **Axios** (API Requests)
* **React Calendar** (Date-based browsing)
* **React QR Code** (Ticket Generation)
* **Framer Motion** (Animations)

### **Backend (Server)**
* **Node.js & Express.js** (REST API)
* **MySQL** (Relational Database via **Aiven Cloud**)
* **Cloudinary** (Image Storage)
* **Nodemailer** (Email Service)
* **JWT & Bcrypt** (Security & Auth)

---

## ⚙️ Installation & Setup

Follow these steps to run the project locally.

### 1. Clone the Repository
```bash
git clone [https://github.com/your-username/graviti-events.git](https://github.com/your-username/graviti-events.git)
cd graviti-events
