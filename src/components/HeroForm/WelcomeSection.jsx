// import React from "react";
// import FeedbackBg from "../../assets/Images/FeedbackBg.jpeg";
// import ThemeToggle from "../Themes/ThemesToggle";

// const WelcomeSection = () => {
//   return (
//     <section
//       className="relative bg-cover bg-center h-[12rem] bg-[var(--background)] text-[var(--text)]"
//       style={{ backgroundImage: `url(${FeedbackBg})` }}
//     >
//       <div className="absolute inset-0 bg-opacity-50 flex flex-col justify-center items-center text-[var(--text)] text-center p-4">
//         <h2 className="text-3xl md:text-3xl font-bold text-bulb-white">
//           We Value Your Feedback
//         </h2>
//         <p className="mt-2 text-[18px] text-bulb-white">
//           Help us to Improve your experience by sharing your opinions and <br />
//           <span className="mt-2 text-[18px] text-center"> suggestion</span>
//         </p>
//       </div>
//       {/* Add the ThemeToggle component */}
//       <div className="absolute top-4 right-4">
//         <ThemeToggle />
//       </div>
//     </section>
//   );
// };

// export default WelcomeSection;

import React from "react";
import FeedbackBg from "../../assets/Images/FeedbackBg.jpeg";
import ThemeToggle from "../Themes/ThemesToggle";
import { motion } from "framer-motion";

const WelcomeSection = () => {
  // Variants for the title's writing effect
  const titleVariants = {
    hidden: { opacity: 0, y: -20, pathLength: 0 },
    visible: {
      opacity: 1,
      y: 0,
      pathLength: 1,
      transition: {
        duration: 1,
        ease: "easeInOut",
        staggerChildren: 0.08,
      },
    },
  };

  // Variants for the description's fade-in effect
  const descriptionVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: 0.2,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      className="relative bg-cover bg-center h-[12rem] md:h-[12.3rem] text-[var(--text)]"
      style={{ backgroundImage: `url(${FeedbackBg})` }}
    >
      <div className="absolute inset-0 bg-opacity-50 flex flex-col justify-center items-center text-[var(--text)] text-center p-4">
        {/* Animated title */}
        <motion.h2
          className="text-4xl md:text-[40px] py-3 font-bold text-bulb-white"
          initial="hidden"
          animate="visible"
          variants={titleVariants}
        >
          We Value Your Feedback
        </motion.h2>
        {/* Animated description */}
        <motion.p
          className="mt-2 sm:text-sm md:text-[18px] text-bulb-white"
          initial="hidden"
          animate="visible"
          variants={descriptionVariants}
        >
          Help us to Improve your experience by sharing your opinions and <br />
          <motion.span
            variants={descriptionVariants}
            className="mt-2 pt-2 text-sm md:text-[18px] text-center"
          >
            suggestion
          </motion.span>
        </motion.p>
      </div>
      {/* ThemeToggle */}
      <div className="absolute right-6 md:right-12 bg-bulb-yellow text-bulb-white">
        <ThemeToggle />
      </div>
    </section>
  );
};

export default WelcomeSection;
