import React from "react";
import { Link } from "react-router";

const Pricing = () => {
  const plans = [
    {
      name: "Starter",
      price: "Free",
      period: "",
      description: "Perfect for testing the platform",
      features: [
        "1 Service Listing",
        "Basic Profile",
        "Community Access",
        "Email Support"
      ],
      cta: "Get Started",
      popular: false
    },
    {
      name: "Professional",
      price: "$9.99",
      period: "/month",
      description: "For growing businesses",
      features: [
        "5 Service Listings",
        "Enhanced Profile",
        "Basic Analytics",
        "Priority Support",
        "Promotion Tools"
      ],
      cta: "Start Free Trial",
      popular: true
    },
    {
      name: "Enterprise",
      price: "$24.99",
      period: "/month",
      description: "For established businesses",
      features: [
        "Unlimited Listings",
        "Premium Profile",
        "Advanced Analytics",
        "24/7 Support",
        "Featured Listings",
        "Marketing Tools"
      ],
      cta: "Contact Sales",
      popular: false
    }
  ];

  return (
    <div className="bg-amber-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-amber-900 mb-4">Simple, Transparent Pricing</h2>
          <div className="w-24 h-1.5 bg-amber-600 mx-auto rounded-full mb-6"></div>
          <p className="text-xl text-amber-800 max-w-2xl mx-auto">
            Choose the perfect plan for your business needs. No hidden fees.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`relative rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl
                ${plan.popular ? "ring-2 ring-amber-500 transform md:-translate-y-4" : "bg-white"}`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-amber-600 text-white text-sm font-semibold px-4 py-1 rounded-full shadow-md">
                  Most Popular
                </div>
              )}
              
              <div className={`p-8 ${plan.popular ? "bg-amber-50" : "bg-white"}`}>
                <h3 className="text-2xl font-bold text-amber-900 mb-2">{plan.name}</h3>
                <p className="text-amber-700 mb-6">{plan.description}</p>
                
                <div className="mb-8">
                  <span className="text-4xl font-bold text-amber-900">{plan.price}</span>
                  <span className="text-amber-700">{plan.period}</span>
                </div>
                
                <ul className="space-y-3 mb-10">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <svg className="h-5 w-5 text-amber-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-amber-800">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link
                  to={plan.name === "Enterprise" ? "/register" : "/register"}
                  className={`block w-full text-center px-6 py-3 rounded-lg font-semibold transition-colors
                    ${plan.popular 
                      ? "bg-amber-600 hover:bg-amber-700 text-white shadow-md" 
                      : "bg-white text-amber-700 border-2 border-amber-600 hover:bg-amber-50"}`}
                >
                  {plan.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;