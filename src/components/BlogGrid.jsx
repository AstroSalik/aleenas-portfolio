import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { client } from '../sanityClient';
import Nav from './Nav';

export default function BlogGrid() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // This is GROQ (Sanity's query language). It says: "Get all posts, newest first, and give me the title, date, and image URL."
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
      <div className="max-w-4xl mx-auto pt-32 pb-12 px-4">
        <h2 className="text-4xl font-display text-saffron-primary mb-12 text-center">Literary Musings</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post) => (
            <Link to={`/blog/${post.slug?.current || post._id}`} key={post._id} className="group">
              <div className="bg-saffron-surface/30 border border-saffron-surface hover:border-saffron-primary/50 transition-all duration-300 rounded-lg overflow-hidden h-full flex flex-col">
                {post.mainImage && (
                  <div className="overflow-hidden">
                    <img 
                      src={post.mainImage.asset.url} 
                      alt={post.title} 
                      className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-display text-saffron-text mb-3 group-hover:text-saffron-primary transition-colors">{post.title}</h3>
                  </div>
                  <p className="text-sm font-mono text-saffron-text/50 mt-4">
                    {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : 'Unknown Date'}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
