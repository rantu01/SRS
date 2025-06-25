import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function NotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 8000);
    return () => clearTimeout(timer);
  }, [navigate]);

  // Top services data
  const topServices = [
    { name: 'Plumbing', rating: 4.9 },
    { name: 'Electrical', rating: 4.8 },
    { name: 'Cleaning', rating: 4.7 },
    { name: 'Landscaping', rating: 4.6 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full bg-white rounded-2xl shadow-xl overflow-hidden p-0 text-center border border-gray-100"
      >
        {/* Decorative header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4">
          <h1 className="text-white text-sm font-medium uppercase tracking-wider">Service Review System</h1>
        </div>

        <div className="p-8 md:p-10">
          <motion.div
            animate={{ 
              rotate: [0, 5, -5, 0],
              y: [0, -10, 0]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 4,
              ease: "easeInOut" 
            }}
            className="flex justify-center mb-8"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-28 w-28 text-indigo-500" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5} 
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
          </motion.div>
          
          <motion.h1 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-6xl font-bold text-gray-800 mb-3"
          >
            404
          </motion.h1>
          
          <motion.h2 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-semibold text-gray-700 mb-6"
          >
            Page Not Found
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-gray-600 mb-8 text-lg leading-relaxed"
          >
            The page you requested couldn't be found. It might have been moved or deleted.
            <br />
            Don't worry - we'll take you back to safety in just a moment.
          </motion.p>

          {/* Popular services section */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mb-10"
          >
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
              Popular Services Right Now
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {topServices.map((service, index) => (
                <motion.div
                  key={service.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="bg-gray-50 p-3 rounded-lg border border-gray-200 hover:border-indigo-300 transition-colors"
                >
                  <div className="text-indigo-600 font-medium">{service.name}</div>
                  <div className="flex items-center justify-center mt-1">
                    <span className="text-yellow-500 text-sm">★</span>
                    <span className="text-gray-600 text-sm ml-1">{service.rating}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <motion.button
              whileHover={{ 
                scale: 1.03,
                boxShadow: "0 5px 15px rgba(79, 70, 229, 0.3)"
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/')}
              className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-300 ease-in-out shadow-md"
            >
              Return to Homepage
              <span className="ml-2">→</span>
            </motion.button>
            
            <div className="mt-6 text-sm text-gray-400">
              Auto-redirect in 8 seconds...
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-8 py-4 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Service Review System. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-2 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-indigo-600 transition-colors">
                <span className="sr-only">Help Center</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-indigo-600 transition-colors">
                <span className="sr-only">Contact Support</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}