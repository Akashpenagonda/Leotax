import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Small Business Owner",
    content: "Leo Tax Filing made my business taxes so simple. Their team was incredibly helpful and saved me thousands on deductions I didn't know I qualified for.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Freelance Designer",
    content: "As a freelancer, taxes were always stressful. Leo changed that completely. Fast, accurate, and affordable. Highly recommend!",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Software Engineer",
    content: "The best tax filing experience I've ever had. Their expert guidance helped me understand every step of the process.",
    rating: 5,
  },
];

export const TestimonialsSection = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="section-heading heading-underline pb-8">
            What our Clients Say
          </h2>
          <span className="text-sm sm:text-base font-semibold text-gold uppercase tracking-widest mt-4 block">
            Testimonials
          </span>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group"
            >
              <div className="bg-card rounded-2xl p-6 sm:p-8 h-full border border-border hover:border-gold/50 hover:shadow-elegant transition-all duration-500 relative overflow-hidden">
                {/* Quote Icon */}
                <Quote className="absolute top-4 sm:top-6 right-4 sm:right-6 h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground/20 group-hover:text-gold/30 transition-colors" />
                
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 sm:h-5 sm:w-5 fill-gold text-gold" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6 relative z-10">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold text-sm sm:text-base">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm sm:text-base">{testimonial.name}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};