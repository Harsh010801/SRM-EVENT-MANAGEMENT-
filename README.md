# SRM Events 2K26 🎓

A modern, full-stack event management platform for SRM University featuring event listings, club directories, hackathon registrations, and user authentication.

![React](https://img.shields.io/badge/React-19.2-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-blue?logo=tailwindcss)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?logo=node.js)

## ✨ Features

- 🎪 **Event Management** - Browse technical, cultural, and sports events
- 🏆 **Hackathons** - Featured hackathons with registration
- 👥 **Clubs Directory** - 22+ student organizations
- 🔐 **User Authentication** - JWT-based login and registration
- 📝 **Event Registration** - Register for events with confirmation
- 📱 **Responsive Design** - Mobile-first, modern UI
- 🌙 **Dark Theme** - Beautiful dark mode with animations

## 🚀 Tech Stack

### Frontend
- React 19 + TypeScript
- Vite (Build tool)
- TailwindCSS (Styling)
- Radix UI (Components)
- React Router DOM (Routing)

### Backend
- Node.js + Express
- JWT Authentication
- bcryptjs (Password hashing)
- JSON file storage

## 📦 Installation

### Prerequisites
- Node.js 18+ installed
- npm or yarn

### Clone and Setup

```bash
git clone https://github.com/yourusername/srm-events.git
cd srm-events
```

### Install Frontend Dependencies

```bash
npm install
```

### Install Backend Dependencies

```bash
cd server
npm install
cd ..
```

## 🏃 Running the Project

### Start Backend Server

```bash
cd server
npm start
```
Backend runs at `http://localhost:5000`

### Start Frontend (New Terminal)

```bash
npm run dev
```
Frontend runs at `http://localhost:5173`

## 🔑 Demo Credentials

| Email | Password | Role |
|-------|----------|------|
| student@srmist.edu.in | student123 | Student |
| admin@srmist.edu.in | admin123 | Admin |

## 📁 Project Structure

```
├── src/                  # React frontend
│   ├── components/       # UI components
│   ├── sections/         # Page sections
│   ├── pages/            # Route pages
│   ├── contexts/         # React contexts
│   ├── services/         # API services
│   └── types/            # TypeScript types
├── server/               # Express backend
│   ├── routes/           # API routes
│   └── data/             # JSON storage
└── public/               # Static assets
```

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | User registration |
| POST | `/api/auth/login` | User login |
| GET | `/api/events` | Get all events |
| GET | `/api/clubs` | Get all clubs |
| POST | `/api/registrations` | Event registration |

## 🛠️ Build for Production

```bash
npm run build
```

## 📄 License

MIT License

## 👨‍💻 Author

**Harsh Yadav**
- SRM University
- [GitHub](https://github.com/Harsh010801)
