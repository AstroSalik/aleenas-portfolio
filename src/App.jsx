import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Hero from './components/Hero';
import About from './components/About';
import LiteraryVoice from './components/LiteraryVoice';
import Library from './components/Library';
import Recognition from './components/Recognition';
import Classroom from './components/Classroom';
import Contact from './components/Contact';
import AdminPortal from './components/admin/AdminPortal';
import FullLibrary from './components/FullLibrary';
import './index.css';

function MainPortfolio() {
  return (
    <>
      <Nav />
      <Hero />
      <About />
      <LiteraryVoice />
      <Library />
      <Recognition />
      <Classroom />
      <Contact />
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin/*" element={<AdminPortal />} />
        <Route path="/library" element={<FullLibrary />} />
        <Route path="/" element={<MainPortfolio />} />
      </Routes>
    </Router>
  );
}

export default App;
