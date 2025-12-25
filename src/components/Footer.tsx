import { motion } from "framer-motion";
import { MapPin, Mail, Phone, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import { Link } from "react-router-dom";
import leoLogo from "@/assets/leo-logo.jpg";
const services = [
  { label: "1040 & 1040 NR Tax Return Filing", href: "/services/1040-tax-return-filing" },
  { label: "Unlimited Tax Consultations", href: "/services/unlimited-tax-consultations" },
  { label: "Form 4868 Extension Filing", href: "/services/extension-filing" },
  { label: "ITIN Guidance and Support", href: "/services/itin-guidance" },
  { label: "FICA Taxes Withdrawals Guidance", href: "/services/fica-taxes-withdrawals" },
  { label: "Professional Tax Planning", href: "/services/tax-planning" },
  { label: "Tax Expert Support for Notices, Audits & Enquiries", href: "/services/tax-expert-support" },
  { label: "Filed Tax Returns Assessment & Examination", href: "/services/filed-tax-returns-assessment" },
  { label: "Accurate Tax Estimates", href: "/services/accurate-tax-estimates" },
  { label: "FBAR & FATCA Filing", href: "/services/fbar-fatca-filing" },
  { label: "W4 Assistance", href: "/services/w4-assistance" },
];

const socialLinks = [
  { icon: Facebook, href: "#" },
  { icon: Twitter, href: "#" },
  { icon: Linkedin, href: "#" },
  { icon: Instagram, href: "#" },
];

export const Footer = () => {
  return (
    <footer id="contact" className="bg-primary text-primary-foreground">
      {/* Social Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="border-b border-primary-foreground/10"
      >
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-primary-foreground/80">
              Get connected with us on social networks:
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-gold transition-colors"
                >
                  <social.icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Footer */}
      <div className="container-custom py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-6">
              <img
                src={leoLogo}
                alt="Leo Tax Filing"
                className="h-14 w-14 object-contain rounded-lg"
              />
              <div>
                <span className="text-2xl font-serif font-bold">LEO</span>
                <span className="text-gold ml-2 font-medium">Tax</span>
              </div>
            </div>
            <p className="text-primary-foreground/70 leading-relaxed">
              From answering your questions to helping you claim all eligible deductions, Leo makes sure you maximize your tax benefits.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="text-lg font-serif font-semibold mb-6 text-gold">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-primary-foreground/70 hover:text-gold transition-colors">
                  Terms And Conditions
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/70 hover:text-gold transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="text-lg font-serif font-semibold mb-6 text-gold">Services</h4>
            <ul className="space-y-2">
              {services.slice(0, 6).map((service) => (
                <li key={service.href}>
                  <Link
                    to={service.href}
                    className="text-sm text-primary-foreground/70 hover:text-gold transition-colors"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="text-lg font-serif font-semibold mb-6 text-gold">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-gold mt-0.5" />
                <span className="text-primary-foreground/70 text-sm">
                  200 Country Club Dr, Largo FL 33771
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-gold" />
                <a href="mailto:contact@leotaxfiling.com" className="text-primary-foreground/70 text-sm hover:text-gold transition-colors">
                  contact@leotaxfiling.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-gold" />
                <a href="tel:+12393192127" className="text-primary-foreground/70 text-sm hover:text-gold transition-colors">
                  +1 23931 92127
                </a>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-primary-foreground/10">
        <div className="container-custom py-6">
          <p className="text-center text-sm text-primary-foreground/60">
            © Copyright 2025 <span className="text-gold font-semibold">LEO TAX FILING</span> All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};
