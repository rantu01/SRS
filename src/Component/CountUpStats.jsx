import CountUp from "react-countup";
import { useEffect, useState } from "react";
import { FiUsers, FiSettings, FiMessageSquare } from "react-icons/fi";
import { motion } from "framer-motion";

const CountupStats = () => {
  const [stats, setStats] = useState({
    users: 0,
    services: 0,
    reviews: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("https://srs-backend-3wa7.onrender.com/stats/counts");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setStats(data);
      } catch (err) {
        console.error("Failed to load stats:", err);
        setError("Failed to load statistics. Please try again later.");
        // Set default values for demo purposes
        setStats({
          users: 0,
          services: 0,
          reviews: 0,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statItems = [
    {
      title: "Total Users",
      value: stats.users,
      icon: <FiUsers className="h-6 w-6" />,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      desc: "Active community members",
    },
    {
      title: "Total Services",
      value: stats.services,
      icon: <FiSettings className="h-6 w-6" />,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      desc: "Quality services listed",
    },
    {
      title: "Total Reviews",
      value: stats.reviews,
      icon: <FiMessageSquare className="h-6 w-6" />,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
      desc: "Verified user feedback",
    },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 my-8"
    >
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-xl overflow-hidden shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 divide-y md:divide-y-0 md:divide-x divide-gray-200">
          {statItems.map((item, index) => (
            <div 
              key={index}
              className={`stat p-6 ${item.bgColor} hover:bg-opacity-70 transition-all duration-300`}
            >
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                <div className={`stat-figure ${item.color}`}>
                  <div className="p-3 rounded-full bg-white shadow-sm">
                    {item.icon}
                  </div>
                </div>
                
                <div className="text-center sm:text-left">
                  <div className="stat-title text-gray-600 font-medium text-sm sm:text-base">
                    {item.title}
                  </div>
                  <div className={`stat-value ${item.color} text-2xl sm:text-3xl md:text-4xl font-bold my-1`}>
                    {loading ? (
                      <div className="h-8 w-24 bg-gray-200 rounded animate-pulse mx-auto sm:mx-0"></div>
                    ) : (
                      <CountUp 
                        end={item.value} 
                        duration={2.5} 
                        separator=","
                        delay={0.2}
                      />
                    )}
                  </div>
                  <div className="stat-desc text-gray-500 text-xs sm:text-sm">
                    {item.desc}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        
      </div>
    </motion.div>
  );
};

export default CountupStats;