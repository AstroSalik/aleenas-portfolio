import { useState } from 'react';
import { useAdmin } from '../../hooks/useAdmin';

export default function BooksManager() {
  const { books, saveBooks } = useAdmin();
  const [editingBook, setEditingBook] = useState(null);
  const [showSaved, setShowSaved] = useState(false);

  const handleEdit = (book) => {
    setEditingBook({ ...book }); // Clone for editing
  };

  const handleAdd = () => {
    setEditingBook({
      id: Date.now().toString(),
      title: "New Book Title",
      year: new Date().getFullYear(),
      role: "Author",
      coverImage: "",
      tagline: "",
      description: "",
      pullQuote: "",
      whoIsItFor: ["", "", ""],
      moodTags: [],
      authorNote: "",
      purchaseLink: "",
      published: false
    });
  };

  const handleSave = () => {
    const existingIndex = books.findIndex(b => b.id === editingBook.id);
    let newBooks;
    if (existingIndex >= 0) {
      newBooks = books.map(b => b.id === editingBook.id ? editingBook : b);
    } else {
      newBooks = [...books, editingBook];
    }
    saveBooks(newBooks);
    setEditingBook(null);
    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 2000);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this book? This cannot be undone.')) {
      const newBooks = books.filter(b => b.id !== id);
      saveBooks(newBooks);
      setShowSaved(true);
      setTimeout(() => setShowSaved(false), 2000);
    }
  };

  const handleCancel = () => setEditingBook(null);

  const addMoodTag = (tag) => {
    if (tag && !editingBook.moodTags.includes(tag)) {
       setEditingBook({ ...editingBook, moodTags: [...editingBook.moodTags, tag] });
    }
  };

  const removeMoodTag = (tagToRemove) => {
    setEditingBook({
       ...editingBook,
       moodTags: editingBook.moodTags.filter(t => t !== tagToRemove)
    });
  };

  const updateWhoIsItForLine = (index, value) => {
    const newLines = [...editingBook.whoIsItFor];
    newLines[index] = value;
    setEditingBook({ ...editingBook, whoIsItFor: newLines });
  };

  if (editingBook) {
    return (
      <div className="animate-in fade-in max-w-4xl max-h-full">
         <div className="flex justify-between items-center mb-8 border-b border-saffron-surface pb-6">
           <h2 className="font-display text-3xl text-saffron-text">Editing: <span className="text-saffron-primary">{editingBook.title}</span></h2>
           <div className="flex gap-4">
             <button onClick={handleCancel} className="font-mono text-sm tracking-uppercase text-saffron-text/50 hover:text-saffron-text transition-colors">Cancel</button>
             <button onClick={handleSave} className="bg-saffron-primary text-saffron-bg px-6 py-2 font-mono uppercase text-sm font-bold tracking-widest hover:bg-[#c99026] transition-colors">Save Changes</button>
           </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <Field label="Title">
                <input type="text" value={editingBook.title} onChange={e => setEditingBook({...editingBook, title: e.target.value})} className="input" />
              </Field>
              <div className="flex gap-6">
                <Field label="Year" className="flex-1">
                  <input type="number" value={editingBook.year} onChange={e => setEditingBook({...editingBook, year: Number(e.target.value)})} className="input" />
                </Field>
                <Field label="Role" className="flex-1">
                  <input type="text" value={editingBook.role} onChange={e => setEditingBook({...editingBook, role: e.target.value})} className="input" placeholder="e.g. Co-Author" />
                </Field>
              </div>
              <Field label="Cover Image URL">
                <input type="text" value={editingBook.coverImage} onChange={e => setEditingBook({...editingBook, coverImage: e.target.value})} className="input" placeholder="/covers/book.jpg" />
                {editingBook.coverImage && (
                  <div className="mt-4 w-32 h-44 bg-cover bg-center border border-saffron-surface" style={{backgroundImage: `url(${editingBook.coverImage})`}}></div>
                )}
              </Field>
              <Field label="Tagline">
                <input type="text" value={editingBook.tagline} onChange={e => setEditingBook({...editingBook, tagline: e.target.value})} className="input" />
              </Field>
              <Field label="Description (HTML/Newlines supported)">
                <textarea rows={5} value={editingBook.description} onChange={e => setEditingBook({...editingBook, description: e.target.value})} className="input leading-relaxed" />
              </Field>
              <div className="flex items-center gap-4 pt-4">
                <input 
                  type="checkbox" 
                  id="publishedToggle" 
                  checked={editingBook.published} 
                  onChange={e => setEditingBook({...editingBook, published: e.target.checked})}
                  className="w-5 h-5 accent-saffron-primary"
                />
                <label htmlFor="publishedToggle" className="font-mono text-sm uppercase tracking-widest text-saffron-primary cursor-pointer">Published to Public Library</label>
              </div>
            </div>

            <div className="space-y-6">
              <Field label="Pull Quote">
                <textarea rows={3} value={editingBook.pullQuote} onChange={e => setEditingBook({...editingBook, pullQuote: e.target.value})} className="input italic" />
              </Field>

              <Field label="Who Is It For (3 poetic lines)">
                <div className="space-y-3">
                  {[0, 1, 2].map(i => (
                    <input key={i} type="text" value={editingBook.whoIsItFor[i]} onChange={e => updateWhoIsItForLine(i, e.target.value)} className="input" placeholder={`Line ${i+1}`} />
                  ))}
                </div>
              </Field>

              <Field label="Mood Tags">
                <div className="flex flex-wrap gap-2 mb-3">
                  {editingBook.moodTags.map(tag => (
                    <span key={tag} className="bg-saffron-surface px-3 py-1 text-xs font-mono text-saffron-text flex items-center gap-2">
                       {tag} <button onClick={() => removeMoodTag(tag)} className="text-red-400 hover:text-red-300">×</button>
                    </span>
                  ))}
                </div>
                <input 
                  type="text" 
                  placeholder="Type a tag & press Enter..." 
                  onKeyDown={e => { if(e.key === 'Enter') { e.preventDefault(); addMoodTag(e.target.value.trim()); e.target.value = ''; } }} 
                  className="input" 
                />
              </Field>

              <Field label="Author Note">
                <textarea rows={3} value={editingBook.authorNote} onChange={e => setEditingBook({...editingBook, authorNote: e.target.value})} className="input italic" placeholder="Personal note..." />
              </Field>

              <Field label="Amazon Purchase Link">
                <input type="url" value={editingBook.purchaseLink} onChange={e => setEditingBook({...editingBook, purchaseLink: e.target.value})} className="input text-saffron-primary" placeholder="https://amzn.in/..." />
                {editingBook.purchaseLink && !editingBook.purchaseLink.includes('http') && (
                  <p className="text-red-400 text-xs mt-2 font-mono">Must include http:// or https://</p>
                )}
              </Field>
            </div>
         </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in max-w-5xl">
      <header className="flex justify-between items-end border-b border-saffron-surface pb-6">
        <div>
          <h1 className="font-display text-4xl text-saffron-text mb-2">Books Library</h1>
        <div className="flex items-center gap-6">
          {showSaved && (
            <span className="font-mono text-xs text-green-400 animate-in fade-in slide-in-from-right-2">
              Saved ✓
            </span>
          )}
          <p className="font-mono text-xs text-saffron-text/50 uppercase tracking-widest">Manage the 12 Book Slots</p>
        </div>
        </div>
        <div className="flex items-center gap-6">
          <button 
            onClick={handleAdd}
            className="bg-saffron-primary/10 border border-saffron-primary text-saffron-primary px-4 py-2 font-mono uppercase text-sm tracking-widest hover:bg-saffron-primary hover:text-saffron-bg transition-all"
          >
            + Add New Book
          </button>
          <button 
            onClick={() => {
               const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(books, null, 2));
               const dl = document.createElement('a'); dl.setAttribute("href", dataStr); dl.setAttribute("download", "aleena-books-backup.json"); dl.click();
            }}
            className="font-mono text-xs tracking-widest text-saffron-secondary hover:text-saffron-text"
          >
             ↓ Export Data
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <div key={book.id} className="bg-saffron-surface/20 border border-saffron-surface p-6 flex flex-col items-start hover:border-saffron-primary/50 transition-colors">
            <div className={`text-[10px] font-mono uppercase tracking-widest px-2 py-1 mb-4 ${book.published ? 'bg-saffron-primary/20 text-saffron-primary' : 'bg-saffron-text/10 text-saffron-text/40'}`}>
              {book.published ? 'Published' : 'Draft'}
            </div>
            <h3 className="font-display text-2xl text-saffron-text mb-2 leading-tight">{book.title}</h3>
            <span className="font-mono text-xs text-saffron-text/50 mb-6">{book.year} · {book.role}</span>
            <div className="mt-auto self-stretch flex justify-between items-center pt-6 border-t border-saffron-surface/10">
              <button 
                onClick={() => handleEdit(book)}
                className="font-mono text-sm uppercase tracking-widest text-saffron-primary hover:text-saffron-text transition-colors"
              >
                Edit Book →
              </button>
              <button 
                onClick={() => handleDelete(book.id)}
                className="font-mono text-[10px] uppercase tracking-widest text-red-500/50 hover:text-red-500 transition-colors"
                title="Delete Book"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Field({ label, children, className = "" }) {
  return (
    <div className={`space-y-2 ${className}`}>
      <label className="block font-mono text-xs uppercase tracking-widest text-saffron-text/60">{label}</label>
      {children}
    </div>
  );
}
