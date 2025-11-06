"use client"

import { AnimatePresence, motion, usePresenceData, wrap } from "motion/react"
import { forwardRef, useState } from "react"

const testimonials = [
  {
    name: "Jane Doe",
    feedback:
      "I doubled my income within months by joining BM2 Mall. The system is easy to use and truly rewarding.",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    position: "Top Affiliate",
  },
  {
    name: "John Smith",
    feedback:
      "The transparent plans and community support made me confident in building my team here.",
    avatar: "https://randomuser.me/api/portraits/men/52.jpg",
    position: "Senior Affiliate",
  },
  {
    name: "Alice Johnson",
    feedback:
      "I love the clear incentives and support. It helped me grow my network quickly.",
    avatar: "https://randomuser.me/api/portraits/women/22.jpg",
    position: "Affiliate",
  },
]

export default function TestimonialsSection() {
  const [selectedItem, setSelectedItem] = useState(0)
  const [direction, setDirection] = useState(1) // 1 = next, -1 = prev

  const setSlide = (newDirection) => {
    const nextItem = wrap(0, testimonials.length, selectedItem + newDirection)
    setSelectedItem(nextItem)
    setDirection(newDirection)
  }

  return (
    <section className="max-w-5xl mx-auto px-6 py-16 relative z-10">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-green-900 mb-12 text-center">
        What Our Members Say
      </h2>

      <div className="flex items-center justify-center gap-6">
        <motion.button
          onClick={() => setSlide(-1)}
          className="p-3 rounded-full bg-green-200 hover:bg-green-300"
        >
          ◀
        </motion.button>

        <div className="w-full max-w-xl relative">
          <AnimatePresence custom={direction} initial={false} mode="popLayout">
            <Slide
              key={selectedItem}
              direction={direction}
              testimonial={testimonials[selectedItem]}
            />
          </AnimatePresence>
        </div>

        <motion.button
          onClick={() => setSlide(1)}
          className="p-3 rounded-full bg-green-200 hover:bg-green-300"
        >
          ▶
        </motion.button>
      </div>
    </section>
  )
}

const Slide = forwardRef(function Slide({ testimonial }, ref) {
  const presenceDirection = usePresenceData()
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: presenceDirection * 50 }}
      animate={{
        opacity: 1,
        x: 0,
        transition: { delay: 0.1, type: "spring", bounce: 0.3 },
      }}
      exit={{ opacity: 0, x: presenceDirection * -50 }}
      className="bg-gradient-to-br from-white to-green-50 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-4 shadow-md"
    >
      <div className="relative">
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-4 border-white shadow-md"
        />
        <span className="absolute inset-0 rounded-full border-2 border-green-600 opacity-60 animate-pulse"></span>
      </div>
      <div className="text-center sm:text-left">
        <p className="text-gray-700 italic mb-2 leading-relaxed">“{testimonial.feedback}”</p>
        <p className="font-semibold text-green-900">{testimonial.name}</p>
        <p className="text-green-700 text-sm">{testimonial.position}</p>
      </div>
    </motion.div>
  )
})
