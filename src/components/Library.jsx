import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useScrollAnimation, fadeUpVariant, staggerContainer } from '../hooks/useScrollAnimation';
import { useAdmin } from '../hooks/useAdmin';
import BookModal from './BookModal';

export default function Library() {
  const { books } = useAdmin();
  const { ref, controls } = useScrollAnimation(0.05);
  const [selectedBook, setSelectedBook] = useState(null);

  const publishedBooks = books.filter(b => b.published);
  // Only show the first 4 books on the home page
  const featuredBooks = publishedBooks.slice(0, 4);

  return (
    <section id="library" className="w-full pt-4 pb-12 md:py-24 bg-[#110609] border-t border-saffron-surface">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={controls}
          className="flex flex-col gap-12"
        >
          {/* Section Header */}
          <motion.div variants={fadeUpVariant} className="flex flex-col items-center text-center gap-6 mb-8">
            <div>
              <h2 className="font-display text-4xl md:text-6xl text-saffron-text mb-4">The Library</h2>
              <p className="font-mono text-sm tracking-widest text-saffron-text/60 uppercase">A shelf of collaborative worlds</p>
              <span className="block w-12 h-0.5 bg-saffron-primary mt-4 mx-auto" />
            </div>
            
            <Link 
              to="/library"
              className="font-mono text-xs uppercase tracking-widest px-6 py-3 border border-saffron-primary/30 text-saffron-primary hover:bg-saffron-primary hover:text-saffron-bg transition-all duration-300"
            >
              Explore Full Library →
            </Link>
          </motion.div>

          {/* Book Grid */}
          <motion.div 
            variants={fadeUpVariant}
            className="grid grid-cols-1 md:grid-cols-2 gap-12"
            layout
          >
            <AnimatePresence mode="popLayout">
              {featuredBooks.map((book) => (
                <motion.div
                  key={book.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="group flex flex-col md:flex-row gap-8 items-start p-6 rounded-lg hover:shadow-[0_8px_30px_rgba(232,168,48,0.05)] hover:-translate-y-2 transition-all duration-500 bg-saffron-surface/20 border border-transparent hover:border-saffron-surface"
                >
                  {/* Cover Image */}
                  <div 
                    onClick={() => setSelectedBook(book)}
                    className="w-full md:w-48 h-64 shrink-0 shadow-lg relative overflow-hidden bg-saffron-surface cursor-pointer"
                  >
                    {book.coverImage ? (
                      <div 
                        className="w-full h-full bg-cover bg-center"
                        style={{ backgroundImage: `url(${book.coverImage})` }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center p-4 text-center border overflow-hidden">
                        <span className="font-display text-lg text-saffron-text/40">{book.title}</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-saffron-bg/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Info */}
                  <div className="flex flex-col justify-start h-full py-2">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-mono text-xs text-saffron-primary">{book.year}</span>
                      <span className="w-1 h-1 rounded-full bg-saffron-surface" />
                      <span className="font-mono text-xs uppercase tracking-wider text-saffron-text/60">{book.role}</span>
                    </div>
                    
                    <button 
                      onClick={() => setSelectedBook(book)}
                      className="text-left focus:outline-none"
                    >
                      <h3 className="font-display text-2xl text-saffron-text mb-3 leading-tight group-hover:text-saffron-primary transition-colors">
                        {book.title}
                      </h3>
                    </button>
                    
                    <p className="font-body text-saffron-text/80 mb-6 line-clamp-2">
                      {book.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {book.moodTags.map((tag, idx) => (
                        <span key={idx} className="text-xs font-mono text-saffron-secondary bg-saffron-surface/50 px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => setSelectedBook(book)}
                      className="mt-auto self-start flex items-center gap-2 font-display italic text-lg text-saffron-text hover:text-saffron-primary transition-colors"
                    >
                      Open Book
                      <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          
          {publishedBooks.length > 4 && (
            <motion.div variants={fadeUpVariant} className="flex justify-center mt-12">
               <Link 
                to="/library"
                className="font-mono text-xs uppercase tracking-widest px-8 py-4 border border-saffron-primary/30 text-saffron-primary hover:bg-saffron-primary hover:text-saffron-bg transition-all duration-300 shadow-[0_0_20px_rgba(232,168,48,0.05)]"
              >
                View Full Collection →
              </Link>
            </motion.div>
          )}

          {featuredBooks.length === 0 && (
            <div className="py-24 text-center text-saffron-text/50 font-display italic">
              No works available.
            </div>
          )}

        </motion.div>
      </div>

      <AnimatePresence>
        {selectedBook && (
          <BookModal book={selectedBook} onClose={() => setSelectedBook(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
