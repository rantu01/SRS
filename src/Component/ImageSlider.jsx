import React from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router";

const ImageSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 7000,
    arrows: true,
    pauseOnHover: true,
    fade: true,
    cssEase: "cubic-bezier(0.645, 0.045, 0.355, 1)",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          arrows: false,
        },
      },
    ],
  };

  const slides = [
    {
      image: "https://i.ibb.co/qMWgBRGP/photo-1521791136064-7986c2920216.jpg",
      title: "Explore Trusted Services",
      text: "Find authentic reviews from real users before making your decision.",
      cta: "Browse Services",
      overlay:
        "linear-gradient(112deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 100%)",
      route: "all-services",
    },
    {
      image: "https://i.ibb.co/V0mDrnVt/photo-1486312338219-ce68d2c6f44d.jpg",
      title: "Share Your Experience",
      text: "Contribute to our community by posting your honest feedback.",
      cta: "Add a Service",
      overlay:
        "linear-gradient(112deg, rgba(20,30,48,0.9) 0%, rgba(36,59,85,0.6) 100%)",
      route: "add-service",
    },
    {
      image: "https://i.ibb.co/LDjT6FX3/photo-1522202176988-66273c2fd55f.jpg",
      title: "Your Opinion Matters",
      text: "Rate services and help others make informed choices.",
      cta: "Join Now",
      overlay:
        "linear-gradient(112deg, rgba(106,17,203,0.7) 0%, rgba(37,117,252,0.5) 100%)",
      route: "login",
    },
  ];

  // Animation variants
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <div className="w-full my-16 px-4 sm:px-6 lg:px-8">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div
            key={index}
            className="relative h-[70vh] max-h-[800px] w-full rounded-xl overflow-hidden"
          >
            {/* Image with dynamic overlay gradient */}
            <div
              className="absolute inset-0 z-10 rounded-xl"
              style={{ background: slide.overlay }}
            ></div>

            <motion.img
              src={slide.image}
              alt={`Slide ${index + 1}`}
              className="h-full w-full object-cover rounded-xl"
              loading={index === 0 ? "eager" : "lazy"}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 10, ease: "linear" }}
            />

            {/* Content with staggered animations */}
            <div className="absolute inset-0 z-20 flex flex-col justify-center items-start p-8 md:p-16 lg:p-24">
              <motion.div
                className="max-w-2xl space-y-6"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.15,
                    },
                  },
                }}
              >
                <motion.h2
                  className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white"
                  variants={textVariants}
                >
                  {slide.title}
                </motion.h2>

                <motion.p
                  className="text-xl md:text-2xl text-gray-100 opacity-90 leading-relaxed max-w-lg"
                  variants={textVariants}
                >
                  {slide.text}
                </motion.p>

                <motion.div variants={textVariants}>
                  <Link to={slide.route}>
                    <button
                      className="mt-8 px-8 py-4 bg-white text-gray-900 font-semibold rounded-lg hover:bg-opacity-90 transition-all duration-300 flex items-center group shadow-xl"
                      aria-label={slide.cta}
                    >
                      <span>{slide.cta}</span>
                      <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                    </button>
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </div>
        ))}
      </Slider>

      {/* Custom dot and arrow styling */}
      <style jsx global>{`
        .slick-dots {
          bottom: 30px !important;
        }
        .slick-dots li {
          margin: 0 6px !important;
        }
        .slick-dots li button:before {
          color: rgba(255, 255, 255, 0.5) !important;
          font-size: 10px !important;
          transition: all 0.3s ease !important;
        }
        .slick-dots li.slick-active button:before {
          color: white !important;
          opacity: 1 !important;
          transform: scale(1.4) !important;
        }
        .slick-prev,
        .slick-next {
          width: 50px !important;
          height: 50px !important;
          z-index: 10 !important;
          background: rgba(255, 255, 255, 0.1) !important;
          backdrop-filter: blur(5px) !important;
          border-radius: 50% !important;
          transition: all 0.3s ease !important;
        }
        .slick-prev:hover,
        .slick-next:hover {
          background: rgba(255, 255, 255, 0.2) !important;
        }
        .slick-prev {
          left: 25px !important;
        }
        .slick-next {
          right: 25px !important;
        }
        .slick-prev:before,
        .slick-next:before {
          font-size: 24px !important;
          opacity: 0.8 !important;
          color: white !important;
        }
      `}</style>
    </div>
  );
};

export default ImageSlider;
