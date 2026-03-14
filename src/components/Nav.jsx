import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Nav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.8) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { name: 'About', href: '#about' },
    { name: 'Voice', href: '#voice' },
    { name: 'Library', href: '#library' },
    { name: 'Recognition', href: '#recognition' },
    { name: 'Classroom', href: '#classroom' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <AnimatePresence>
        {isScrolled && (
          <motion.nav 
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1.0] }}
            className="fixed top-0 left-0 w-full z-50 bg-saffron-bg/80 backdrop-blur-md border-b border-saffron-surface"
          >
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
              <a href="#" className="font-display text-2xl text-saffron-primary tracking-wider">
                ATB
              </a>

              {/* Desktop Nav */}
              <div className="hidden md:flex space-x-8">
                {links.map((link) => (
                  <a 
                    key={link.name} 
                    href={link.href}
                    className="font-mono text-sm tracking-widest text-saffron-text/70 uppercase hover:text-saffron-primary transition-colors relative group"
                  >
                    {link.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-saffron-primary transition-all duration-300 group-hover:w-full" />
                  </a>
                ))}
              </div>

              {/* Mobile Hamburger */}
              <button 
                className="md:hidden text-saffron-primary focus:outline-none"
                onClick={() => setMobileMenuOpen(true)}
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.4 }}
            className="fixed inset-0 z-[60] bg-saffron-bg flex flex-col pt-24 px-8"
          >
            <button 
              className="absolute top-6 right-6 text-saffron-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="flex flex-col space-y-8 mt-12">
              {links.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-display text-4xl text-saffron-text hover:text-saffron-primary transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
