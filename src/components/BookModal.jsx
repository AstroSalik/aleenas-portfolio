import { motion } from 'framer-motion';

export default function BookModal({ book, onClose }) {
  // 7-step purchase journey orchestration built in
  
  const containerVars = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } },
    exit: { opacity: 0, transition: { duration: 0.4 } }
  };

  const coverVars = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1.0], delay: 0.2 } }
  };

  const staggerContent = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.8 } }
  };

  const itemVars = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  // Close when clicking outside content wrapper
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <motion.div
      variants={containerVars}
      initial="hidden"
      animate="visible"
      exit="exit"
      onClick={handleBackdropClick}
      className="fixed inset-0 z-[100] bg-saffron-bg/95 backdrop-blur-md overflow-y-auto w-full h-full flex items-start justify-center pt-24 pb-24 px-6"
    >
      <button 
        onClick={onClose}
        className="fixed top-8 right-8 text-saffron-text/60 hover:text-saffron-primary transition-colors focus:outline-none z-50"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
        {/* Step 1: Cover Reveal */}
        <motion.div variants={coverVars} className="w-64 h-96 shadow-2xl shadow-saffron-primary/10 relative overflow-hidden bg-saffron-surface mb-12">
          {book.coverImage ? (
            <div 
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${book.coverImage})` }}
            />
          ) : (
             <div className="w-full h-full border border-saffron-surface flex items-center justify-center p-4 text-center">
               <span className="font-display text-xl text-saffron-text/40">{book.title}</span>
             </div>
          )}
          <div className="absolute inset-0 bg-saffron-primary/5 mix-blend-overlay pointer-events-none"></div>
        </motion.div>

        <motion.div 
          variants={staggerContent}
          initial="hidden"
          animate="visible"
          className="w-full flex flex-col items-center text-center space-y-16"
        >
          {/* Step 2: Title & Atmosphere Line */}
          <motion.div variants={itemVars} className="space-y-4 max-w-2xl px-4">
            <h2 className="font-display text-3xl md:text-5xl text-saffron-text bg-gradient-to-r from-saffron-text via-saffron-primary to-saffron-text bg-clip-text text-transparent">{book.title}</h2>
            <p className="font-display italic text-xl md:text-2xl text-saffron-secondary font-light">
              "{book.tagline}"
            </p>
          </motion.div>

          {/* Step 3: The World of This Book */}
          <motion.div variants={itemVars} className="max-w-2xl px-6">
            <p className="font-body text-lg md:text-xl text-saffron-text/90 leading-loose">
              {book.description}
            </p>
          </motion.div>

          {/* Step 4: Pull Quote */}
          {book.pullQuote && (
            <motion.div variants={itemVars} className="w-full max-w-3xl relative py-12 px-8 border-l border-r border-saffron-primary/20 bg-saffron-surface/10">
              <p className="font-display italic text-2xl md:text-4xl text-saffron-primary leading-relaxed">
                {book.pullQuote}
              </p>
            </motion.div>
          )}

          {/* Step 5: Who This Book Is For */}
          <motion.div variants={itemVars} className="max-w-xl text-left w-full space-y-4 px-6 md:px-0">
            <p className="font-mono text-sm uppercase tracking-widest text-saffron-text/50 mb-6">Who This Book Is For</p>
            {book.whoIsItFor.filter(line => line.trim()).map((line, idx) => (
              <p key={idx} className="font-body text-lg text-saffron-text/80 flex items-start">
                <span className="text-saffron-primary mr-4 mt-1.5 w-1.5 h-1.5 bg-saffron-primary rounded-full shrink-0"></span>
                {line}
              </p>
            ))}
          </motion.div>

          {/* Step 6: Aleena's Note (Optional) */}
          {book.authorNote && (
            <motion.div variants={itemVars} className="max-w-xl text-left w-full px-6 md:px-0">
               <p className="font-mono text-sm uppercase tracking-widest text-saffron-text/50 mb-4">A Note from Aleena</p>
               <p className="font-body italic text-saffron-text text-xl pt-4 border-t border-saffron-surface">
                 "{book.authorNote}"
               </p>
            </motion.div>
          )}

          {/* Step 7: The Button */}
          {book.purchaseLink && (
            <motion.div variants={itemVars} className="pt-12 pb-24">
              <a 
                href={book.purchaseLink}
                target="_blank" 
                rel="noreferrer"
                className="group relative inline-flex items-center justify-center px-8 py-4 bg-saffron-primary/10 border border-saffron-primary text-saffron-text overflow-hidden hover:text-saffron-bg transition-colors duration-500"
              >
                <div className="absolute inset-0 bg-saffron-primary -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out z-0"></div>
                <span className="relative z-10 font-mono tracking-widest uppercase text-sm font-semibold flex items-center gap-3">
                  Carry This Book Home
                  <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </a>
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
