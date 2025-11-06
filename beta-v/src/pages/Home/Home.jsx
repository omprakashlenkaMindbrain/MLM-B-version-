import { motion } from "framer-motion";
import Footer from "../../components/Footer";
import FeaturesSection from "./FeaturesSection";
import HeroSection from "./HeroSection";
import HowItWorks from "./HowItWorks";
import TestimonialsSection from "./TestimonialsSection";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 -z-10"
        initial={{ backgroundColor: "rgb(34,197,94)", opacity: 0 }}
        whileInView={{ backgroundColor: "rgb(255,255,255)", opacity: 1 }}
      />

      <HeroSection />
      <HowItWorks />
      <FeaturesSection />
      <TestimonialsSection />

      <Footer />
    </div>
  );
}
