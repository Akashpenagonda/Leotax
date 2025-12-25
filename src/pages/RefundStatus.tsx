import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { ExternalLink, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const RefundStatus = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="mb-8">
              <span className="text-2xl sm:text-3xl lg:text-4xl font-serif italic">
                <span className="text-foreground">Refund</span>{" "}
                <span className="heading-gradient">Status</span>
              </span>
              <div className="mt-3 flex justify-center">
                <div className="h-1 w-20 bg-gradient-primary rounded-full" />
              </div>
            </div>
          </motion.div>

          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            {/* Federal Refund Status */}
            <motion.a
              href="https://sa.www4.irs.gov/wmr/"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 p-8 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6 mx-auto">
                  <ExternalLink className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold text-center mb-4">Federal Refund Status</h2>
                <p className="text-center text-blue-100 mb-6">
                  Check your federal tax refund status directly on the IRS website
                </p>
                <div className="flex items-center justify-center gap-2 text-sm font-medium">
                  <span>Visit IRS Website</span>
                  <ExternalLink className="w-4 h-4" />
                </div>
              </div>
            </motion.a>

            {/* State Refund Status */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Link
                to="/refund-status/state"
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-800 p-8 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 block h-full"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10">
                  <div className="flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6 mx-auto">
                    <FileText className="w-8 h-8" />
                  </div>
                  <h2 className="text-2xl font-bold text-center mb-4">State Refund Status</h2>
                  <p className="text-center text-emerald-100 mb-6">
                    Access state tax department websites for all 50 states
                  </p>
                  <div className="flex items-center justify-center gap-2 text-sm font-medium">
                    <span>View All States</span>
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default RefundStatus;
