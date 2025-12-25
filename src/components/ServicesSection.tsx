import { motion } from "framer-motion";
import { 
  MessageSquare, 
  FileText, 
  CreditCard, 
  Calculator, 
  Target, 
  Globe 
} from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Unlimited Tax Consultations",
    description: "Here, we provide you integrated consultation on different kind of tax norms, we would like to remind...",
    link: "/services/unlimited-tax-consultations",
  },
  {
    number: "02",
    icon: FileText,
    title: "Form 4868 Extension Filing",
    description: "If the tax payer does not want to file tax returns on or before the due date of tax filing which...",
    link: "/services/extension-filing",
  },
  {
    number: "03",
    icon: CreditCard,
    title: "ITIN Guidance and Support",
    description: "ITIN is just used for personal tax related purposes. In order to apply ITIN for dependents...",
    link: "/services/itin-guidance",
  },
  {
    number: "04",
    icon: Calculator,
    title: "Professional Tax Planning",
    description: "Tax planning can avoid any underpayment or excess payment from the pay checks towards...",
    link: "/services/tax-planning",
  },
  {
    number: "05",
    icon: Target,
    title: "Accurate Tax Estimates",
    description: "We assure 100% accuracy in the tax preparation as all the tax returns are prepared only by the qualified...",
    link: "/services/accurate-tax-estimates",
  },
  {
    number: "06",
    icon: Globe,
    title: "FBAR & FATCA Filing",
    description: "Lack of tax knowledge majority of the taxpayers who are from foreign countries are not disclosing...",
    link: "/services/fbar-fatca-filing",
  },
];

export const ServicesSection = () => {
  return (
    <section id="services" className="section-padding bg-muted/50 dark:bg-muted/20">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="section-heading heading-underline pb-8 mb-6">
            What We Offer
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl font-serif font-medium text-foreground max-w-4xl mx-auto mt-8">
            We believe that selecting the <span className="heading-gradient">right financial</span> services firm is paramount!
          </p>
          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed mt-4">
            Highly qualified tax consultants with many years of experience in the field offer a full range of services to help you build a sound financial future.
          </p>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-8 sm:mb-10"
        >
          <h3 className="section-heading heading-underline-left pb-6">
            Our Services
          </h3>
        </motion.div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              <Link to={service.link} className="block h-full">
                <div className="bg-card rounded-2xl p-6 sm:p-8 h-full border border-border hover:border-gold/50 hover:shadow-elegant transition-all duration-500 hover:-translate-y-2 cursor-pointer">
                  {/* Number Badge */}
                  <div className="absolute top-4 sm:top-6 right-4 sm:right-6 text-4xl sm:text-5xl font-serif font-bold text-muted-foreground/20 group-hover:text-gold/30 transition-colors">
                    {service.number}.
                  </div>
                  
                  {/* Icon */}
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-primary flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                  </div>

                  {/* Content */}
                  <h4 className="text-lg sm:text-xl font-serif font-semibold text-foreground mb-2 sm:mb-3 pr-10 sm:pr-12">
                    {service.title}
                  </h4>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};