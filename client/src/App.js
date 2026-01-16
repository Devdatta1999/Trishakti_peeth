import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Management from './pages/Management';
import Volunteer from './pages/Volunteer';
import Donation from './pages/Donation';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/management" element={<Management />} />
          <Route path="/volunteer" element={<Volunteer />} />
          <Route path="/donation" element={<Donation />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

