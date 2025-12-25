import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { CheckCircle, Zap, Users, DollarSign, Shield, Clock, Star, ArrowRight } from "lucide-react";
import heroImg from "@/assets/hero-bg.jpg";
import teamImg from "@/assets/about-team.jpg";
import planningImg from "@/assets/planning.jpg";

const freeServices = [
  "Accurate Tax Estimates",
  "Filed Tax Returns Assessment & Examination",
  "FBAR & FATCA Guidance",
  "FICA Taxes",
  "W4 Guidance",
  "Unlimited Consultations with our EA- (Enrolled Agents), CA- (Chartered Accountants) & CPA- (Certified Public Accountants)",
];

const features = [
  {
    icon: Shield,
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

const testimonials = [
  {
    name: "Michael Johnson",
    role: "Small Business Owner",
    content: "Leo Tax Filing saved me hours of work and helped me get a bigger refund than expected. Highly recommend!",
    rating: 5,
  },
  {
    name: "Sarah Williams",
    role: "Freelancer",
    content: "The team at Leo is incredibly knowledgeable and patient. They explained everything clearly and made tax season stress-free.",
    rating: 5,
  },
  {
    name: "David Chen",
    role: "IT Professional",
    content: "Fast, efficient, and professional. I've been using Leo for 3 years and couldn't be happier with their service.",
    rating: 5,
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-gold/5" />
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_hsl(var(--gold))_1px,_transparent_1px)] bg-[size:24px_24px]" />
        </div>
        
        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif italic mb-4">
                <span className="text-foreground">About</span>{" "}
                <span className="heading-gradient">Leo Tax Filing</span>
              </h1>
              <div className="flex">
                <div className="h-1 w-24 bg-gradient-to-r from-primary to-gold rounded-full" />
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-foreground leading-tight mb-6 mt-6">
                Solutions for{" "}
                <span className="text-gold">business prosperity</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Leo Tax Filing is a full-service tax consulting firm. We offer services to a wide variety of clients ranging from individuals to small to medium-sized businesses, tax return preparation, tax planning, tax compliance, accounting, bookkeeping, business advisory, business incorporation, and payroll.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our tax professionals possess more than a decade of experience and are being constantly trained on any updates from IRS and State Income Tax Departments. We understand the challenges of running a small business, whether it's sorting through six-thousand pages of tax code, writing a comprehensive financial statement.
              </p>
            </motion.div>

            {/* Right Images */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative">
                <img
                  src={teamImg}
                  alt="Leo Tax Filing Team"
                  className="w-full h-80 object-cover rounded-2xl shadow-elegant"
                />
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="absolute -bottom-8 -left-8 w-48 h-48 rounded-2xl overflow-hidden shadow-elegant border-4 border-background"
                >
                  <img
                    src={planningImg}
                    alt="Financial Planning"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                {/* Decorative Element */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-gold to-gold-light rounded-2xl -z-10" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Free Services Section */}
      <section className="py-20 bg-muted/30">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="section-heading">
              Leo Tax Filing provides best Tax Services{" "}
              <span className="text-gold">for Free of Cost</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {freeServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-4 p-6 bg-background rounded-xl shadow-sm border border-border/50 hover:shadow-md hover:border-gold/30 transition-all duration-300"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-gold" />
                </div>
                <p className="text-foreground font-medium">{service}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative p-8 bg-background rounded-2xl border border-border/50 hover:border-gold/50 transition-all duration-300 hover:shadow-elegant"
              >
                {/* Icon */}
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-8 w-8 text-gold" />
                </div>
                
                <h3 className="text-xl font-serif font-semibold text-foreground mb-4">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover Gradient */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-muted/30">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-4"
          >
            <h2 className="section-heading">What our Clients Say</h2>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-muted-foreground mb-12"
          >
            Testimonials
          </motion.p>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="relative p-8 bg-background rounded-2xl shadow-sm border border-border/50 hover:shadow-elegant transition-all duration-300"
              >
                {/* Quote Icon */}
                <div className="absolute -top-4 left-8 w-8 h-8 bg-gold rounded-full flex items-center justify-center">
                  <span className="text-primary-foreground font-serif text-xl">"</span>
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-gold text-gold" />
                  ))}
                </div>

                <p className="text-muted-foreground italic mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold to-gold-light flex items-center justify-center">
                    <span className="text-primary font-bold text-lg">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
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

export default About;
