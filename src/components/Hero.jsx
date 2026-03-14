import { motion } from 'framer-motion';
import { useAdmin } from '../hooks/useAdmin';

export default function Hero() {
  const { content } = useAdmin();

  const dropVariants = {
    hidden: { y: '-100vh', opacity: 0 },
    visible: {
      y: '50vh',
      opacity: 1,
      transition: { duration: 0.8, ease: 'easeIn', delay: 0.4 }
    }
  };

  const inkSpreadVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 1.5, ease: 'easeOut', delay: 1.2 }
    }
  };

  const textFadeVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 2, delay: 2 } }
  };

  const typeVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.1, staggerChildren: 0.05, delayChildren: 2.6 } }
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="hero" className="relative w-full h-screen bg-saffron-bg overflow-hidden flex items-center justify-center">
      {/* Background Particles */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-saffron-text w-1 h-1"
            initial={{
              x: Math.random() * window.innerWidth,
              y: window.innerHeight,
              opacity: Math.random(),
            }}
            animate={{
              y: -100,
              x: `+=${Math.random() * 100 - 50}`,
              opacity: [0, Math.random(), 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: 'linear',
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Ink Drop Animation */}
      <div className="absolute top-0 left-1/2 min-w-[200vw] min-h-[200vh] -translate-x-1/2 center flex items-center justify-center pointer-events-none z-0">
        <motion.div
           variants={dropVariants}
           initial="hidden"
           animate="visible"
           className="w-2 h-6 bg-saffron-primary rounded-full absolute top-0 mix-blend-screen"
        />
        
        <motion.div 
           variants={inkSpreadVariants}
           initial="hidden"
           animate="visible"
           className="w-[120vw] h-[120vw] rounded-full bg-gradient-to-tr from-[#1a0a0e] via-[#c47a8a]/20 to-[#e8a830]/10 mix-blend-luminosity blur-3xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 h-full flex flex-col justify-center">
        <div className="w-full md:w-3/5 text-center md:text-left z-20">
          <motion.h1 
            variants={textFadeVariants}
            initial="hidden"
            animate="visible"
            className="font-display text-6xl md:text-9xl lg:text-[11rem] leading-none text-saffron-text mb-3 tracking-tight"
          >
            Aleena Tariq
          </motion.h1>
          <motion.span
            variants={textFadeVariants}
            initial="hidden"
            animate="visible"
            className="font-body italic text-lg md:text-2xl text-saffron-primary/50 tracking-[0.4em] uppercase mb-8 block"
          >
            Bhat
          </motion.span>

          <motion.p
            variants={typeVariants}
            initial="hidden"
            animate="visible"
            className="font-body text-xl md:text-3xl text-saffron-secondary italic mb-8"
          >
            {content.hero.tagline.split("").map((char, index) => (
              <motion.span key={index} variants={letterVariants}>
                {char}
              </motion.span>
            ))}
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 4, duration: 1 }}
            className="flex flex-wrap justify-center md:justify-start gap-4 mb-12"
          >
            {['Realism', 'Romance', 'Satire'].map((genre) => (
              <span key={genre} className="font-mono text-xs uppercase tracking-widest px-3 py-1 border border-saffron-surface text-saffron-text/60">
                [ {genre} ]
              </span>
            ))}
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ delay: 5, duration: 2, repeat: Infinity }}
            className="absolute bottom-12 left-1/2 md:left-6 -translate-x-1/2 md:translate-x-0 font-mono text-xs text-saffron-primary/50 tracking-widest"
          >
            Scroll to explore ↓
          </motion.div>
        </div>
      </div>

      {/* Cinematic Portrait Overlay */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 3, delay: 2.5 }}
        className="absolute top-0 right-0 w-full md:w-1/2 h-full z-0 pointer-events-none"
      >
        <div 
          className="w-full h-full bg-cover bg-center mix-blend-luminosity opacity-[0.44] md:opacity-[0.84] transition-all duration-1000 origin-center"
          style={{ 
            backgroundImage: "url('/aleena-pic-h.jpeg')", 
            transform: 'rotate(270deg) scale(1.4)',
            maskImage: 'radial-gradient(ellipse at 50% 50%, black 15%, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(ellipse at 50% 50%, black 15%, transparent 75%)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-saffron-bg via-transparent to-saffron-bg opacity-90" />
        {/* Softened divider — same direction as original but less intense */}
        <div className="absolute inset-0 bg-gradient-to-l from-saffron-bg/30 to-transparent" />
      </motion.div>
    </section>
  );
}
