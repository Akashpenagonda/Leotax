import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Compass, Zap, Users, DollarSign } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

const features = [
  {
    icon: Compass,
    title: "Expert Guidance",
    description: "From answering your questions to helping you claim all eligible deductions, Leo makes sure you maximize your tax benefits.",
  },
  {
    icon: Zap,
    title: "Fast and Efficient",
    description: "You can complete your tax filing in just a few minutes and we make sure everything is submitted on time to avoid any penalties.",
  },
  {
    icon: Users,
    title: "Trusted by Thousands",
    description: "Leo has been trusted by thousands of individuals and businesses across the country for our exceptional customer service.",
  },
  {
    icon: DollarSign,
    title: "Affordable Pricing",
    description: "Leo offers competitive pricing plans, ensuring great value for individuals and businesses.",
  },
];

const slides = [
  {
    prefix: "Trusted by",
    highlight: "Satisfied Clients",
    suffix: "for Fast, Accurate Tax Filing",
    description: "Leo Tax Filing is trusted for fast, accurate service. We maximize refunds, ensure secure filing, and simplify taxes with expert guidance, making the process seamless and stress-free for our clients.",
  },
  {
    prefix: "Expert",
    highlight: "Tax Solutions",
    suffix: "for Your Financial Success",
    description: "Our team of certified tax professionals provides personalized guidance to help you navigate complex tax regulations and maximize your returns.",
  },
  {
    prefix: "Secure &",
    highlight: "Reliable",
    suffix: "Tax Filing Services",
    description: "With bank-level security and years of experience, we ensure your financial information is protected while delivering accurate and timely tax filing.",
  },
];

export const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  return (
    <section 
      id="home" 
      className="relative min-h-[100dvh] overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Hero Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-hero" />
      </div>

      {/* Content */}
      <div className="relative container-custom pt-20 sm:pt-32 pb-8 sm:pb-20 flex flex-col min-h-[100dvh]">
        <div className="max-w-5xl mx-auto text-center flex-1 flex flex-col justify-center">
          {/* Main Heading with Animation */}
          <div className="mb-4 sm:mb-8 min-h-[180px] sm:min-h-[320px] md:min-h-[280px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold mb-4 sm:mb-6 leading-tight px-2">
                  <span className="text-white italic">{slides[currentSlide].prefix} </span>
                  <span className="heading-gradient">{slides[currentSlide].highlight}</span>
                  <span className="text-white italic"> {slides[currentSlide].suffix}</span>
                </h1>
                <p className="text-sm sm:text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed px-4">
                  {slides[currentSlide].description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-6 sm:mb-16 px-4"
          >
            <Button variant="heroSolid" size="xl" className="text-sm sm:text-base py-3 sm:py-4">
              Start Filing Now
            </Button>
            <Button variant="hero" size="xl" className="text-sm sm:text-base py-3 sm:py-4">
              Learn More
            </Button>
          </motion.div>

          {/* Carousel Controls */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-center gap-3 sm:gap-6 mb-4 sm:mb-8"
          >
            <button
              onClick={prevSlide}
              className="p-2 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-white/40"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </button>
            <div className="flex gap-2 sm:gap-3">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 sm:h-3 rounded-full transition-all duration-500 ${
                    currentSlide === index
                      ? "w-8 sm:w-12 bg-gold"
                      : "w-2 sm:w-3 bg-white/40 hover:bg-white/60"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            <button
              onClick={nextSlide}
              className="p-2 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-white/40"
              aria-label="Next slide"
            >
              <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </button>
          </motion.div>
        </div>

        {/* Feature Cards - Hidden on mobile to fit screen */}
        <div className="hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-8 sm:mt-12 px-2">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="group"
            >
              <div className="glass-card rounded-2xl p-5 sm:p-6 h-full hover:shadow-glow transition-all duration-500 hover:-translate-y-2 bg-white/5 backdrop-blur-xl border border-white/10">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                </div>
                <h3 className="text-base sm:text-lg font-serif font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-10 w-48 sm:w-64 h-48 sm:h-64 bg-cyan/10 rounded-full blur-3xl animate-pulse pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-64 sm:w-96 h-64 sm:h-96 bg-violet/10 rounded-full blur-3xl animate-pulse pointer-events-none" />
    </section>
  );
};