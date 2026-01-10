# Evolvv Smart Parking System

A professional-grade, full-stack smart parking management solution featuring role-based access control (RBAC), real-time parking metrics, and automated valet task management. Built to optimize urban parking logistics through a seamless interface for customers, managers, and drivers.

## Technical Stack

* **Frontend:** React.js, SASS (SCSS Modules), Lucide React (Icons).
* **Backend:** Node.js, Express.js.
* **Database:** PostgreSQL (Hosted via Supabase).
* **Deployment:** Vercel (Frontend), Render (Backend).
* **Communication:** RESTful API with Axios.

## Core Features

### 1. Multi-Role Ecosystem (RBAC)
The application implements a custom Context API-based role switching mechanism to demonstrate four distinct user flows:
* **User/Customer:** Scan QR to park, manage saved vehicles, view digital tickets, and request vehicle retrieval.
* **Manager:** Real-time dashboard for site occupancy, revenue tracking, and valet driver onboarding.
* **Driver (Valet):** Specialized task console to accept parking assignments, track active tasks, and complete sessions.
* **Super Admin:** Global system overview, multi-site management, and approval workflow for new driver registrations.

### 2. High-Performance Architecture
* **Modular Backend:** Organized using the Controller-Route pattern to separate business logic from routing, ensuring the system is extensible.
* **Hybrid Data Layer:** Implements a robust "Mock-Fallback" logic in controllers. If the primary PostgreSQL database is unreachable, the system gracefully degrades to using in-memory mock data to ensure 100% uptime for demonstration purposes.
* **Dynamic Theming:** Utilizes SCSS mixins and global body classes to instantly shift the visual language (colors and layouts) based on the active user role.

### 3. Smart Logistics Workflow
* **Digital Ticketing:** Replaces physical slips with a QR-based system.
* **Real-Time Progress Tracking:** Live "Retrieval" status updates for customers using a state-driven timeline component.
* **Advanced Metrics:** Automated calculation of occupancy percentages and revenue trends on the Manager Dashboard.

## Project Structure

```text
/backend
  ├── config/          # Database connection and environment config
  ├── controllers/     # Business logic and database queries
  ├── middleware/      # CORS and body-parser setup
  ├── routes/          # API endpoint definitions
  └── server.js        # Entry point

/frontend
  ├── src/
  │    ├── api/        # API configuration
  │    ├── components/ # Reusable UI components (Cards, Forms, Nav)
  │    ├── context/    # Role-based state management
  │    ├── pages/      # Role-specific views (Admin, Manager, User, Driver)
  │    ├── styles/     # SASS mixins, variables, and global resets
  │    └── App.jsx     # Routing and layout structure
```

## Database Schema

The system relies on a relational PostgreSQL structure to ensure data integrity:
* `users`: Primary identity table.
* `drivers`: Extends user profiles with professional details (license number, status).
* `parking_sessions`: Tracks the lifecycle of a car from 'pending' to 'parked' to 'retrieved', including entry/exit timestamps and automated fee calculation.

## Setup and Installation

### Prerequisites
* Node.js (v16+)
* NPM or Yarn
* Supabase Account (PostgreSQL)

### Backend Setup
* Navigate to `/backend`. 
* Install dependencies: `npm install`
* Create a `.env` file and add your credentials:
```Bash
PORT=5000
DATABASE_URL=your_postgresql_connection_string
NODE_ENV=production
```
* Start the server: `npm start`

### Frontend Setup
* Navigate to `/frontend`. 
* Install dependencies: `npm install`
* Start the development server: `npm run dev`

### Deployment
* Frontend: Deployed on Vercel with environment variable mapping for `VITE_API_URL`.
* Backend: Deployed on Render using a Web Service instance.
* Database: PostgreSQL instance running on Supabase with SSL enabled for production security.

---

### Author
[Amogha Raj Sandur](https://www.linkedin.com/in/amogharajsandur/) Internship Assignment - Brandworks Technologies - Parking App Evolvv