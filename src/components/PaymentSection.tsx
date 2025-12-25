import { motion } from "framer-motion";
import { CreditCard, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const paymentMethods = [
  { name: "Zelle", color: "text-purple-600", email: "Payments@leotaxfiling.com" },
  { name: "PayPal", color: "text-blue-600" },
  { name: "Visa", color: "text-blue-800" },
  { name: "Mastercard", color: "text-orange-500" },
  { name: "American Express", color: "text-blue-500" },
];

const servicePricing = [
  { name: "Standard Filing:", price: "$85" },
  { name: "Itemized Filing:", price: "$150" },
  { name: "Business Filing:", price: "$150 - $400" },
  { name: "FICA Taxes:", price: "$100" },
  { name: "Business Incorporation:", price: "$600" },
];

export const PaymentSection = () => {
  return (
    <section id="refund" className="section-padding bg-background">
      <div className="container-custom">
        {/* Payment Methods Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-card rounded-2xl p-6 sm:p-8 lg:p-10 border border-border mb-6"
        >
          {/* Header Row */}
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-foreground">
              Payment Methods
            </h2>
            
            <div className="flex flex-col items-start lg:items-end gap-2">
              <a 
                href="https://pay.example.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block"
              >
                <Button 
                  size="lg" 
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 sm:px-12 py-3 rounded-lg text-base sm:text-lg"
                >
                  PAY NOW
                </Button>
              </a>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="font-semibold text-blue-800">VISA</span>
                <span className="text-orange-500">●●</span>
                <span>& more</span>
                <span className="flex items-center gap-1">
                  <Shield className="h-3 w-3" />
                  Secured By <span className="text-green-600 font-medium">PayGlocal</span>
                </span>
              </div>
            </div>
          </div>

          {/* Payment Methods Row */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 lg:gap-12 mb-8">
            {paymentMethods.map((method, index) => (
              <motion.div
                key={method.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex flex-col items-center gap-1"
              >
                <div className="bg-card px-4 sm:px-6 py-3 sm:py-4 rounded-xl border border-border hover:border-gold/50 transition-colors min-w-[80px] sm:min-w-[100px] text-center">
                  <span className={`font-bold text-sm sm:text-lg ${method.color}`}>{method.name}</span>
                </div>
                {method.email && (
                  <span className="text-xs text-muted-foreground mt-1">{method.email}</span>
                )}
              </motion.div>
            ))}
          </div>

          {/* Info Text */}
          <div className="text-center space-y-3">
            <p className="text-sm sm:text-base text-muted-foreground">
              All types of credit and debit cards are accepted.
            </p>
            <p className="text-sm sm:text-base text-foreground font-medium">
              <strong>Refund and cancellation policy:</strong> We promptly process payment cancellations and approve refund requests.
            </p>
          </div>
        </motion.div>

        {/* Service Pricing Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-card rounded-2xl p-6 sm:p-8 lg:p-10 border border-border"
        >
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-foreground mb-6">
            Service Pricing
          </h2>
          
          {/* Horizontal Pricing Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
            {servicePricing.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="text-center lg:text-left"
              >
                <p className="text-sm sm:text-base text-muted-foreground mb-1">{item.name}</p>
                <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground">{item.price}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};