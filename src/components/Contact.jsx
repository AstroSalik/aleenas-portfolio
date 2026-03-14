import { motion } from 'framer-motion';
import { useScrollAnimation, fadeUpVariant, staggerContainer } from '../hooks/useScrollAnimation';
import { useAdmin } from '../hooks/useAdmin';

export default function Contact() {
  const { content } = useAdmin();
  const { ref, controls } = useScrollAnimation(0.2);

  return (
    <section id="contact" className="w-full bg-[#110609] border-t border-saffron-surface pt-32 pb-12 flex flex-col justify-between min-h-[70vh]">
      <div className="max-w-7xl mx-auto px-6 w-full flex-grow flex items-center justify-center">
        <motion.div
           ref={ref}
           variants={staggerContainer}
           initial="hidden"
           animate={controls}
           className="text-center max-w-2xl"
        >
          <motion.h2 
            variants={fadeUpVariant}
            className="font-display text-5xl md:text-7xl text-saffron-text mb-6 tracking-tight"
          >
            Let's Begin a Conversation
          </motion.h2>

          <motion.p 
            variants={fadeUpVariant}
            className="font-body text-xl text-saffron-text/70 mb-16 leading-relaxed"
          >
            For collaborations, workshops, speaking invitations, or simply to share what you thought of a story.
          </motion.p>

          <motion.div variants={fadeUpVariant} className="mb-16">
            <a 
              href={`mailto:${content.contact.email}`}
              className="font-mono text-lg md:text-xl text-saffron-primary hover:text-saffron-text transition-colors tracking-widest uppercase border-b border-saffron-primary/30 hover:border-saffron-primary pb-2"
            >
              {content.contact.email}
            </a>
          </motion.div>

          <motion.div variants={fadeUpVariant} className="flex justify-center gap-12">
            {content.contact.socials.map((social) => (
              <a 
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-sm uppercase tracking-widest text-saffron-text/50 hover:text-saffron-primary transition-colors hover:-translate-y-1 transform duration-300"
              >
                {social.platform}
              </a>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <div className="w-full text-center mt-24">
        <p className="font-mono text-xs uppercase tracking-widest text-saffron-text/30">
          {content.footer.text}
        </p>
      </div>
    </section>
  );
}
