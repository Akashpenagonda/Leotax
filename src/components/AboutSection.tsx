import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import aboutTeam from "@/assets/about-team.jpg";

export const AboutSection = () => {
  const highlights = [
    "Accurate Tax Estimates",
    "Filed Tax Returns Assessment & Examination",
  ];

  return (
    <section id="about" className="section-padding bg-background">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-elegant">
              <img
                src={aboutTeam}
                alt="Leo Tax Filing Team"
                className="w-full h-[350px] sm:h-[450px] lg:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent" />
            </div>
            
            {/* Floating Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute -bottom-6 -right-4 sm:-bottom-8 sm:-right-8 bg-card p-4 sm:p-6 rounded-2xl shadow-elegant border border-border"
            >
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-gradient-primary flex items-center justify-center">
                  <span className="text-xl sm:text-2xl font-bold text-white">12+</span>
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-bold text-foreground">Years</p>
                  <p className="text-sm sm:text-base text-muted-foreground">Experience</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2"
          >
            {/* Section Title */}
            <div className="mb-8">
              <h2 className="section-heading heading-underline-left pb-6">
                About Us
              </h2>
            </div>
            
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold mb-6">
              <span className="text-foreground italic">We are trusted and </span>
              <span className="heading-gradient">best tax advisor</span>
              <span className="text-foreground italic"> for you.</span>
            </h3>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-8">
              Leo Tax Filing is a full-service tax consulting firm. We offer services to a wide variety of clients ranging from individuals to small to medium-sized businesses, tax return preparation, tax planning, tax compliance, accounting, bookkeeping...
            </p>

            {/* Highlights */}
            <div className="space-y-4 mb-8">
              {highlights.map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
                    <Check className="h-4 w-4 text-gold" />
                  </div>
                  <span className="text-foreground font-medium text-sm sm:text-base">{item}</span>
                </motion.div>
              ))}
            </div>

            <Button variant="gold" size="lg" className="group">
              Know More
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};