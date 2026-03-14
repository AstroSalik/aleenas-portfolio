import { motion } from 'framer-motion';
import { useScrollAnimation, fadeUpVariant, staggerContainer } from '../hooks/useScrollAnimation';
import { useAdmin } from '../hooks/useAdmin';

export default function LiteraryVoice() {
  const { content } = useAdmin();
  const { ref, controls } = useScrollAnimation(0.2);

  const pillars = [
    { name: 'Realism', desc: 'The world as it is — unadorned, honest, accountable to truth.' },
    { name: 'Romance', desc: 'Not sentiment, but longing. The space between two people and what lives there.' },
    { name: 'Satire', desc: 'The sharpest form of love — to mock what you wish were better.' },
  ];

  return (
    <section id="voice" className="w-full pt-12 pb-4 md:py-24 bg-saffron-bg border-t border-saffron-surface overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={controls}
          className="flex flex-col gap-12 md:gap-24"
        >
          {/* Section Header */}
          <motion.div variants={fadeUpVariant} className="text-center mb-12">
            <h2 className="font-display text-4xl md:text-6xl text-saffron-text mb-4 inline-block">
              Literary Voice
              <span className="block w-12 h-0.5 bg-saffron-primary mt-4 mx-auto" />
            </h2>
            <br />
            <p className="font-mono text-sm tracking-widest text-saffron-text/60 uppercase">The Craft</p>
          </motion.div>

          {/* Genre Pillars */}
          <motion.div variants={fadeUpVariant} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((pillar) => (
              <div 
                key={pillar.name}
                className="group relative p-8 bg-saffron-surface/50 border border-saffron-surface hover:bg-saffron-surface transition-colors duration-500 flex flex-col justify-start h-full cursor-default"
              >
                <div className="absolute left-0 top-0 w-1 h-0 bg-saffron-primary transition-all duration-500 group-hover:h-full group-hover:shadow-[0_0_15px_rgba(232,168,48,0.6)]" />
                
                <h3 className="font-display text-3xl text-saffron-text mb-4 transition-colors duration-500 group-hover:text-saffron-primary">
                  {pillar.name}
                </h3>
                <p className="font-body text-lg text-saffron-text/80 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </motion.div>

          {/* Philosophy Quote Block */}
          <motion.div 
            variants={fadeUpVariant}
            className="w-full relative py-16 px-8 md:px-16 bg-[#110609] border-l-4 border-saffron-primary"
          >
            <div className="absolute top-8 left-8 text-6xl font-display text-saffron-surface/50 leading-none">"</div>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="font-display italic text-3xl md:text-5xl text-saffron-text leading-tight md:leading-snug relative z-10 pl-6"
            >
              {content.voice.philosophyQuote}
            </motion.p>
          </motion.div>

          {/* Influence Whispers (Horizontal Scroll) */}
          <motion.div variants={fadeUpVariant} className="w-full overflow-hidden whitespace-nowrap py-8 relative">
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-saffron-bg to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-saffron-bg to-transparent z-10 pointer-events-none" />
            
            <motion.div 
              animate={{ x: [0, -2000] }}
              transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
              className="inline-block will-change-transform"
            >
              {[...content.voice.influences, ...content.voice.influences].map((influence, idx) => (
                <span key={idx} className="font-display italic text-4xl md:text-6xl text-saffron-text/15 mx-12">
                  {influence} <span className="text-saffron-bg mx-4">·</span>
                </span>
              ))}
            </motion.div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
