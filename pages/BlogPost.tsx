import { useParams, Link } from 'react-router-dom';
import { mockBlogPosts } from './Blog';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';

const BlogPost = () => {
  const { slug } = useParams();
  const post = mockBlogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">404 - Blog Post Not Found</h1>
        <Link to="/blog" className="text-primaryRed flex items-center gap-2 font-medium">
          <ArrowLeft size={18} /> Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <Link to="/blog" className="text-primaryRed flex items-center gap-2 font-medium mb-8">
          <ArrowLeft size={18} /> Back to Blog
        </Link>
        <img src={post.image} alt={post.title} className="w-full h-64 object-cover rounded-xl mb-6" />
        <div className="flex items-center gap-4 mb-4">
          <span className="px-3 py-1 bg-primaryRed/10 text-primaryRed text-xs font-bold rounded-full">{post.category}</span>
          <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
            <Calendar size={14} className="mr-1" />
            {post.date}
          </div>
          <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
            <Clock size={14} className="mr-1" />
            {post.readTime}
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{post.title}</h1>
        <div className="flex items-center mb-8">
          <img src={post.authorImage} alt={post.author} className="w-10 h-10 rounded-full object-cover border-2 border-white dark:border-gray-700 mr-3" />
          <div>
            <span className="block font-medium text-gray-900 dark:text-white text-sm">{post.author}</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">{post.authorRole}</span>
          </div>
        </div>
        <div className="prose prose-lg max-w-none dark:prose-invert mb-8">
          {/* WARNING: Using dangerouslySetInnerHTML for demo/mock content only. In production, sanitize or use a markdown renderer! */}
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
      </div>
    </div>
  );
};

export default BlogPost; 