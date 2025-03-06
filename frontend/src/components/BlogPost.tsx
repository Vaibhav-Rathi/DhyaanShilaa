import { ChevronRight } from 'lucide-react';

const BlogNewsEvents = () => {
  const blogPosts = [
    {
      id: 1,
      date: '21 Feb 2025',
      title: 'An Easy Way to Start Learning Programming - Einfratch Solutions',
      excerpt: 'Becoming a programmer has become quite simple for anyone to learn nowadays...',
      imageUrl: '/BlogImage1.png',
    },
    {
      id: 2,
      date: '18 Feb 2024',
      title: 'Tips for Creating a Business Landing Page - Einfratech',
      excerpt: 'The importance of a website in marketing trust in a business makes...',
      imageUrl: './BlogImage2.png',
    },
    {
      id: 3,
      date: '18 Feb 2024',
      title: 'How to Install a WordPress for Beginners - Einfratech',
      excerpt: 'Creating a website can now be done without coding; now you can make it with...',
      imageUrl: '/BlogImage3.png',
    },
  ];

  return (
    <div className="w-full border border-gray-200 rounded shadow-sm">
      <div className="flex justify-between items-center p-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-800">Blog, News, and Events</h2>
        <a href="#" className="text-blue-500 text-sm flex items-center">
          See All <ChevronRight size={14} className="ml-1" />
        </a>
      </div>
      
      <div className="flex flex-col md:flex-row p-2">
        {blogPosts.map((post) => (
          <div key={post.id} className="md:w-1/3 p-2">
            <div className="h-full flex flex-col">
              <div className="h-40 overflow-hidden mb-3">
                <img 
                  src={post.imageUrl} 
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-xs text-gray-500 mb-1">{post.date}</div>
              <h3 className="font-bold text-sm mb-2 text-gray-800">{post.title}</h3>
              <p className="text-xs text-gray-600 mb-3">{post.excerpt}</p>
              <a 
                href="#" 
                className="mt-auto text-xs text-blue-500 font-medium flex items-center"
              >
                Read more <ChevronRight size={14} className="ml-1" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogNewsEvents;