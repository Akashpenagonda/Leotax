import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import planningImg from "@/assets/planning.jpg";

export const WhatWeDoSection = () => {
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
            What We Do
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
              The real experts in the field will provide you with the best strategy
            </h3>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-8">
              Don't overpay taxes. We carry out competent calculations of all deductions and credits, tax risks, and consequences of individual transactions.
            </p>

            <Button variant="gold" size="lg" className="group">
              Get Consultation
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>

          {/* Images Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="rounded-2xl overflow-hidden shadow-elegant"
              >
                <img
                  src={planningImg}
                  alt="Financial Planning"
                  className="w-full h-48 sm:h-64 object-cover hover:scale-105 transition-transform duration-500"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="rounded-2xl overflow-hidden shadow-elegant mt-6 sm:mt-8"
              >
                <div className="w-full h-48 sm:h-64 bg-gradient-primary flex items-center justify-center p-4 sm:p-6">
                  <div className="text-center">
                    <div className="text-4xl sm:text-5xl font-bold text-white mb-2">100%</div>
                    <p className="text-white/80 text-xs sm:text-sm">Client Satisfaction</p>
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* Decorative Element */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 sm:w-72 h-48 sm:h-72 bg-gold/10 rounded-full blur-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};