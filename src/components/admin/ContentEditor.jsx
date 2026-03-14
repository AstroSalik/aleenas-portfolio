import { useState } from 'react';
import { useAdmin } from '../../hooks/useAdmin';

export default function ContentEditor() {
  const { content, saveContent } = useAdmin();
  const [showSaved, setShowSaved] = useState(false);
  const [editingContent, setEditingContent] = useState(content);

  const handleSave = () => {
    saveContent(editingContent);
    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 2000);
  };

  const handleStringChange = (section, field, value) => {
    setEditingContent({
      ...editingContent,
      [section]: {
        ...editingContent[section],
        [field]: value
      }
    });
  };

  return (
    <div className="space-y-12 animate-in fade-in max-w-4xl pb-24">
      <header className="flex justify-between items-end border-b border-saffron-surface pb-6 sticky top-0 bg-saffron-bg z-10">
        <div>
          <h1 className="font-display text-4xl text-saffron-text mb-2">Site Content</h1>
          <p className="font-mono text-xs text-saffron-text/50 uppercase tracking-widest">Edit global copy & text</p>
        </div>
        <div className="flex items-center gap-4">
          {showSaved && (
            <span className="font-mono text-xs text-green-400 animate-in fade-in slide-in-from-right-2">
              Saved ✓
            </span>
          )}
          <button 
             onClick={handleSave} 
             className="bg-saffron-primary text-saffron-bg px-6 py-2 font-mono uppercase text-sm font-bold tracking-widest hover:bg-[#c99026] transition-colors"
          >
            Save All Changes
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="space-y-6">
        <h2 className="font-display text-2xl text-saffron-primary border-l-2 border-saffron-primary pl-4">Hero Section</h2>
        <Field label="Tagline (Types out on load)">
          <input 
            type="text" 
            value={editingContent.hero.tagline} 
            onChange={e => handleStringChange('hero', 'tagline', e.target.value)} 
            className="input w-full md:w-2/3" 
          />
        </Field>
      </section>

      {/* About Section */}
      <section className="space-y-6">
        <h2 className="font-display text-2xl text-saffron-primary border-l-2 border-saffron-primary pl-4">About Section</h2>
        <Field label="Biography (Double enter for paragraphs)">
          <textarea 
            rows={8} 
            value={editingContent.about.bio} 
            onChange={e => handleStringChange('about', 'bio', e.target.value)} 
            className="input leading-relaxed w-full" 
          />
        </Field>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           {editingContent.about.stats.map((stat, i) => (
             <Field key={i} label={`Stat ${i+1} - Label & Value`}>
               <div className="flex flex-col gap-2">
                 <input 
                   type="text" 
                   value={stat.label} 
                   onChange={e => {
                     const newStats = [...editingContent.about.stats];
                     newStats[i].label = e.target.value;
                     handleStringChange('about', 'stats', newStats);
                   }} 
                   className="input" 
                 />
                 <input 
                   type="number" 
                   value={stat.value} 
                   onChange={e => {
                     const newStats = [...editingContent.about.stats];
                     newStats[i].value = Number(e.target.value);
                     handleStringChange('about', 'stats', newStats);
                   }} 
                   className="input font-display text-xl" 
                 />
               </div>
             </Field>
           ))}
        </div>
      </section>

      {/* Literary Voice Section */}
      <section className="space-y-6">
        <h2 className="font-display text-2xl text-saffron-primary border-l-2 border-saffron-primary pl-4">Literary Voice</h2>
        <Field label="Writer's Philosophy Quote">
          <textarea 
            rows={3} 
            value={editingContent.voice.philosophyQuote} 
            onChange={e => handleStringChange('voice', 'philosophyQuote', e.target.value)} 
            className="input italic w-full" 
          />
        </Field>
      </section>

      {/* Classroom Section */}
      <section className="space-y-6">
        <h2 className="font-display text-2xl text-saffron-primary border-l-2 border-saffron-primary pl-4">The Classroom</h2>
        <Field label="Teaching Philosophy">
          <textarea 
            rows={4} 
            value={editingContent.classroom.philosophy} 
            onChange={e => handleStringChange('classroom', 'philosophy', e.target.value)} 
            className="input w-full" 
          />
        </Field>
        <Field label="Student Quote Placeholder">
          <textarea 
            rows={2} 
            value={editingContent.classroom.studentQuote} 
            onChange={e => handleStringChange('classroom', 'studentQuote', e.target.value)} 
            className="input italic w-full" 
          />
        </Field>
        
        <div className="pt-4 space-y-4">
          <p className="font-mono text-xs uppercase tracking-widest text-saffron-text/60">Workshop Cards</p>
          {editingContent.classroom.workshopCards.map((workshop, i) => (
             <div key={workshop.id} className="p-4 bg-saffron-surface/20 border border-saffron-surface grid grid-cols-1 md:grid-cols-2 gap-4">
                <input 
                  type="text" 
                  value={workshop.title} 
                  onChange={e => {
                    const newCards = [...editingContent.classroom.workshopCards];
                    newCards[i].title = e.target.value;
                    handleStringChange('classroom', 'workshopCards', newCards);
                  }} 
                  className="input font-display text-xl" 
                />
                <input 
                  type="text" 
                  value={workshop.desc} 
                  onChange={e => {
                    const newCards = [...editingContent.classroom.workshopCards];
                    newCards[i].desc = e.target.value;
                    handleStringChange('classroom', 'workshopCards', newCards);
                  }} 
                  className="input" 
                />
             </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="space-y-6">
        <h2 className="font-display text-2xl text-saffron-primary border-l-2 border-saffron-primary pl-4">Contact & Footer</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Field label="Email Address">
            <input 
              type="email" 
              value={editingContent.contact.email} 
              onChange={e => handleStringChange('contact', 'email', e.target.value)} 
              className="input" 
            />
          </Field>
          <Field label="Footer Text">
            <input 
              type="text" 
              value={editingContent.footer.text} 
              onChange={e => handleStringChange('footer', 'text', e.target.value)} 
              className="input text-xs" 
            />
          </Field>
        </div>
        
        <div className="pt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
          {editingContent.contact.socials.map((social, i) => (
             <Field key={i} label={`${social.platform} Link`}>
                <input 
                  type="url" 
                  value={social.url} 
                  onChange={e => {
                    const newSocials = [...editingContent.contact.socials];
                    newSocials[i].url = e.target.value;
                    handleStringChange('contact', 'socials', newSocials);
                  }} 
                  className="input" 
                />
             </Field>
          ))}
        </div>
      </section>
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
