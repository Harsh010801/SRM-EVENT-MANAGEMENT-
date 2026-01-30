import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/sections/Hero';
import { Events } from '@/sections/Events';
import { Clubs } from '@/sections/Clubs';
import { Hackathons } from '@/sections/Hackathons';
import { RegistrationCTA } from '@/sections/RegistrationCTA';
import { Footer } from '@/sections/Footer';
import { Login } from '@/pages/Login';
import './App.css';

function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Events />
        <Clubs />
        <Hackathons />
        <RegistrationCTA />
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
