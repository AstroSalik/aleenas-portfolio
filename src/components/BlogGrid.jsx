import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { client } from '../sanityClient';
import Nav from './Nav';

export default function BlogGrid() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    client.fetch(`*[_type == "post"] | order(publishedAt desc) {
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
    <div className="min-h-screen bg-saffron-bg">
      <Nav />
      
      {/* Hero Section of Blog Page */}
      <div className="pt-40 pb-20 px-4 relative overflow-hidden border-b border-saffron-surface/50">
        <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-saffron-surface/20 to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
           <motion.h1 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, ease: "easeOut" }}
             className="text-5xl md:text-7xl font-display text-saffron-text mb-6"
           >
             The Reading Room
           </motion.h1>
           <motion.p 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ duration: 1, delay: 0.3 }}
             className="font-mono text-sm tracking-widest text-saffron-primary uppercase"
           >
             Essays, thoughts, and reflections
           </motion.p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto pt-16 pb-32 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          {posts.map((post, idx) => (
             <motion.div
               key={post._id}
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: "-100px" }}
               transition={{ duration: 0.7, delay: idx % 2 === 0 ? 0 : 0.2 }}
               className="flex h-full"
             >
               <Link to={`/blog/${post.slug?.current || post._id}`} className="group w-full h-full flex flex-col">
                 <div className="relative rounded-xl overflow-hidden mb-8 aspect-[16/10] bg-saffron-surface/20 shadow-2xl">
                   {post.mainImage ? (
                      <img 
                        src={post.mainImage.asset.url} 
                        alt={post.title} 
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      />
                   ) : (
                      <div className="w-full h-full flex items-center justify-center font-display text-xl text-saffron-text/30">
                        No Image
                      </div>
                   )}
                   <div className="absolute inset-0 bg-saffron-bg/20 group-hover:bg-transparent transition-colors duration-500" />
                 </div>
                 <div className="px-2 flex flex-col flex-grow">
                   <div className="flex items-center gap-4 mb-4">
                     <div className="h-px bg-saffron-primary w-12" />
                     <p className="font-mono text-xs tracking-widest text-saffron-text/50 uppercase">
                       {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) : 'Unknown Date'}
                     </p>
                   </div>
                   <h3 className="text-3xl md:text-4xl font-display text-saffron-text mb-6 group-hover:text-saffron-primary transition-colors leading-tight">
                     {post.title}
                   </h3>
                   <span className="font-display italic text-lg text-saffron-text/60 group-hover:text-saffron-primary transition-colors inline-flex items-center gap-2 mt-auto">
                      Read Piece
                      <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                   </span>
                 </div>
               </Link>
             </motion.div>
          ))}
        </div>
        
        {posts.length === 0 && (
          <div className="py-24 text-center text-saffron-text/50 font-display italic text-2xl">
            No musings available yet.
          </div>
        )}
      </div>
    </div>
  );
}
