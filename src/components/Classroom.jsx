import { motion } from 'framer-motion';
import { useScrollAnimation, fadeUpVariant, staggerContainer } from '../hooks/useScrollAnimation';
import { useAdmin } from '../hooks/useAdmin';

export default function Classroom() {
  const { content } = useAdmin();
  const { ref, controls } = useScrollAnimation(0.2);

  return (
    <section id="classroom" className="w-full py-24 bg-saffron-bg border-t border-saffron-surface">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={controls}
          className="flex flex-col gap-16"
        >
          {/* Section Header */}
          <motion.div variants={fadeUpVariant} className="text-center">
            <h2 className="font-display text-4xl md:text-6xl text-saffron-text mb-4 inline-block">
              The Classroom
              <span className="block w-12 h-0.5 bg-saffron-primary mt-4 mx-auto" />
            </h2>
            <br />
            <p className="font-mono text-sm tracking-widest text-saffron-text/60 uppercase">Where words find their first wings</p>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-16">
            <motion.div variants={fadeUpVariant} className="w-full lg:w-5/12">
               <p className="font-body text-xl md:text-2xl text-saffron-text/90 leading-relaxed mb-12 relative pl-6 border-l-2 border-saffron-primary/30">
                 {content.classroom.philosophy}
               </p>

            </motion.div>

            <motion.div variants={staggerContainer} className="w-full lg:w-7/12 flex flex-col gap-6">
               <h3 className="font-mono text-xs uppercase tracking-widest text-saffron-primary mb-2">Workshops &amp; Offerings</h3>
               
               {content.classroom.workshopCards.map((workshop, idx) => (
                 <motion.div 
                   key={idx}
                   variants={fadeUpVariant}
                   className="group relative p-8 bg-[#110609] border border-saffron-surface overflow-hidden"
                 >
                    <div className="absolute inset-0 bg-saffron-primary/5 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-in-out pointer-events-none z-0" />
                 
                    <div className="relative z-10 flex flex-col">
                      <h4 className="font-display text-2xl text-saffron-text mb-3 group-hover:text-saffron-primary transition-colors duration-300">
                        {workshop.title}
                      </h4>
                      <p className="font-body text-saffron-text/70">{workshop.desc}</p>
                    </div>
                 </motion.div>
               ))}

               <motion.div variants={fadeUpVariant} className="mt-8">
                  <a 
                    href="#contact" 
                    className="inline-flex items-center gap-3 font-mono text-sm uppercase tracking-widest text-saffron-primary hover:text-saffron-text transition-colors group"
                  >
                    Invite Aleena to your institution
                    <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
               </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
