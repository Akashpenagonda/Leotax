import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Phone, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import WhatsAppButton from "./WhatsAppButton";

interface ServicePageLayoutProps {
  title: string;
  description: string;
  highlights?: string[];
  children?: React.ReactNode;
}

const services = [
  { name: "1040 & 1040 NR Tax Return Filing", slug: "1040-tax-return-filing" },
  { name: "Unlimited Tax Consultations", slug: "unlimited-tax-consultations" },
  { name: "Form 4868 Extension Filing", slug: "extension-filing" },
  { name: "ITIN Guidance and Support", slug: "itin-guidance" },
  { name: "FICA Taxes Withdrawals Guidance", slug: "fica-taxes-withdrawals" },
  { name: "Professional Tax Planning", slug: "tax-planning" },
  { name: "Tax Expert Support for Notices, Audits & Enquiries", slug: "tax-expert-support" },
  { name: "Filed Tax Returns Assessment & Examination", slug: "filed-tax-returns-assessment" },
  { name: "Accurate Tax Estimates", slug: "accurate-tax-estimates" },
  { name: "FBAR & FATCA Filing", slug: "fbar-fatca-filing" },
  { name: "W4 Assistance", slug: "w4-assistance" },
];

export const ServicePageLayout = ({ title, description, highlights, children }: ServicePageLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-gold/5" />
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--gold)/0.1),transparent_50%)]" />
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <div className="mb-8">
                <span className="text-2xl sm:text-3xl lg:text-4xl font-serif italic">
                  <span className="text-foreground">Our</span>{" "}
                  <span className="heading-gradient">Services</span>
                </span>
                <div className="mt-3 flex justify-center">
                  <div className="h-1 w-20 bg-gradient-primary rounded-full" />
                </div>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif italic font-bold text-foreground leading-tight mb-6">
                {title}
              </h1>
            </motion.div>

            {/* Main Content Card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-3xl p-8 lg:p-12 shadow-elegant"
            >
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                {description}
              </p>

              {highlights && highlights.length > 0 && (
                <div className="space-y-4 mb-8">
                  {highlights.map((highlight, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle2 className="h-5 w-5 text-gold mt-1 flex-shrink-0" />
                      <span className="text-muted-foreground">{highlight}</span>
                    </motion.div>
                  ))}
                </div>
              )}

              {children}

              {/* CTA Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mt-10 pt-8 border-t border-border/50"
              >
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/#contact"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-gold to-gold-light text-slate-900 font-semibold rounded-full hover:shadow-glow transition-all duration-300"
                  >
                    Get Started
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                  <a
                    href="tel:+12393192127"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-muted text-foreground font-semibold rounded-full hover:bg-muted/80 transition-all duration-300"
                  >
                    <Phone className="h-5 w-5" />
                    Call Us Now
                  </a>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Other Services Section */}
      <section className="py-20 bg-muted/30">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl lg:text-3xl font-serif font-bold text-foreground mb-4">
              Explore Our Other Services
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover our complete range of professional tax services
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service, index) => (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  to={`/services/${service.slug}`}
                  className="group block p-5 bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl hover:border-gold/50 hover:shadow-elegant transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-gold group-hover:scale-125 transition-transform" />
                    <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                      {service.name}
                    </span>
                    <ArrowRight className="h-4 w-4 text-muted-foreground ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};
