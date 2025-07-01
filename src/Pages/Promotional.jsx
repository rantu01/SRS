import React from "react";
import { Link } from "react-router";

const Promotional = () => {
  return (
    <div className="relative bg-gradient-to-br from-amber-50 via-amber-100 to-amber-200 rounded-2xl shadow-xl overflow-hidden mx-4 md:mx-0 ">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-amber-300/20"></div>
        <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-amber-400/20"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-8 py-16 md:py-24 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex-1 text-center md:text-left space-y-6">
            <div>
              <span className="inline-block px-4 py-2 bg-amber-600 text-white text-sm font-semibold rounded-full mb-4 shadow-md">
                Exclusive Offer
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-amber-900 leading-tight">
                Limited Time <br className="hidden md:block"/> Opportunity
              </h2>
            </div>
            
            <p className="text-xl text-amber-800/90 max-w-2xl leading-relaxed">
              Get <span className="font-bold text-amber-700">20% off</span> when you add your
              first service today. Expand your business reach and connect with 
              premium customers through our platform.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/add-service"
                className="px-8 py-4 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-center"
              >
                Add Your Service Now
              </Link>
              <Link
                to="/pricing"
                className="px-8 py-4 border-2 border-amber-600 text-amber-700 hover:bg-amber-600/10 font-medium rounded-lg transition-colors duration-300 text-center"
              >
                View Pricing
              </Link>
            </div>
          </div>
          
          <div className="hidden lg:block flex-1 relative">
            <div className="absolute -right-10 w-full max-w-md h-64 bg-amber-300/30 rounded-3xl rotate-12"></div>
            <div className="absolute -right-10 w-full max-w-md h-64 bg-amber-400/20 rounded-3xl rotate-6"></div>
            <div className="relative w-full max-w-md h-64 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 flex flex-col justify-center">
              <div className="text-amber-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-amber-900 mb-2">Special Offer</h3>
              <p className="text-amber-800">First service listing at 20% discount. Limited time only.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Promotional;