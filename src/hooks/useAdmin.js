import { useState, useEffect } from 'react';
import baseBooks from '../data/books';
import baseContent from '../data/content';

export function useAdmin() {
  const [content, setContent] = useState(() => {
    const saved = localStorage.getItem('aleena-portfolio-content');
    return saved ? JSON.parse(saved) : baseContent;
  });

  const [books, setBooks] = useState(() => {
    const saved = localStorage.getItem('aleena-portfolio-books');
    return saved ? JSON.parse(saved) : baseBooks;
  });

  const [lastSaved, setLastSaved] = useState(() => {
    return localStorage.getItem('aleena-portfolio-last-saved') || null;
  });

  const saveContent = (newContent) => {
    const timestamp = new Date().toLocaleString();
    setContent(newContent);
    setLastSaved(timestamp);
    localStorage.setItem('aleena-portfolio-content', JSON.stringify(newContent));
    localStorage.setItem('aleena-portfolio-last-saved', timestamp);
  };

  const saveBooks = (newBooks) => {
    const timestamp = new Date().toLocaleString();
    setBooks(newBooks);
    setLastSaved(timestamp);
    localStorage.setItem('aleena-portfolio-books', JSON.stringify(newBooks));
    localStorage.setItem('aleena-portfolio-last-saved', timestamp);
  };

  const resetToSeed = () => {
    saveContent(baseContent);
    saveBooks(baseBooks);
  };

  return { content, books, lastSaved, saveContent, saveBooks, resetToSeed };
}
