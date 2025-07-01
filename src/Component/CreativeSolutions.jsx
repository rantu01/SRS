import React from "react";

const CreativeSolutions = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6 py-12">
      <div className="relative bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl overflow-hidden shadow-2xl">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 bg-blue-400 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-10 right-20 w-40 h-40 bg-indigo-400 rounded-full filter blur-3xl"></div>
        </div>

        <div className="relative flex flex-col lg:flex-row">
          {/* Image Section */}
          <div className="lg:w-1/2 p-8 lg:p-12">
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="relative group overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                  alt="Team collaboration"
                  className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                  <span className="text-white font-medium">
                    Our Creative Team
                  </span>
                </div>
              </div>
              <div className="relative group overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                <img
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                  alt="Professional work"
                  className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                  <span className="text-white font-medium">
                    Quality Results
                  </span>
                </div>
              </div>
            </div>

            <div
              onClick={() =>
                window.open(
                  "https://wa.me/8801316034237",
                  "_blank",
                  "noopener,noreferrer"
                )
              }
              className="cursor-pointer bg-gradient-to-r from-amber-600 to-amber-600 text-white text-center py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-center justify-center space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span className="font-medium">
                  24/7 Online Support: +880 1316****37
                </span>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="lg:w-1/2 p-8 lg:p-12 lg:pl-0">
            <h2 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
              Turning Ideas into{" "}
              <span className="text-amber-500">Powerful Service</span> Solutions
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              At the heart of every great business is an idea waiting to be
              transformed into reality. We specialize in turning your visionary
              concepts into powerful, scalable service solutions that drive
              efficiency, innovation, and measurable success. Whether you're
              streamlining operations, enhancing customer experiences, or
              launching a cutting-edge platform, our expertise ensures your
              ideas are executed with precision and impact.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-amber-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-1">
                      9.5k+
                    </h3>
                    <p className="text-gray-600">Satisfied clients worldwide</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex items-start">
                  <div className="bg-indigo-100 p-3 rounded-lg mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-amber-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-1">
                      240+
                    </h3>
                    <p className="text-gray-600">
                      Successful projects delivered
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreativeSolutions;
