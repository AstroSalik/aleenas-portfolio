import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SpeedInsights } from "@vercel/speed-insights/react"
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
import BlogGrid from './components/BlogGrid';
import BlogPost from './components/BlogPost';
import HomeBlogSection from './components/HomeBlogSection';
import './index.css';

function MainPortfolio() {
  return (
    <>
      <Nav />
      <Hero />
      <About />
      <LiteraryVoice />
      <Recognition />
      <Library />
      <HomeBlogSection />
      <Classroom />
      <Contact />
    </>
  );
}

function App() {
  return (
    <Router>
      <SpeedInsights />
      <Routes>
        <Route path="/admin/*" element={<AdminPortal />} />
        <Route path="/library" element={<FullLibrary />} />
        <Route path="/blog" element={<BlogGrid />} />
        <Route path="/blog/:id" element={<BlogPost />} />
        <Route path="/" element={<MainPortfolio />} />
      </Routes>
    </Router>
  );
}

export default App;
