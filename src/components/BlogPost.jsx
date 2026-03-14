import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PortableText } from '@portabletext/react';
import imageUrlBuilder from '@sanity/image-url';
import { client } from '../sanityClient';
import Nav from './Nav';

// 1. Set up the image builder
const builder = imageUrlBuilder(client);
function urlFor(source) {
  return builder.image(source);
}

// 2. Create a "rules" object for how to style her rich text
const richTextStyles = {
  // Add 'types' to handle non-text blocks like images
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) return null;
      return (
        <img
          alt={value.alt || 'Blog post image'}
          loading="lazy"
          src={urlFor(value).width(800).fit('max').auto('format').url()}
          className="my-8 rounded-lg shadow-lg w-full max-w-2xl object-cover"
        />
      );
    },
  },
  block: {
    // Every time she makes a normal paragraph, it uses these classes
    normal: ({children}) => <p className="mb-6 text-lg leading-relaxed text-saffron-text/90 font-body">{children}</p>,
    
    // Fix for the Top Heading (H1)
    h1: ({children}) => <h1 className="text-4xl md:text-5xl font-display text-saffron-primary mt-12 mb-6">{children}</h1>,
    
    // Every time she makes an H2 heading, it uses your sophisticated font and color
    h2: ({children}) => <h2 className="text-3xl font-display text-saffron-primary mt-10 mb-4">{children}</h2>,
    
    h3: ({children}) => <h3 className="text-2xl font-display text-saffron-text mt-8 mb-4">{children}</h3>,
    
    // Every time she uses the "Quote" block in the studio
    blockquote: ({children}) => (
      <blockquote className="border-l-4 border-saffron-primary bg-saffron-surface/20 p-6 italic text-xl my-8 text-saffron-text/80 font-display">
        {children}
      </blockquote>
    ),
  },
  marks: {
    // Style her bold text
    strong: ({children}) => <strong className="font-bold text-saffron-primary">{children}</strong>,
    // Style her links
    link: ({children, value}) => (
      <a href={value?.href} target="_blank" rel="noopener noreferrer" className="text-saffron-primary hover:text-saffron-text underline decoration-saffron-primary/30 transition-colors">
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({children}) => <ul className="list-disc pl-8 mb-6 text-lg text-saffron-text/90 space-y-2">{children}</ul>,
    number: ({children}) => <ol className="list-decimal pl-8 mb-6 text-lg text-saffron-text/90 space-y-2">{children}</ol>,
  },
};

export default function BlogPost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch a single post either by slug or _id
    client.fetch(`*[_type == "post" && (slug.current == $id || _id == $id)][0] {
      _id,
      title,
      publishedAt,
      body, 
      mainImage{
        asset->{
          url
        }
      }
    }`, { id }).then((data) => {
      setPost(data);
      setLoading(false);
    }).catch((err) => {
      console.error(err);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-saffron-bg flex items-center justify-center">
        <div className="text-saffron-primary font-display text-2xl animate-pulse">Loading...</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-saffron-bg flex flex-col items-center justify-center">
        <h1 className="text-4xl font-display text-saffron-primary mb-4">Post not found</h1>
        <Link to="/blog" className="text-saffron-text hover:text-saffron-primary transition-colors underline">Return to Blog</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-saffron-bg">
      <Nav />
      <article className="max-w-3xl mx-auto pt-32 pb-24 px-6 md:px-0">
        <Link to="/blog" className="inline-flex items-center text-saffron-text/60 hover:text-saffron-primary transition-colors font-mono text-sm uppercase tracking-widest mb-12 group">
          <svg className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Musings
        </Link>
        
        {/* Blog Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display text-saffron-text mb-6 leading-tight">{post.title}</h1>
          <p className="font-mono text-saffron-primary tracking-widest uppercase text-sm">
            {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : 'Unknown Date'}
          </p>
        </div>

        {post.mainImage && (
          <div className="mb-16 rounded-xl overflow-hidden shadow-2xl shadow-black/20">
            <img 
              src={post.mainImage.asset.url} 
              alt={post.title} 
              className="w-full h-auto max-h-[600px] object-cover"
            />
          </div>
        )}
        
        {/* The Magic Rich Text Renderer */}
        <div className="prose-lg">
          <PortableText 
            value={post.body} 
            components={richTextStyles} 
          />
        </div>
      </article>
    </div>
  );
}
