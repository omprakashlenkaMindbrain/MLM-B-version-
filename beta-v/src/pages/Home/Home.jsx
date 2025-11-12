import { motion } from "framer-motion";
import Footer from "../../components/Footer";
import FeaturesSection from "./FeaturesSection";
import HeroSection from "./HeroSection";
import HowItWorks from "./HowItWorks";
import TestimonialsSection from "./TestimonialsSection";

export default function Home() {
  // Define a light background color for the final state
  const bgLight = "#f8fafc"; 
  // Define the Deep Blue primary color for the initial state
  const primaryColor = "#004aad";

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated Background: Deep Blue to Light Gray/White transition */}
      <motion.div
        className="absolute inset-0 -z-10"
        initial={{ backgroundColor: primaryColor, opacity: 0 }} // Start with Deep Blue
        whileInView={{ backgroundColor: bgLight, opacity: 1 }} // Transition to light background
        transition={{ duration: 1.5, delay: 0.2 }}
      />

      <HeroSection />
      <HowItWorks />
      <FeaturesSection />
      <TestimonialsSection />

      <Footer />
    </div>
  );
}