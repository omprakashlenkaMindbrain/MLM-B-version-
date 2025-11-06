import { motion } from "framer-motion";

const features = [
  {
    title: "Earn with Your Network",
    text: "Build your team and earn generous commissions on every sale.",
    icon: (
      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-green-500 text-white text-2xl font-bold shadow-lg">
        ✓
      </div>
    ),
    bg: "from-green-500 to-green-700",
  },
  {
    title: "Flexible Plans & Bonuses",
    text: "Choose the perfect plan for your growth with clear incentives.",
    icon: (
      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-yellow-400 text-white text-2xl font-bold shadow-lg">
        ★
      </div>
    ),
    bg: "from-yellow-300 to-yellow-500",
  },
  {
    title: "Secure & Transparent",
    text: "Track your sales and earnings with ease and full transparency.",
    icon: (
      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-500 text-white text-2xl font-bold shadow-lg">
        ⬈
      </div>
    ),
    bg: "from-blue-400 to-blue-700",
  },
];

export default function FeaturesSection() {
  const variants = {
    left: { opacity: 0, x: -100 },
    top: { opacity: 0, y: -100 },
    right: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, y: 0 },
  };
  const directions = ["left", "top", "right"];

  return (
    <section className="max-w-7xl mx-auto px-6 py-20 relative z-10">
      <h2 className="text-3xl sm:text-4xl font-extrabold text-green-900 mb-12 text-center drop-shadow-md">
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
