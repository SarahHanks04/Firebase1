import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const fieldVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 } },
};

const UserInformation = ({ onUpdate, clearFields, onClear }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    contact: "",
    emailAddress: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Handle input change
  const handleChange = (e, field) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, [field]: value }));
    onUpdate(field, value);

    // Validate on change
    validateField(field, value);
  };

  // Handle blur (touch event)
  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateField(field, formData[field]);
  };

  // Validate a single field
  const validateField = (field, value) => {
    let errorMessage = "";

    if (!value.trim()) {
      errorMessage = `${field.replace(/([A-Z])/g, " $1")} is required.`;
    } else {
      if (field === "contact" && !/^\d+$/.test(value)) {
        errorMessage = "Contact must be numbers only.";
      } else {
        if (field === "emailAddress" && !/\S+@\S+\.\S+/.test(value)) {
          errorMessage = "Invalid email format.";
        }
      }
    }

    setErrors((prev) => ({ ...prev, [field]: errorMessage }));
  };

  // Determine border color based on validation state
  const getBorderColor = (field) => {
    if (touched[field]) {
      if (errors[field]) return "border-b-2 border-red-500";
      if (formData[field].trim()) return "border-b-2 border-green-500";
    }
    return "";
  };

  // Clear input fields when form is submitted
  useEffect(() => {
    if (clearFields) {
      setFormData({
        firstName: "",
        lastName: "",
        contact: "",
        emailAddress: "",
      });
      setErrors({});
      setTouched({});
      onClear();
    }
  }, [clearFields, onClear]);

  return (
    <motion.div
      className="w-full mx-auto px-8 pt-10 sm:px-0 md:px-10 lg:px-10 bg-bulb-lightBlue dark:bg-bulb-blue dark:text-bulb-white"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* First Name */}
        <motion.div className="flex flex-col" variants={fieldVariants}>
          <label className="text-[#29292A] dark:text-bulb-white mb-3 text-[18px] font-medium">
            First Name
          </label>
          <input
            type="text"
            className={`border border-gray-600 rounded-[10px] p-2 w-full focus:outline-none focus:border-b-[3.5px] focus:border-bulb-yellow focus:border-t-0 focus:border-l-0 focus:border-r-0 hover:border-b-[3.5px] hover:border-bulb-yellow hover:border-t-0 hover:border-l-0 hover:border-r-0 text-black ${getBorderColor(
              "firstName"
            )}`}
            value={formData.firstName}
            onChange={(e) => handleChange(e, "firstName")}
            onBlur={() => handleBlur("firstName")}
          />
          {errors.firstName && touched.firstName && (
            <span className="text-red-500 text-sm">{errors.firstName}</span>
          )}
        </motion.div>

        {/* Last Name */}
        <motion.div className="flex flex-col" variants={fieldVariants}>
          <label className="text-[#29292A] dark:text-bulb-white mb-3 text-[18px] font-medium">
            Last Name
          </label>
          <input
            type="text"
            className={`border border-gray-600 rounded-[10px] p-2 w-full focus:outline-none focus:border-b-[3.5px] focus:border-bulb-yellow focus:border-t-0 focus:border-l-0 focus:border-r-0 hover:border-b-[3.5px] hover:border-bulb-yellow hover:border-t-0 hover:border-l-0 hover:border-r-0 text-black ${getBorderColor(
              "lastName"
            )}`}
            value={formData.lastName}
            onChange={(e) => handleChange(e, "lastName")}
            onBlur={() => handleBlur("lastName")}
          />
          {errors.lastName && touched.lastName && (
            <span className="text-red-500 text-sm">{errors.lastName}</span>
          )}
        </motion.div>

        {/* Contact */}
        <motion.div className="flex flex-col" variants={fieldVariants}>
          <label className="text-[#29292A] dark:text-bulb-white mb-3 text-[18px] font-medium">
            Contact
          </label>
          <input
            type="text"
            className={`border border-gray-600 rounded-[10px] p-2 w-full focus:outline-none focus:border-b-[3.5px] focus:border-bulb-yellow focus:border-t-0 focus:border-l-0 focus:border-r-0 hover:border-b-[3.5px] hover:border-bulb-yellow hover:border-t-0 hover:border-l-0 hover:border-r-0 text-black ${getBorderColor(
              "contact"
            )}`}
            value={formData.contact}
            onChange={(e) => handleChange(e, "contact")}
            onBlur={() => handleBlur("contact")}
          />
          {errors.contact && touched.contact && (
            <span className="text-red-500 text-sm">{errors.contact}</span>
          )}
        </motion.div>

        {/* Email */}
        <motion.div className="flex flex-col" variants={fieldVariants}>
          <label className="text-[#29292A] dark:text-bulb-white mb-3 text-[18px] font-medium">
            Email Address
          </label>
          <input
            type="email"
            className={`border border-gray-600 rounded-[10px] p-2 w-full focus:outline-none focus:border-b-[3.5px] focus:border-bulb-yellow focus:border-t-0 focus:border-l-0 focus:border-r-0 hover:border-b-[3.5px] hover:border-bulb-yellow hover:border-t-0 hover:border-l-0 hover:border-r-0 text-black ${getBorderColor(
              "emailAddress"
            )}`}
            value={formData.emailAddress}
            onChange={(e) => handleChange(e, "emailAddress")}
            onBlur={() => handleBlur("emailAddress")}
          />
          {errors.emailAddress && touched.emailAddress && (
            <span className="text-red-500 text-sm">{errors.emailAddress}</span>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default UserInformation;
