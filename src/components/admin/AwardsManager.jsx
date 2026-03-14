import { useState } from 'react';
import { useAdmin } from '../../hooks/useAdmin';

export default function AwardsManager() {
  const { content, saveContent } = useAdmin();
  const [editingAward, setEditingAward] = useState(null);
  const [showSaved, setShowSaved] = useState(false);

  const handleEdit = (award) => {
    setEditingAward({ ...award });
  };

  const handleCreate = () => {
    setEditingAward({
      id: Date.now().toString(),
      title: "New Award/Recognition",
      category: "Category",
      year: new Date().getFullYear(),
      description: "",
      featured: false
    });
  };

  const handleSave = () => {
    let newAwards = [...content.awards];
    
    // If setting to featured, unfeature others
    if (editingAward.featured) {
      newAwards = newAwards.map(a => ({ ...a, featured: false }));
    }

    const existingIndex = newAwards.findIndex(a => a.id === editingAward.id);
    if (existingIndex >= 0) {
      newAwards[existingIndex] = editingAward;
    } else {
      newAwards.push(editingAward);
      // Sort immediately by year descending
      newAwards.sort((a,b) => b.year - a.year);
    }
    
    // Ensure we always have at least one featured award if there are awards
    if (newAwards.length > 0 && !newAwards.some(a => a.featured)) {
       newAwards[0].featured = true;
    }

    saveContent({ ...content, awards: newAwards });
    setEditingAward(null);
    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 2000);
  };

  const handleDelete = (id) => {
    if (confirm("Remove this award?")) {
      let newAwards = content.awards.filter(a => a.id !== id);
      if (newAwards.length > 0 && !newAwards.some(a => a.featured)) {
         newAwards[0].featured = true; // Auto-feature the first one
      }
      saveContent({ ...content, awards: newAwards });
      setShowSaved(true);
      setTimeout(() => setShowSaved(false), 2000);
    }
  };

  if (editingAward) {
    return (
      <div className="animate-in fade-in max-w-2xl text-saffron-text">
         <div className="flex justify-between items-center mb-8 border-b border-saffron-surface pb-6">
           <h2 className="font-display text-3xl">Edit Award</h2>
           <div className="flex gap-4">
             <button onClick={() => setEditingAward(null)} className="font-mono text-sm tracking-uppercase text-saffron-text/50 hover:text-saffron-text transition-colors">Cancel</button>
             <button onClick={handleSave} className="bg-saffron-primary text-saffron-bg px-6 py-2 font-mono uppercase text-sm font-bold tracking-widest hover:bg-[#c99026] transition-colors">Save</button>
           </div>
         </div>
         
         <div className="space-y-6">
            <Field label="Award Name & Organization">
               <input type="text" value={editingAward.title} onChange={e => setEditingAward({...editingAward, title: e.target.value})} className="input w-full" />
            </Field>
            <div className="flex gap-6">
               <Field label="Year" className="flex-1">
                 <input type="number" value={editingAward.year} onChange={e => setEditingAward({...editingAward, year: Number(e.target.value)})} className="input" />
               </Field>
               <Field label="Category" className="flex-1">
                 <input type="text" value={editingAward.category} onChange={e => setEditingAward({...editingAward, category: e.target.value})} className="input" placeholder="e.g. Writer/Poet" />
               </Field>
            </div>
            <Field label="Description / Accolade Line">
               <textarea rows={3} value={editingAward.description} onChange={e => setEditingAward({...editingAward, description: e.target.value})} className="input leading-relaxed w-full" />
            </Field>
            <div className="flex items-center gap-4 pt-4 pb-8">
              <input 
                type="checkbox" 
                id="featuredToggle" 
                checked={editingAward.featured} 
                onChange={e => setEditingAward({...editingAward, featured: e.target.checked})}
                className="w-5 h-5 accent-saffron-primary cursor-pointer"
              />
              <label htmlFor="featuredToggle" className="font-mono text-sm uppercase tracking-widest text-saffron-primary cursor-pointer">
                Primary Featured Award (Show as Gold Seal)
              </label>
            </div>
         </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in max-w-4xl text-saffron-text">
       <header className="flex justify-between items-end border-b border-saffron-surface pb-6">
        <div>
          <h1 className="font-display text-4xl mb-2">Awards & Honors</h1>
        <div className="flex items-center gap-6">
          {showSaved && (
            <span className="font-mono text-xs text-green-400 animate-in fade-in slide-in-from-right-2">
              Saved ✓
            </span>
          )}
          <p className="font-mono text-xs text-saffron-text/50 uppercase tracking-widest">Manage Recognition Timeline</p>
        </div>
        </div>
        <button 
           onClick={handleCreate} 
           className="bg-saffron-surface/50 border border-saffron-surface text-saffron-text px-4 py-2 font-mono uppercase text-sm tracking-widest hover:bg-saffron-primary/20 hover:text-saffron-primary hover:border-saffron-primary transition-colors"
        >
          + Add Award
        </button>
      </header>

      <div className="space-y-4">
        {content.awards.map((award) => (
          <div key={award.id} className={`flex flex-col md:flex-row md:items-center justify-between p-6 border ${award.featured ? 'border-saffron-primary/50 bg-saffron-primary/5' : 'border-saffron-surface bg-saffron-surface/20'}`}>
            <div className="flex-1 mb-4 md:mb-0">
               <div className="flex items-center gap-3 mb-1">
                 {award.featured && <span className="font-mono text-[10px] bg-saffron-primary text-saffron-bg px-2 py-0.5 uppercase tracking-widest font-bold">Featured Seal</span>}
                 <span className="font-mono text-xs text-saffron-text/60">{award.year}</span>
                 <span className="font-mono text-[10px] uppercase tracking-widest text-saffron-text/40">{award.category}</span>
               </div>
               <h3 className="font-display text-2xl text-saffron-text mb-1">{award.title}</h3>
               <p className="font-body text-saffron-text/70 line-clamp-2 md:w-3/4">{award.description}</p>
            </div>
            
            <div className="flex gap-4 md:flex-col items-end shrink-0">
              <button onClick={() => handleEdit(award)} className="font-mono text-xs tracking-widest uppercase text-saffron-primary hover:text-saffron-text transition-colors">Edit</button>
              <button onClick={() => handleDelete(award.id)} className="font-mono text-xs tracking-widest uppercase text-red-500 hover:text-red-300 transition-colors">Remove</button>
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
