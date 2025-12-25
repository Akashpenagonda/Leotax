import { motion } from "framer-motion";
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { ExternalLink, ArrowLeft, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";

const states = [
  { name: "Alabama", url: "https://www.revenue.alabama.gov/" },
  { name: "Alaska", url: "https://dor.alaska.gov/" },
  { name: "Arizona", url: "https://azdor.gov/" },
  { name: "Arkansas", url: "https://www.dfa.arkansas.gov/income-tax" },
  { name: "California", url: "https://www.ftb.ca.gov/" },
  { name: "Colorado", url: "https://tax.colorado.gov/" },
  { name: "Connecticut", url: "https://portal.ct.gov/drs" },
  { name: "Delaware", url: "https://revenue.delaware.gov/" },
  { name: "District of Columbia", url: "https://otr.cfo.dc.gov/" },
  { name: "Florida", url: "https://floridarevenue.com/" },
  { name: "Georgia", url: "https://dor.georgia.gov/" },
  { name: "Hawaii", url: "https://tax.hawaii.gov/" },
  { name: "Idaho", url: "https://tax.idaho.gov/" },
  { name: "Illinois", url: "https://tax.illinois.gov/" },
  { name: "Indiana", url: "https://www.in.gov/dor/" },
  { name: "Iowa", url: "https://tax.iowa.gov/" },
  { name: "Kansas", url: "https://www.ksrevenue.gov/" },
  { name: "Kentucky", url: "https://revenue.ky.gov/" },
  { name: "Louisiana", url: "https://revenue.louisiana.gov/" },
  { name: "Maine", url: "https://www.maine.gov/revenue/" },
  { name: "Maryland", url: "https://www.marylandtaxes.gov/" },
  { name: "Massachusetts", url: "https://www.mass.gov/orgs/massachusetts-department-of-revenue" },
  { name: "Michigan", url: "https://www.michigan.gov/treasury" },
  { name: "Minnesota", url: "https://www.revenue.state.mn.us/" },
  { name: "Mississippi", url: "https://www.dor.ms.gov/" },
  { name: "Missouri", url: "https://dor.mo.gov/" },
  { name: "Montana", url: "https://mtrevenue.gov/" },
  { name: "Nebraska", url: "https://revenue.nebraska.gov/" },
  { name: "Nevada", url: "https://tax.nv.gov/" },
  { name: "New Hampshire", url: "https://www.revenue.nh.gov/" },
  { name: "New Jersey", url: "https://www.nj.gov/treasury/taxation/" },
  { name: "New Mexico", url: "https://www.tax.newmexico.gov/" },
  { name: "New York", url: "https://www.tax.ny.gov/" },
  { name: "North Carolina", url: "https://www.ncdor.gov/" },
  { name: "North Dakota", url: "https://www.tax.nd.gov/" },
  { name: "Ohio", url: "https://tax.ohio.gov/" },
  { name: "Oklahoma", url: "https://oklahoma.gov/tax.html" },
  { name: "Oregon", url: "https://www.oregon.gov/dor" },
  { name: "Pennsylvania", url: "https://www.revenue.pa.gov/" },
  { name: "Rhode Island", url: "https://tax.ri.gov/" },
  { name: "South Carolina", url: "https://dor.sc.gov/" },
  { name: "South Dakota", url: "https://dor.sd.gov/" },
  { name: "Tennessee", url: "https://www.tn.gov/revenue.html" },
  { name: "Texas", url: "https://comptroller.texas.gov/" },
  { name: "Utah", url: "https://tax.utah.gov/" },
  { name: "Vermont", url: "https://tax.vermont.gov/" },
  { name: "Virginia", url: "https://www.tax.virginia.gov/" },
  { name: "Washington", url: "https://dor.wa.gov/" },
  { name: "West Virginia", url: "https://tax.wv.gov/" },
  { name: "Wisconsin", url: "https://www.revenue.wi.gov/" },
  { name: "Wyoming", url: "https://revenue.wyo.gov/" },
];

const StateRefundStatus = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredStates = states.filter((state) =>
    state.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            <Link 
              to="/refund-status" 
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Refund Status
            </Link>
            
            <div className="mb-8">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif italic">
                <span className="text-foreground">State Tax Information</span>{" "}
                <span className="bg-gradient-to-r from-blue-600 to-violet-500 bg-clip-text text-transparent">
                  For All States
                </span>
              </h1>
              <div className="mt-3 flex justify-center">
                <div className="h-1 w-24 bg-gradient-to-r from-blue-600 to-violet-500 rounded-full" />
              </div>
            </div>

            {/* Search Bar */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search state..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 py-6 text-base rounded-full border-border/50 focus:border-primary"
              />
            </div>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            {filteredStates.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredStates.map((state, index) => (
                  <motion.a
                    key={state.name}
                    href={state.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.02 }}
                    className="group flex items-center justify-between p-4 bg-card border border-border rounded-xl hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300"
                  >
                    <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                      {state.name}
                    </span>
                    <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </motion.a>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">No states found matching "{searchQuery}"</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default StateRefundStatus;
