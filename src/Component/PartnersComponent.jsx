import React from 'react';
import { motion } from 'framer-motion';
import { FiExternalLink } from 'react-icons/fi';

const partners = [
  {
    id: 1,
    name: 'Tech Innovators Inc.',
    logo: 'https://i.ibb.co/6c6hST6F/image.png',
    description: 'Providing cutting-edge technology solutions and infrastructure support',
    website: 'https://techinnovators.example.com'
  },
  {
    id: 2,
    name: 'Design Collective',
    logo: 'https://i.ibb.co/23TJzCQk/image.png',
    description: 'Award-winning design agency creating beautiful user experiences',
    website: 'https://designcollective.example.com'
  },
  {
    id: 3,
    name: 'Global Payments',
    logo: 'https://i.ibb.co/bjLF2gT4/image.png',
    description: 'Secure payment processing and financial services worldwide',
    website: 'https://globalpayments.example.com'
  },
  {
    id: 4,
    name: 'CloudScale',
    logo: 'https://i.ibb.co/Pv59P38X/image.png',
    description: 'Enterprise-grade cloud hosting and infrastructure services',
    website: 'https://cloudscale.example.com'
  },
  {
    id: 5,
    name: 'Data Insights',
    logo: 'https://i.ibb.co/0ys3CzTM/image.png',
    description: 'Advanced analytics and business intelligence solutions',
    website: 'https://datainsights.example.com'
  },
  {
    id: 6,
    name: 'Green Hosting',
    logo: 'https://i.ibb.co/XfzcsMRq/image.png',
    description: 'Eco-friendly web hosting powered by renewable energy',
    website: 'https://greenhosting.example.com'
  }
];

const PartnerCard = ({ partner }) => {
  return (
    <motion.div 
      whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
      className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 transition-all duration-300 hover:border-amber-200"
    >
      <div className="p-6 flex flex-col h-full">
        <div className="flex justify-center mb-6 h-20">
          <img 
            src={partner.logo} 
            alt={partner.name} 
            className="object-contain max-h-full max-w-full"
          />
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">{partner.name}</h3>
        <p className="text-gray-600 mb-4 flex-grow">{partner.description}</p>
        <a 
          href={partner.website} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-amber-600 hover:text-amber-800 font-medium flex items-center justify-center group"
        >
          Visit website
          <FiExternalLink className="ml-1 transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </motion.div>
  );
};

const MeetOurPartners = () => {
  return (
    <section className="py-16  ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 text-sm font-semibold text-amber-600 bg-amber-100 rounded-full mb-4">
            Our Network
          </span>
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
            Meet Our Valued Partners
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We collaborate with industry leaders to deliver exceptional services and solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
          {partners.map((partner) => (
            <PartnerCard key={partner.id} partner={partner} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MeetOurPartners;