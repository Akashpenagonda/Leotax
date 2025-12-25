import { ServicePageLayout } from "@/components/ServicePageLayout";
import { motion } from "framer-motion";

const FbarFatcaFiling = () => {
  return (
    <ServicePageLayout
      title="FBAR & FATCA Filing"
      description="FBAR: Foreign Bank Account Report. FATCA: Foreign Account Tax Compliance Act. Lack of tax knowledge majority of the taxpayers who are from foreign countries are not disclosing their foreign earned and unearned income on US tax returns, non-reporting of FBAR & FATCA with FinCEN (Financial Crimes Enforcement Network) will leads to huge penalties. Any taxpayer who is filing Form 1040 & 1040SR and having a signature authority of a foreign financial account need to disclose all types of foreign income on US tax returns, if you have any one or multiple below mentioned foreign financial accounts exceeding $10,000 need to file FBAR and if it exceeds $75,000 need to File FATCA with FinCEN."
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-6 p-6 bg-muted/50 rounded-2xl border border-border/50"
      >
        <h3 className="text-lg font-semibold text-foreground mb-3">
          Foreign Financial Accounts Include:
        </h3>
        <ul className="space-y-2 text-muted-foreground">
          <li>• Mutual Funds</li>
          <li>• Insurance policies of whole life insurance policy with a cash value</li>
          <li>• Bank Accounts: Savings, checking and time deposits</li>
          <li>• Security Accounts: Brokerage accounts, securities</li>
        </ul>
      </motion.div>
    </ServicePageLayout>
  );
};

export default FbarFatcaFiling;