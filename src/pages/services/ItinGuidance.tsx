import { ServicePageLayout } from "@/components/ServicePageLayout";
import { motion } from "framer-motion";

const ItinGuidance = () => {
  return (
    <ServicePageLayout
      title="ITIN Guidance and Support"
      description="ITIN - Individual taxpayer identification number. ITIN is just used for personal tax related purposes. In order to apply ITIN for dependents (wife, kids, close relatives etc.), a dependent should have stayed in the USA for more than 183 days in the particular Tax Year."
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-6 p-6 bg-muted/50 rounded-2xl border border-border/50"
      >
        <h3 className="text-lg font-semibold text-foreground mb-3">
          Preferred Documents Required to Apply ITIN:
        </h3>
        <p className="text-muted-foreground leading-relaxed">
          Passport Tax returns, Form W7 (ITIN application) and the documents can be mailed to IRS Texas address to get the ITIN. If a tax payer is uncomfortable to mail the documents can also be submitted at the TAC-Taxpayer assistance centre which is your local IRS office.
        </p>
      </motion.div>
    </ServicePageLayout>
  );
};

export default ItinGuidance;