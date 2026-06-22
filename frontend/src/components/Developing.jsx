import { motion } from "framer-motion";
import { Code2, Rocket, Sparkles } from "lucide-react";

export default function Developing() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6">
      
      {/* Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-md text-center bg-white/60 backdrop-blur-xl border border-white/70 rounded-[2.5rem] p-10 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.15)]"
      >
        
        {/* Floating icons */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex justify-center mb-6"
        >
          <div className="p-4 rounded-2xl bg-blue-100">
            <Code2 className="text-blue-500" size={30} />
          </div>
        </motion.div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Coming Soon 🚧
        </h1>

        {/* Subtitle */}
        <p className="text-gray-500 mb-6">
          This feature is currently under development.  
          We’re building something amazing for you.
        </p>

        {/* Animated dots */}
        <div className="flex justify-center gap-2 mb-6">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2.5 h-2.5 rounded-full bg-blue-500"
              animate={{ scale: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>

        {/* Bottom icon row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center gap-4 text-gray-400"
        >
          <Rocket size={18} />
          <Sparkles size={18} />
        </motion.div>

      </motion.div>
    </div>
  );
}