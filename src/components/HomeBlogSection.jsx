import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { client } from '../sanityClient';
import { useScrollAnimation, fadeUpVariant, staggerContainer } from '../hooks/useScrollAnimation';

export default function HomeBlogSection() {
  const [posts, setPosts] = useState([]);
  const { ref, controls } = useScrollAnimation(0.1);

  useEffect(() => {
    client.fetch(`*[_type == "post"] | order(publishedAt desc)[0...2] {
      _id,
      title,
      publishedAt,
      slug,
      mainImage{
        asset->{
          url
        }
      }
    }`).then((data) => {
      setPosts(data);
    }).catch(console.error);
  }, []);

  return (
    <section id="musings" className="w-full pt-16 pb-24 md:py-32 bg-saffron-bg border-t border-saffron-surface relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
           ref={ref}
           variants={staggerContainer}
           initial="hidden"
           animate={controls}
           className="flex flex-col gap-12"
        >
          {/* Section Header */}
          <motion.div variants={fadeUpVariant} className="flex flex-col items-center text-center gap-6 mb-12">
            <div>
              <h2 className="font-display text-4xl md:text-6xl text-saffron-text mb-4">Literary Musings</h2>
              <p className="font-mono text-sm tracking-widest text-saffron-text/60 uppercase">Thoughts unraveling on the page</p>
              <span className="block w-12 h-0.5 bg-saffron-primary mt-4 mx-auto" />
            </div>
          </motion.div>

          {/* Blog Grid */}
          <motion.div variants={fadeUpVariant} className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto w-full">
            {posts.map((post) => (
              <Link to={`/blog/${post.slug?.current || post._id}`} key={post._id} className="group flex flex-col items-start block w-full">
                <div className="w-full aspect-[4/3] rounded-lg overflow-hidden mb-6 relative shadow-xl shadow-black/10">
                  {post.mainImage ? (
                    <img 
                      src={post.mainImage.asset.url} 
                      alt={post.title} 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-saffron-surface/30 flex items-center justify-center">
                       <span className="font-display text-saffron-text/30 text-xl">No Image</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-saffron-bg/10 group-hover:bg-transparent transition-colors duration-500" />
                </div>
                
                <p className="font-mono text-xs text-saffron-primary tracking-widest uppercase mb-3">
                  {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : 'Unknown Date'}
                </p>
                <h3 className="text-3xl font-display text-saffron-text mb-4 group-hover:text-saffron-primary transition-colors leading-snug">
                  {post.title}
                </h3>
                <span className="flex items-center gap-2 font-display italic text-lg text-saffron-text/60 group-hover:text-saffron-primary transition-colors mt-auto">
                    Read Article 
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </span>
              </Link>
            ))}
          </motion.div>

          {posts.length > 0 && (
            <motion.div variants={fadeUpVariant} className="flex justify-center mt-12 w-full">
               <Link 
                to="/blog"
                className="font-mono text-xs uppercase tracking-widest px-8 py-4 border border-saffron-primary/30 text-saffron-primary hover:bg-saffron-primary hover:text-saffron-bg transition-all duration-300 shadow-[0_0_20px_rgba(232,168,48,0.05)]"
              >
                Enter the Archive →
              </Link>
            </motion.div>
          )}

        </motion.div>
      </div>
    </section>
  );
}
