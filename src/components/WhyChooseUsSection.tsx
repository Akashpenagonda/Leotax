import { motion } from "framer-motion";
import { Compass, Zap, Users, Shield } from "lucide-react";

const reasons = [
  {
    icon: Compass,
    title: "Expert Guidance",
    description: "From answering your questions to helping you claim all eligible deductions, we make sure you maximize your tax benefits.",
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
    icon: Shield,
    title: "Secure & Confidential",
    description: "Your financial data is protected with bank-level security and strict confidentiality measures at all times.",
  },
];

export const WhyChooseUsSection = () => {
  return (
    <section className="section-padding bg-muted/50 dark:bg-muted/20">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-8">
              <h2 className="section-heading heading-underline-left pb-6">
                Why Choose Us
              </h2>
            </div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold mb-6">
              <span className="text-foreground italic">We deliver </span>
              <span className="heading-gradient">expertise</span>
              <span className="text-foreground italic"> you can trust</span>
            </h3>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              Choosing Leo for your tax filing needs means opting for simplicity, accuracy and peace of mind. With expert assistance available every step of the way, you'll never feel lost or confused during the process.
            </p>
          </motion.div>

          {/* Cards Side */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {reasons.map((reason, index) => (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-card rounded-2xl p-5 sm:p-6 h-full border border-border hover:border-gold/50 hover:shadow-elegant transition-all duration-500 hover:-translate-y-2">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-primary flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                    <reason.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>
                  <h4 className="text-base sm:text-lg font-serif font-semibold text-foreground mb-2">
                    {reason.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};