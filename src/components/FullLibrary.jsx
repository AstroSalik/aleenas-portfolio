import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAdmin } from '../hooks/useAdmin';
import BookModal from './BookModal';

export default function FullLibrary() {
  const { books } = useAdmin();
  const [filter, setFilter] = useState('All');
  const [selectedBook, setSelectedBook] = useState(null);

  // Scroll to top on mount - Instant scroll to override global smooth behavior
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const publishedBooks = books.filter(b => b.published);
  const filteredBooks = publishedBooks;

  return (
    <div className="w-full min-h-screen bg-saffron-bg pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Navigation / Header */}
        <div className="flex flex-col items-center text-center gap-6 mb-16">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 text-saffron-primary/60 hover:text-saffron-primary transition-colors mb-2 font-mono text-xs uppercase tracking-widest"
          >
            ← Return to Portfolio
          </button>
          <h1 className="font-display text-5xl md:text-7xl text-saffron-text">Complete Library</h1>
          <p className="font-mono text-sm tracking-widest text-saffron-text/60 uppercase max-w-2xl">
            A curated collection of poems, prose, and collaborative anthologies bridging ink and soul.
          </p>
        </div>

        {/* Book Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredBooks.map((book) => (
              <motion.div
                key={book.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="group relative flex flex-col bg-saffron-surface/10 border border-saffron-surface/30 p-6 hover:border-saffron-primary/40 transition-all duration-500 rounded-sm shadow-xl"
              >
                {/* Cover Image */}
                <div 
                  onClick={() => setSelectedBook(book)}
                  className="w-full aspect-[2/3] mb-8 shadow-2xl relative overflow-hidden bg-saffron-surface cursor-pointer"
                >
                  {book.coverImage ? (
                    <div 
                      className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                      style={{ backgroundImage: `url(${book.coverImage})` }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center p-8 text-center border overflow-hidden">
                      <span className="font-display text-xl text-saffron-text/40 leading-relaxed">{book.title}</span>
                    </div>
                  )}
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-saffron-bg/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-[2px]">
                    <span className="font-display italic text-lg text-saffron-text">Open Atmosphere →</span>
                  </div>
                </div>

                {/* Info */}
                <div className="flex flex-col flex-grow">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-mono text-[10px] text-saffron-primary uppercase tracking-[0.2em]">{book.year}</span>
                    <span className="w-1 h-px bg-saffron-primary/30" />
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-saffron-text/40">{book.role}</span>
                  </div>
                  
                  <button 
                    onClick={() => setSelectedBook(book)}
                    className="text-left focus:outline-none"
                  >
                    <h3 className="font-display text-2xl text-saffron-text mb-4 leading-tight group-hover:text-saffron-primary transition-colors">
                      {book.title}
                    </h3>
                  </button>
                  
                  <p className="font-body text-saffron-text/70 mb-8 line-clamp-3 text-sm leading-relaxed">
                    {book.description}
                  </p>
                  
                  <div className="mt-auto pt-6 border-t border-saffron-surface/30 flex justify-between items-center">
                    <button
                      onClick={() => setSelectedBook(book)}
                      className="font-display italic text-saffron-text/80 hover:text-saffron-primary transition-colors flex items-center gap-2"
                    >
                      Read Details →
                    </button>
                    {book.purchaseLink && (
                       <span className="font-mono text-[10px] uppercase tracking-widest text-saffron-secondary">Published</span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredBooks.length === 0 && (
          <div className="py-32 text-center text-saffron-text/30 font-display text-2xl italic tracking-widest">
            No manuscripts found in this era...
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedBook && (
          <BookModal book={selectedBook} onClose={() => setSelectedBook(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
