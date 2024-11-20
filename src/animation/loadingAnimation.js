
import { motion } from 'framer-motion';

function LoadingAnimation() {

  const bounceTransition = {
    duration: 0.5,
    repeat: Infinity,  // This makes the animation repeat indefinitely
    repeatType: "mirror",  // It mirrors back and forth
    ease: "easeInOut",
  };

  return (
    <div className="flex justify-center items-center h-56 bg-gray-50">
      <motion.div
        className="w-3 h-3 m-2 bg-pink-500 rounded-full"
        transition={bounceTransition}
        animate={{
          y: ["0%", "-100%"], // bounce up and down
        }} 
      />
      <motion.div
        className="w-3 h-3 m-2 bg-purple-500 rounded-full"
        transition={bounceTransition}
        animate={{
          y: ["-100%", "0%"],
        }}
      />
      <motion.div
        className="w-3 h-3 m-2 bg-blue-500 rounded-full"
        transition={bounceTransition}
        animate={{
          y: ["0%", "-100%"],
        }}
      />
    </div>
  );

}

export default LoadingAnimation
