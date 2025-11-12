import { motion } from "framer-motion";

const features = [
  {
    title: "Earn with Your Network",
    text: "Build your team and earn generous commissions on every sale.",
    icon: (
      // Icon 1: Soft Teal Background
      <div 
        className="w-12 h-12 flex items-center justify-center rounded-full text-white text-2xl font-bold shadow-lg"
        style={{ backgroundColor: "#00bfa6" }} // Soft Teal Accent Color
      >
        ✓
      </div>
    ),
    // Card Background 1: Soft Teal Gradient
    bg: "from-[#00bfa6] to-[#008975]", // From Soft Teal to a darker shade
  },
  {
    title: "Flexible Plans & Bonuses",
    text: "Choose the perfect plan for your growth with clear incentives.",
    icon: (
      // Icon 2: Yellow Background
      <div 
        className="w-12 h-12 flex items-center justify-center rounded-full text-white text-2xl font-bold shadow-lg"
        style={{ backgroundColor: "#fdbb2d" }} // Yellow Secondary Color
      >
        ★
      </div>
    ),
    // Card Background 2: Yellow Gradient
    bg: "from-[#fdbb2d] to-[#e6a827]", // From Yellow to a darker shade
  },
  {
    title: "Secure & Transparent",
    text: "Track your sales and earnings with ease and full transparency.",
    icon: (
      // Icon 3: Deep Blue Background
      <div 
        className="w-12 h-12 flex items-center justify-center rounded-full text-white text-2xl font-bold shadow-lg"
        style={{ backgroundColor: "#004aad" }} // Deep Blue Primary Color
      >
        ⬈
      </div>
    ),
    // Card Background 3: Deep Blue Gradient
    bg: "from-[#004aad] to-[#003982]", // From Deep Blue to a darker shade
  },
];

export default function FeaturesSection() {

  const PRIMARY_NAVY="#1B436D"


  const variants = {
    left: { opacity: 0, x: -100 },
    top: { opacity: 0, y: -100 },
    right: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, y: 0 },
  };
  const directions = ["left", "top", "right"];

  return (
    <section className="max-w-7xl mx-auto px-6 py-20 relative z-10">
      <h2 
        className="text-3xl sm:text-4xl font-extrabold mb-12 text-center drop-shadow-md"
        // Apply Deep Blue Primary Color
        style={{ color: PRIMARY_NAVY }}
      >
        Platform Features
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feat, idx) => (
          <motion.div
            key={idx}
            className={`relative bg-gradient-to-br ${feat.bg} rounded-3xl p-8 flex flex-col items-center text-center shadow-2xl hover:scale-105 hover:shadow-3xl transition-transform duration-500`}
            initial={variants[directions[idx % directions.length]]}
            whileInView={variants.visible}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, delay: idx * 0.2 }}
          >
            <div className="mb-5">{feat.icon}</div>
            <h3 className="text-xl font-bold text-white mb-3">{feat.title}</h3>
            <p className="text-gray-100 text-sm sm:text-base">{feat.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}