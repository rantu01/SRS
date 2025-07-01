import React from "react";

const blogPosts = [
  {
    id: 1,
    title: "How to Choose the Right Service Provider",
    date: "2025-06-01",
    excerpt:
      "Finding the perfect service provider can be tricky. Learn tips to select the best professionals for your needs.",
    url: "/blog/choose-service-provider",
  },
  {
    id: 2,
    title: "Boost Your Business with Marketing Services",
    date: "2025-05-25",
    excerpt:
      "Discover effective marketing strategies that can take your business to the next level.",
    url: "/blog/boost-business-marketing",
  },
  {
    id: 3,
    title: "Top Trends in Software Development for 2025",
    date: "2025-05-10",
    excerpt:
      "Stay updated with the latest software development trends and tools to keep your projects ahead.",
    url: "/blog/software-development-trends",
  },
];

const BlogSection = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16 bg-gradient-to-b from-amber-50 to-amber-100 rounded-xl shadow-lg">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-amber-900 mb-4">
          Latest Insights
        </h2>
        <div className="w-24 h-1.5 bg-amber-600 mx-auto rounded-full"></div>
      </div>
      
      <div className="grid gap-8 md:grid-cols-3">
        {blogPosts.map(({ id, title, date, excerpt, url }) => (
          <article
            key={id}
            className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            <div className="p-8">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mr-4">
                  <span className="text-amber-600 font-bold">{id}</span>
                </div>
                <time
                  className="text-sm font-medium text-gray-500"
                  dateTime={date}
                >
                  {new Date(date).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </time>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-4 leading-tight group-hover:text-amber-700 transition-colors">
                {title}
              </h3>
              
              <p className="text-gray-600 mb-6 line-clamp-3">{excerpt}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default BlogSection;