import React from 'react'
import { motion } from 'framer-motion';

function LoadingAnimation() {
  // return (
  //   <div className="flex justify-center items-center h-64">
  //     <motion.div
  //       className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
  //       animate={{ rotate: 360 }}
  //       transition={{ duration: 1, repeat: Infinity }}
  //     />
  //   </div>
  // )

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


  // const pulseTransition = {
  //   duration: 0.5,
  //   repeat: Infinity,
  //   ease: "easeInOut",
  // };

  // return (
  //   <div className="flex justify-center items-center h-56 bg-gray-100 space-x-4">
  //     <motion.div
  //       className="w-3 h-3 bg-green-500 rounded-full"
  //       animate={{ scale: [1, 1.5, 1] }}
  //       transition={pulseTransition}
  //     />
  //     <motion.div
  //       className="w-3 h-3 bg-yellow-500 rounded-full"
  //       animate={{ scale: [1, 1.5, 1] }}
  //       transition={pulseTransition}
  //     />
  //     <motion.div
  //       className="w-3 h-3 bg-red-500 rounded-full"
  //       animate={{ scale: [1, 1.5, 1] }}
  //       transition={pulseTransition}
  //     />
  //   </div>
  // );

}

export default LoadingAnimation
