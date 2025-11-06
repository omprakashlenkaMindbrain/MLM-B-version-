import { motion } from "framer-motion";

const steps = [
  {
    title: "Sign Up",
    text: "Create your free account to get started as an affiliate with BM2 Mall.",
    icon: "📝",
  },
  {
    title: "Build Network",
    text: "Invite others, build your team, and grow your business organically.",
    icon: "👥",
  },
  {
    title: "Earn Commissions",
    text: "Easily track your earnings and rewards through our secure dashboard.",
    icon: "💰",
  },
];

export default function HowItWorks() {
  const directions = ["left", "top", "right"];

  const cardVariants = {
    left: { opacity: 0, x: -100 },
    right: { opacity: 0, x: 100 },
    top: { opacity: 0, y: -100 },
    bottom: { opacity: 0, y: 100 },
    visible: { opacity: 1, x: 0, y: 0 },
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-14 relative z-10">
      <h2 className="text-3xl sm:text-4xl font-extrabold text-green-900 mb-12 text-center">
        How It Works
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((step, idx) => (
          <motion.div
            key={idx}
            className="bg-white rounded-3xl p-8 flex flex-col items-center text-center relative shadow-lg hover:shadow-2xl transition-transform duration-500 hover:scale-105 border border-gray-200"
            initial={cardVariants[directions[idx % directions.length]]}
            whileInView={cardVariants.visible}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ type: "spring", bounce: 0.3, duration: 0.8, delay: idx * 0.2 }}
          >
            {/* Floating Icon */}
            <motion.div
              className="text-5xl mb-4"
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              {step.icon}
            </motion.div>

            {/* Animated Number Circle */}
            <div className="mb-4 w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-r from-green-400 via-green-300 to-green-400 text-white font-bold text-xl shadow-lg animate-pulse">
              {idx + 1}
            </div>

            <h3 className="text-xl font-semibold text-green-800 mb-2">{step.title}</h3>
            <p className="text-gray-600 text-base">{step.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
