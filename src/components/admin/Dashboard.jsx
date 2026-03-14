import { useAdmin } from '../../hooks/useAdmin';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { content, books, lastSaved } = useAdmin();
  const publishedBooksCount = books.filter(b => b.published).length;
  const draftBooksCount = books.length - publishedBooksCount;
  
  // Find latest published book based on year
  const latestBook = books
    .filter(b => b.published)
    .sort((a, b) => b.year - a.year)[0];

  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      <header>
        <h1 className="font-display text-4xl text-saffron-text mb-2">Overview</h1>
        <div className="flex justify-between items-center">
          <p className="font-mono text-xs text-saffron-text/50 uppercase tracking-widest">At a glance</p>
          {lastSaved && (
            <p className="font-mono text-[10px] text-saffron-primary/60 uppercase tracking-widest">
              Last Update: {lastSaved}
            </p>
          )}
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          label="Published Works" 
          value={publishedBooksCount} 
          subValue={`${draftBooksCount} drafts`} 
        />
        <StatCard 
          label="Awards" 
          value={content.awards.length} 
          subValue={content.awards.find(a => a.featured)?.title || 'None featured'} 
        />
        <StatCard 
          label="Latest Book" 
          value={latestBook ? latestBook.year : '-'} 
          subValue={latestBook ? latestBook.title : 'No published books'} 
        />
        <StatCard 
          label="Workshops" 
          value={content.classroom.workshopCards.length} 
          subValue="Active offerings" 
        />
      </div>

      {/* Quick Actions */}
      <section>
         <h2 className="font-display text-2xl text-saffron-text mb-6 pb-2 border-b border-saffron-surface">Actions</h2>
          <div className="flex gap-4 flex-wrap">
            <a 
              href="https://aleenas-library.sanity.studio/" 
              target="_blank" 
              rel="noreferrer noopener"
              className="px-6 py-3 bg-saffron-primary text-saffron-bg hover:bg-[#c99026] transition-colors font-mono uppercase tracking-widest text-sm font-bold shadow-[0_4px_20px_rgba(232,168,48,0.2)] flex items-center gap-2"
            >
              <span>✨</span> Write & Manage Blogs
            </a>
            <Link to="/admin/books" className="px-6 py-3 bg-saffron-primary/10 border border-saffron-primary text-saffron-primary hover:bg-saffron-primary hover:text-saffron-bg transition-colors font-mono uppercase tracking-widest text-sm font-bold">
              Manage Books
            </Link>
            <Link to="/admin/content" className="px-6 py-3 bg-saffron-surface/50 border border-saffron-surface text-saffron-text hover:bg-saffron-surface transition-colors font-mono uppercase tracking-widest text-sm">
              Edit Site Copy
            </Link>
          </div>
      </section>
    </div>
  );
}

function StatCard({ label, value, subValue }) {
  return (
    <div className="p-6 bg-saffron-surface/20 border border-saffron-surface rounded">
      <h3 className="font-mono text-[10px] text-saffron-primary uppercase tracking-widest mb-4">{label}</h3>
      <div className="font-display text-4xl text-saffron-text mb-2 truncate" title={String(value)}>{value}</div>
      <div className="font-mono text-xs text-saffron-text/40 truncate" title={String(subValue)}>{subValue}</div>
    </div>
  );
}
