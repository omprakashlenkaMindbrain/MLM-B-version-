import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const navigate = useNavigate();
  const navigateToJoin = () => navigate("/kyc");

  return (
    <section className="px-6 py-14 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-10 relative z-10">
      <motion.div
        className="flex-1 flex justify-center"
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/2965/2965567.png"
          alt="MLM Network"
          className="w-56 h-56 object-contain"
        />
      </motion.div>
      <div className="flex-1 text-center lg:text-left">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-green-900 mb-4 leading-snug drop-shadow-md">
          Grow Your Income with BM2 Mall's MLM Platform
        </h1>
        <p className="text-gray-700 mb-6 text-base sm:text-lg max-w-lg mx-auto lg:mx-0">
          Join our thriving network and start earning instantly. Build your team,
          unlock bonuses, and watch your business grow.
        </p>
        <button
          className="px-6 py-3 rounded-lg bg-green-700 hover:bg-green-800 text-white font-bold text-base sm:text-lg transition shadow-md"
          onClick={navigateToJoin}
        >
          Join Now
        </button>
      </div>
    </section>
  );
}
