// src/components/DiscoverSection.jsx
import React from 'react';

const DiscoverSection = () => {
  const features = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: "Expand Your Network",
      description: "Connect with valuable clients and partners through our curated networking platform designed for meaningful business relationships."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      title: "Accelerate Growth",
      description: "Leverage data-driven insights and strategic tools to scale your business efficiently and maximize profitability."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "Enhance Credibility",
      description: "Build trust and authority in your industry with our reputation management tools and verified client testimonials."
    }
  ];

  return (
    <section className="bg-gradient-to-b from-amber-400 to-amber-900 text-white py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Unlock <span className="text-amber-900">New Opportunities</span>
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Transform your business with innovative solutions designed for today's competitive landscape.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-gradient-to-br from-amber-50 to-amber-100 bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl p-8 transition-all duration-300 hover:scale-105 hover:bg-opacity-20 hover:shadow-2xl"
            >
              <div className="bg-white bg-opacity-20 rounded-full p-4 w-20 h-20 flex items-center justify-center mx-auto mb-6">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-semibold text-center mb-4 text-black">
                {feature.title}
              </h3>
              <p className="text-black text-center">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DiscoverSection;