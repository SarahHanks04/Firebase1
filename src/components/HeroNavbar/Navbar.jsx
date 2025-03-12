// MY ORIGINAL NAVBAR

// import React, { useState, useEffect } from "react";
// import { NavLink, useLocation } from "react-router-dom";
// import { Menu, X } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";

// const Navbar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [activePage, setActivePage] = useState("Feedback Form");

//   const location = useLocation();

//   // Update header title
//   useEffect(() => {
//     const pathToTitle = {
//       "/form/complaint/complaint": "Complaint",
//       "/form/event/event": "Event Form",
//       "/feedback": "Feedback",
//       "/admin/event/event": "Home",
//     };

//     setActivePage(pathToTitle[location.pathname] || "Feedback Form");
//   }, [location.pathname]);

//   const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

//   // Framer Motion animations
//   const mobileMenuVariants = {
//     hidden: { opacity: 0, y: -50 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.3, ease: "easeInOut" },
//     },
//     exit: {
//       opacity: 0,
//       y: -50,
//       transition: { duration: 0.3, ease: "easeInOut" },
//     },
//   };

//   // Animation for the activePage text
//   const activePageVariants = {
//     hidden: { opacity: 0, pathLength: 0 },
//     visible: {
//       opacity: 1,
//       pathLength: 1,
//       transition: {
//         duration: 1,
//         ease: "easeInOut",
//         staggerChildren: 0.05,
//       },
//     },
//   };

//   return (
//     <nav className="fixed top-0 left-0 bg-bulb-white dark:bg-[var(--background)] text-[var(--text)] py-2 px-6 md:px-16 flex justify-between items-center w-full z-50 mt-0 shadow-lg rounded-md">
//       {/* Dynamic Header with writing effect */}
//       <motion.header
//         className="text-2xl md:text-3xl font-bold dark:text-dark-text"
//         initial="hidden"
//         animate="visible"
//         variants={activePageVariants}
//       >
//         {Array.from(activePage).map((char, index) => (
//           <motion.span
//             key={index}
//             variants={activePageVariants}
//             style={{ display: "inline-block" }}
//           >
//             {char === " " ? "\u00A0" : char}
//           </motion.span>
//         ))}
//       </motion.header>

//       {/* Desktop Links */}
//       <div className="hidden md:flex items-center space-x-8 ml-auto">
//         {[
//           { text: "Home", to: "/feedback" },
//           { text: "Complaint", to: "/form/complaint/complaint" },
//           { text: "Event", to: "/form/event/event" },
//         ].map(({ text, to }, index) => (
//           <NavLink
//             key={index}
//             to={to}
//             className={({ isActive }) =>
//               `text-[var(--text)] hover:text-[var(--accent)] transition-colors font-medium ${
//                 isActive ? "text-bulb-yellow font-semibold" : ""
//               }`
//             }
//           >
//             {text}
//           </NavLink>
//         ))}
//       </div>

//       {/* Mobile Controls (Menu Button) */}
//       <div className="flex items-center space-x-20 md:hidden">
//         <button
//           onClick={toggleMenu}
//           className="text-2xl focus:outline-none"
//           aria-label="Toggle Menu"
//         >
//           {isMenuOpen ? (
//             <X size={26} className="text-[var(--text)]" />
//           ) : (
//             <Menu size={26} className="text-[var(--text)]" />
//           )}
//         </button>
//       </div>

//       {/* Mobile Menu with Framer Motion */}
//       <AnimatePresence>
//         {isMenuOpen && (
//           <motion.div
//             className="absolute top-16 left-0 w-full bg-bulb-blue text-bulb-white shadow-md flex flex-col space-y-4 py-4 px-6 text-lg z-50"
//             variants={mobileMenuVariants}
//             initial="hidden"
//             animate="visible"
//             exit="exit"
//           >
//             {[
//               { text: "Home", to: "/feedback" },
//               { text: "Complaint", to: "/form/complaint/complaint" },
//               { text: "Event", to: "/form/event/event" },
//             ].map(({ text, to }, index) => (
//               <NavLink
//                 key={index}
//                 to={to}
//                 className={({ isActive }) =>
//                   `block py-2 text-[var(--text)] hover:text-[var(--accent)] transition-colors font-medium ${
//                     isActive
//                       ? "text-bulb-yellow font-semibold"
//                       : "text-bulb-white"
//                   }`
//                 }
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 {text}
//               </NavLink>
//             ))}
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </nav>
//   );
// };

// export default Navbar;

import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useFetchFormEvents } from "@/api/ResponseApi";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activePage, setActivePage] = useState("Feedback Form");
  const [isFormsDropdownOpen, setIsFormsDropdownOpen] = useState(false);

  const location = useLocation();
  const { data: forms } = useFetchFormEvents();

  // Update header title based on the current route
  useEffect(() => {
    const pathToTitle = {
      "/form/complaint/complaint": "Complaint",
      "/form/event/event": "Event Form",
      "/feedback": "Feedback",
      "/admin/event/event": "Home",
    };

    // Dynamically add form routes to the pathToTitle mapping
    forms?.forEach((form) => {
      pathToTitle[`/form/${form.formType.toUpperCase()}/${form.id}`] =
        form.formType;
    });

    setActivePage(pathToTitle[location.pathname] || "Feedback Form");
  }, [location.pathname, forms]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="fixed top-0 left-0 bg-bulb-white dark:bg-bulb-white text-bulb-blue py-2 px-6 md:px-16 flex justify-between items-center w-full z-50 mt-0 shadow-lg rounded-md">
      {/* Dynamic Header */}
      <motion.header
        className="text-2xl md:text-3xl font-bold dark:text-bulb-blue"
        initial="hidden"
        animate="visible"
      >
        {activePage}
      </motion.header>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center space-x-8 ml-auto">
        {/* Home Link */}
        <NavLink
          to="/feedback"
          className={({ isActive }) =>
            `text-[var(--text)] hover:text-[var(--accent)]  transition-colors font-medium ${
              isActive ? "text-bulb-yellow font-semibold" : "text-bulb-blue"
            }`
          }
        >
          Feedback
        </NavLink>

        {/* Complaint Link */}
        <NavLink
          to="/form/complaint/complaint"
          className={({ isActive }) =>
            `text-[var(--text)] hover:text-[var(--accent)] transition-colors font-medium ${
              isActive ? "text-bulb-yellow font-semibold" : "text-bulb-blue"
            }`
          }
        >
          Complaint
        </NavLink>

        {/* Event Link */}
        <NavLink
          to="/form/event/event"
          className={({ isActive }) =>
            `text-[var(--text)] hover:text-[var(--accent)] transition-colors font-medium ${
              isActive ? "text-bulb-yellow font-semibold" : "text-bulb-blue"
            }`
          }
        >
          Event
        </NavLink>

        {/* Forms Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsFormsDropdownOpen(!isFormsDropdownOpen)}
            className="flex items-center space-x-2 text-[var(--text)] dark:text-bulb-blue hover:text-[var(--accent)] transition-colors font-medium"
          >
            {/* <span>Forms</span> */}
            <ChevronDown size={16} />
          </button>

          {isFormsDropdownOpen && (
            <div className="absolute top-10 right-0 bg-bulb-white shadow-lg rounded-lg p-2 w-48">
              {/* Other Forms */}
              {forms?.map((form) => (
                <NavLink
                  key={form.id}
                  to={`/form/${form.formType.toLowerCase()}/${form.id}`}
                  className="block p-2 hover:bg-gray-100 rounded-lg"
                  onClick={() => setIsFormsDropdownOpen(false)}
                >
                  {form.formType}
                </NavLink>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Controls (Menu Button) */}
      <div className="flex items-center space-x-20 md:hidden">
        <button
          onClick={toggleMenu}
          className="text-2xl focus:outline-none"
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? (
            <X size={26} className="text-[var(--text)]" />
          ) : (
            <Menu size={26} className="text-[var(--text)]" />
          )}
        </button>
      </div>

      {/* Mobile Menu with Framer Motion */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="absolute top-16 left-0 w-full bg-bulb-blue text-bulb-white shadow-md flex flex-col space-y-4 py-4 px-6 text-lg z-50"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
          >
            {/* Home Link */}
            <NavLink
              to="/feedback"
              className="block py-2 text-[var(--background)] hover:text-[var(--accent)] transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Feedback
            </NavLink>

            {/* Complaint Link */}
            <NavLink
              to="/form/complaint/complaint"
              className="block py-2 text-[var(--background)] hover:text-[var(--accent)] transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Complaint
            </NavLink>

            {/* Event Link */}
            <NavLink
              to="/form/event/event"
              className="block py-2 text-[var(--background)] hover:text-[var(--accent)] transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Event
            </NavLink>

            {/* Forms Dropdown for Mobile */}
            <div className="relative">
              <button
                onClick={() => setIsFormsDropdownOpen(!isFormsDropdownOpen)}
                className="flex items-center space-x-2 text-[var(--background)] hover:text-[var(--accent)] transition-colors font-medium"
              >
                {/* <span>Forms</span> */}
                <ChevronDown size={16} />
              </button>

              {isFormsDropdownOpen && (
                <div className="mt-2 space-y-2">
                  {/* Other Forms */}
                  {forms?.map((form) => (
                    <NavLink
                      key={form.id}
                      to={`/form/${form.formType.toLowerCase()}/${form.id}`}
                      className="block p-2 hover:bg-gray-100 rounded-lg"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {form.formType}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
