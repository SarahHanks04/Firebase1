import React, { useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FaStar } from "react-icons/fa";
import ErrorText from "./ErrorText";
import { motion } from "framer-motion";

const FormRenderer = ({ formFields, onSubmit, isSubmitting }) => {
  // Early return
  if (!formFields || formFields.length === 0) {
    console.error("Form fields are missing or empty:", formFields);
    return <div className="text-center text-gray-500">No fields to render</div>;
  }

  // Initialize refs for each field
  const refs = useRef([]);
  refs.current = formFields.map(
    (_, index) => refs.current[index] ?? React.createRef()
  );

  // Validation Schema
  const validationSchema = yup.object().shape(
    formFields.reduce((schema, field) => {
      if (!field.id) return schema;
      if (field.type === "checkbox") {
        schema[field.id] = yup
          .array()
          .min(1, "At least one option must be selected")
          .required("This field is required");
      } else if (field.type === "rating") {
        schema[field.id] = yup.number().required("This field is required");
      } else if (field.type === "number") {
        schema[field.id] = yup
          .number()
          .typeError("Please enter a valid number")
          .required("This field is required");
      } else if (field.type === "email") {
        schema[field.id] = yup
          .string()
          .email("Please enter a valid email")
          .required("This field is required");
      } else if (field.type === "tel") {
        schema[field.id] = yup
          .string()
          .matches(/^\+?[0-9]{7,15}$/, "Please enter a valid phone number")
          .required("This field is required");
      } else {
        schema[field.id] = field.required
          ? yup.string().required("This field is required")
          : yup.string();
      }
      return schema;
    }, {})
  );

  const {
    handleSubmit,
    control,
    formState: { errors, touchedFields },
    reset,
  } = useForm({ resolver: yupResolver(validationSchema), mode: "onBlur" });

  return (
    <form
      onSubmit={handleSubmit((data) => onSubmit(data, reset))}
      className="w-full mx-auto p-8 space-y-6 bg-bulb-lightBlue dark:text-bulb-white dark:bg-bulb-blue"
    >
      {formFields.map((field, index) => {
        return (
          <motion.div
            key={field.id}
            ref={refs.current[index]}
            className="w-full space-y-2"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <div className="flex gap-4">
              <span className="font-extrabold text-[18px] dark:text-bulb-white mr-2">
                {index + 1}.
              </span>
              <div className="w-full mb-3 text-[#29292A]">
                <label className="block font-semibold text-[18px] text-[#29292A] dark:text-bulb-white mb-5">
                  {field.label}
                </label>
                <Controller
                  name={field.id}
                  control={control}
                  render={({ field: { onChange, value, onBlur } }) => (
                    <>
                      {field.type === "text" ||
                      field.type === "email" ||
                      field.type === "tel" ||
                      field.type === "number" ? (
                        <input
                          type={field.type}
                          value={value || ""}
                          onChange={onChange}
                          onBlur={onBlur}
                          placeholder={field.placeholder}
                          className={`w-full px-3 py-3 border border-gray-300 rounded-[10px] focus:outline-none focus:border-b-[3.5px] focus:border-bulb-yellow focus:border-t-0 focus:border-l-0 focus:border-r-0 hover:border-b-[3.5px] hover:border-bulb-yellow hover:border-t-0 hover:border-l-0 hover:border-r-0 transition-all ${
                            errors[field.id]
                              ? "border-red-500"
                              : touchedFields[field.id] && !errors[field.id]
                              ? "border-green-500"
                              : ""
                          }`}
                        />
                      ) : field.type === "textarea" ? (
                        <textarea
                          value={value || ""}
                          onChange={onChange}
                          onBlur={onBlur}
                          placeholder={field.placeholder}
                          className={`w-full px-3 py-2 border border-gray-300 rounded-[10px] focus:outline-none focus:border-b-[3.5px] focus:border-bulb-yellow focus:border-t-0 focus:border-l-0 focus:border-r-0 hover:border-b-[3.5px] hover:border-bulb-yellow hover:border-t-0 hover:border-l-0 hover:border-r-0 transition-all ${
                            errors[field.id]
                              ? "border-red-500"
                              : touchedFields[field.id] && !errors[field.id]
                              ? "border-green-500"
                              : ""
                          }`}
                          rows={4}
                        />
                      ) : field.type === "radio" ? (
                        <div className="space-y-6">
                          {field.options.map((option, index) => (
                            <label
                              key={index}
                              className="flex items-center text-[17px] space-x-4 dark:text-bulb-white text-[#29292A] cursor-pointer"
                            >
                              <input
                                type="radio"
                                value={option}
                                checked={value === option}
                                onChange={onChange}
                                className="peer hidden"
                              />
                              <div className="w-6 h-6 rounded-full border border-bulb-blue dark:border-bulb-yellow peer-checked:border-bulb-blue peer-checked:bg-bulb-yellow transition-all" />
                              <span>{option}</span>
                            </label>
                          ))}
                        </div>
                      ) : field.type === "checkbox" ? (
                        <div className="space-y-6 text-[#29292A]">
                          {field.options.map((option, index) => (
                            <label
                              key={index}
                              className="flex items-center text-[17px] dark:text-bulb-white space-x-4 text-[#29292A]"
                            >
                              <input
                                type="checkbox"
                                value={option}
                                checked={(value || []).includes(option)}
                                onChange={(e) => {
                                  const isChecked = e.target.checked;
                                  onChange(
                                    isChecked
                                      ? [...(value || []), option]
                                      : value?.filter((v) => v !== option)
                                  );
                                }}
                                className="h-5 w-5"
                              />
                              <span>{option}</span>
                            </label>
                          ))}
                        </div>
                      ) : field.type === "dropdown" ? (
                        <select
                          value={value || ""}
                          onChange={onChange}
                          className="w-full px-4 py-4 text-[#29292A] rounded-[10px] border border-gray-300 focus:outline-none focus:border-b-[3.5px] focus:border-bulb-yellow focus:border-t-0 focus:border-l-0 focus:border-r-0 hover:border-b-[3.5px] hover:border-bulb-yellow hover:border-t-0 hover:border-l-0 hover:border-r-0"
                        >
                          <option
                            className="dark:text-bulb-white text-[17px]"
                            value=""
                          >
                            Select an option
                          </option>
                          {field.options.map((option, index) => (
                            <option key={index} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      ) : field.type === "rating" ? (
                        <div className="flex space-x-6">
                          {[...Array(5)].map((_, index) => {
                            const ratingValue = index + 1;
                            return (
                              <label
                                key={ratingValue}
                                className="cursor-pointer text-[17px] text-[#29292A] dark:text-bulb-white"
                              >
                                <input
                                  type="radio"
                                  value={ratingValue}
                                  checked={value === ratingValue}
                                  onChange={() => onChange(ratingValue)}
                                  className="hidden"
                                />
                                <FaStar
                                  size={28}
                                  color={
                                    ratingValue <= value ? "#FDBF17" : "#E4E5E9"
                                  }
                                />
                              </label>
                            );
                          })}
                        </div>
                      ) : null}
                    </>
                  )}
                />
                {errors[field.id] && (
                  <ErrorText message={errors[field.id].message} />
                )}
              </div>
            </div>
          </motion.div>
        );
      })}

      <motion.button
        type="submit"
        disabled={isSubmitting}
        className="w-full mx-auto block bg-bulb-yellow text-bulb-blue dark:text-bulb-blue text-[20px] font-normal py-2 px-6 rounded-[10px] transition duration-200 disabled:bg-gray-400"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </motion.button>
    </form>
  );
};

export default FormRenderer;

// VERY ORIGINAL

// import React from "react";
// import { useForm, Controller } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import { FaStar } from "react-icons/fa";
// import ErrorText from "./ErrorText";

// const FormRenderer = ({ formFields, onSubmit, isSubmitting }) => {
//   if (!formFields || formFields.length === 0) {
//     console.error("Form fields are missing or empty:", formFields);
//     return <div>No fields to render</div>;
//   }

//   const validationSchema = yup.object().shape(
//     formFields.reduce((schema, field) => {
//       if (!field.id) {
//         console.error("Missing field ID:", field);
//         return schema;
//       } else if (field.type === "checkbox") {
//         schema[field.id] = yup
//           .array()
//           .min(1, "This requires at least one selection")
//           .required("This field is required");
//       } else if (field.type === "rating") {
//         schema[field.id] = yup.number().required("This field is required");
//       } else {
//         schema[field.id] = field.required
//           ? yup.string().required("This field is required")
//           : yup.string();
//       }
//       return schema;
//     }, {})
//   );

//   const {
//     handleSubmit,
//     control,
//     formState: { errors },
//     reset,
//   } = useForm({
//     resolver: yupResolver(validationSchema),
//   });

//   return (
//     <form
//       onSubmit={handleSubmit((data) => onSubmit(data, reset))}
//       className="form-container"
//     >
//       {formFields.map((field, index) => (
//         <div key={field.id} className="form-group">
//           <label className="form-label">
//             <span className="font-bold text-gray-700">{index + 1}. </span>
//             {field.label}
//           </label>

//           <Controller
//             name={field.id}
//             control={control}
//             render={({ field: { onChange, value } }) => {
//               switch (field.type) {
//                 case "text":
//                   return (
//                     <input
//                       type="text"
//                       value={value || ""}
//                       onChange={onChange}
//                       placeholder={field.placeholder}
//                       className="form-input"
//                     />
//                   );

//                 case "radio":
//                   return (
//                     <div className="radio-group">
//                       {field.options.map((option, index) => (
//                         <label key={index} className="radio-label">
//                           <input
//                             type="radio"
//                             value={option}
//                             checked={value === option}
//                             onChange={onChange}
//                           />
//                           <span>{option}</span>
//                         </label>
//                       ))}
//                     </div>
//                   );

//                 case "textarea":
//                   return (
//                     <textarea
//                       value={value || ""}
//                       onChange={onChange}
//                       placeholder={field.placeholder}
//                       className="form-textarea"
//                       rows={2}
//                       style={{ resize: "none", overflow: "hidden" }}
//                       onInput={(e) => {
//                         e.target.style.height = "auto";
//                         e.target.style.height = e.target.scrollHeight + "px";
//                       }}
//                     />
//                   );

//                 case "checkbox":
//                   return (
//                     <div className="checkbox-group">
//                       {field.options.map((option, index) => (
//                         <label key={index} className="checkbox-label">
//                           <input
//                             type="checkbox"
//                             value={option}
//                             checked={(value || []).includes(option)}
//                             onChange={(e) => {
//                               const isChecked = e.target.checked;
//                               onChange(
//                                 isChecked
//                                   ? [...(value || []), option]
//                                   : value?.filter((v) => v !== option)
//                               );
//                             }}
//                           />
//                           <span>{option}</span>
//                         </label>
//                       ))}
//                     </div>
//                   );

//                 case "dropdown":
//                   return (
//                     <select
//                       value={value || ""}
//                       onChange={onChange}
//                       className="form-dropdown"
//                     >
//                       <option value="">Select an option</option>
//                       {field.options.map((option, index) => (
//                         <option key={index} value={option}>
//                           {option}
//                         </option>
//                       ))}
//                     </select>
//                   );

//                 case "rating":
//                   return (
//                     <div className="star-rating">
//                       {[...Array(5)].map((_, index) => {
//                         const ratingValue = index + 1;
//                         return (
//                           <label key={ratingValue} className="cursor-pointer">
//                             <input
//                               type="radio"
//                               value={ratingValue}
//                               checked={value === ratingValue}
//                               onChange={() => onChange(ratingValue)}
//                               className="hidden"
//                             />
//                             <FaStar
//                               size={24}
//                               color={
//                                 ratingValue <= value ? "#ffc107" : "#e4e5e9"
//                               }
//                               className="transition duration-200"
//                             />
//                           </label>
//                         );
//                       })}
//                     </div>
//                   );

//                 default:
//                   return null;
//               }
//             }}
//           />

//           {errors[field.id] && <ErrorText message={errors[field.id].message} />}
//         </div>
//       ))}

//       <button type="submit" disabled={isSubmitting} className="form-submit">
//         {isSubmitting ? "Submitting..." : "Submit"}
//       </button>
//     </form>
//   );
// };

// export default FormRenderer;

// VERY CORRECT WITH INTERNAL STYLING & TRANSITION

// import React, { useRef } from "react";
// import { useForm, Controller } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import { FaStar } from "react-icons/fa";
// import ErrorText from "./ErrorText";
// import { motion, useInView } from "framer-motion";

// const FormRenderer = ({ formFields, onSubmit, isSubmitting }) => {
//   if (!formFields || formFields.length === 0) {
//     console.error("Form fields are missing or empty:", formFields);
//     return <div className="text-center text-gray-500">No fields to render</div>;
//   }

//   const validationSchema = yup.object().shape(
//     formFields.reduce((schema, field) => {
//       if (!field.id) return schema;
//       if (field.type === "checkbox") {
//         schema[field.id] = yup
//           .array()
//           .min(1, "At least one option must be selected")
//           .required("This field is required");
//       } else if (field.type === "rating") {
//         schema[field.id] = yup.number().required("This field is required");
//       } else if (field.type === "number") {
//         schema[field.id] = yup
//           .number()
//           .typeError("Please enter a valid number")
//           .required("This field is required");
//       } else if (field.type === "email") {
//         schema[field.id] = yup
//           .string()
//           .email("Please enter a valid email")
//           .required("This field is required");
//       } else {
//         schema[field.id] = field.required
//           ? yup.string().required("This field is required")
//           : yup.string();
//       }
//       return schema;
//     }, {})
//   );

//   const {
//     handleSubmit,
//     control,
//     formState: { errors },
//     reset,
//   } = useForm({ resolver: yupResolver(validationSchema), mode: "onBlur" });

//   return (
//     <form
//       onSubmit={handleSubmit((data) => onSubmit(data, reset))}
//       className="w-full mx-auto p-8 space-y-6 bg-bulb-lightBlue dark:text-bulb-white dark:bg-bulb-blue"
//     >
//       {formFields.map((field, index) => {
//         const ref = useRef(null);
//         const isInView = useInView(ref, { once: true, margin: "-50px" });

//         return (
//           <motion.div
//             key={field.id}
//             ref={ref}
//             className="w-full space-y-2"
//             initial={{ opacity: 0, y: 30 }}
//             animate={isInView ? { opacity: 1, y: 0 } : {}}
//             transition={{ duration: 0.6, delay: index * 0.1 }}
//           >
//             <div className="flex gap-4">
//               <span className="font-extrabold text-[18px] dark:text-bulb-white mr-2">
//                 {index + 1}.
//               </span>
//               <div className="w-full mb-3 text-[#29292A]">
//                 <label className="block font-semibold text-[18px] text-[#29292A] dark:text-bulb-white mb-5">
//                   {field.label}
//                 </label>
//                 <Controller
//                   name={field.id}
//                   control={control}
//                   render={({ field: { onChange, value, onBlur } }) => (
//                     <>
//                       {field.type === "text" ||
//                       field.type === "email" ||
//                       field.type === "number" ? (
//                         <input
//                           type={field.type}
//                           value={value || ""}
//                           onChange={onChange}
//                           onBlur={onBlur}
//                           placeholder={field.placeholder}
//                           className="w-full px-3 py-3 border rounded-[10px] focus:outline-none"
//                         />
//                       ) : field.type === "textarea" ? (
//                         <textarea
//                           value={value || ""}
//                           onChange={onChange}
//                           onBlur={onBlur}
//                           placeholder={field.placeholder}
//                           className="w-full px-3 py-2 border rounded-[10px] focus:outline-none"
//                           rows={4}
//                         />
//                       ) : field.type === "radio" ? (
//                         <div className="space-y-6">
//                           {field.options.map((option, index) => (
//                             <label
//                               key={index}
//                               className="flex items-center text-[17px] space-x-4 dark:text-bulb-white text-[#29292A]"
//                             >
//                               <input
//                                 type="radio"
//                                 value={option}
//                                 checked={value === option}
//                                 onChange={onChange}
//                                 className="h-5 w-5"
//                               />
//                               <span>{option}</span>
//                             </label>
//                           ))}
//                         </div>
//                       ) : field.type === "checkbox" ? (
//                         <div className="space-y-6 text-[#29292A]">
//                           {field.options.map((option, index) => (
//                             <label
//                               key={index}
//                               className="flex items-center text-[17px] dark:text-bulb-white space-x-4 text-[#29292A]"
//                             >
//                               <input
//                                 type="checkbox"
//                                 value={option}
//                                 checked={(value || []).includes(option)}
//                                 onChange={(e) => {
//                                   const isChecked = e.target.checked;
//                                   onChange(
//                                     isChecked
//                                       ? [...(value || []), option]
//                                       : value?.filter((v) => v !== option)
//                                   );
//                                 }}
//                                 className="h-5 w-5"
//                               />
//                               <span>{option}</span>
//                             </label>
//                           ))}
//                         </div>
//                       ) : field.type === "dropdown" ? (
//                         <select
//                           value={value || ""}
//                           onChange={onChange}
//                           className="w-full px-4 py-4 text-[#29292A] border rounded-[10px] focus:outline-none"
//                         >
//                           <option
//                             className="dark:text-bulb-white text-[17px]"
//                             value=""
//                           >
//                             Select an option
//                           </option>
//                           {field.options.map((option, index) => (
//                             <option key={index} value={option}>
//                               {option}
//                             </option>
//                           ))}
//                         </select>
//                       ) : field.type === "rating" ? (
//                         <div className="flex space-x-6">
//                           {[...Array(5)].map((_, index) => {
//                             const ratingValue = index + 1;
//                             return (
//                               <label
//                                 key={ratingValue}
//                                 className="cursor-pointer text-[17px] text-[#29292A] dark:text-bulb-white"
//                               >
//                                 <input
//                                   type="radio"
//                                   value={ratingValue}
//                                   checked={value === ratingValue}
//                                   onChange={() => onChange(ratingValue)}
//                                   className="hidden"
//                                 />
//                                 <FaStar
//                                   size={28}
//                                   color={
//                                     ratingValue <= value ? "#FDBF17" : "#E4E5E9"
//                                   }
//                                 />
//                               </label>
//                             );
//                           })}
//                         </div>
//                       ) : null}
//                     </>
//                   )}
//                 />
//                 {errors[field.id] && (
//                   <ErrorText message={errors[field.id].message} />
//                 )}
//               </div>
//             </div>
//           </motion.div>
//         );
//       })}

//       <motion.button
//         type="submit"
//         disabled={isSubmitting}
//         className="w-full mx-auto block bg-bulb-yellow text-bulb-blue
//              dark:bg-bulb-blue dark:text-bulb-white text-[20px] font-normal py-2 px-6
//              rounded-[10px] transition duration-200 disabled:bg-gray-400"
//         initial={{ opacity: 0, scale: 0.8 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.5, delay: 0.2 }}
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.95 }}
//       >
//         {isSubmitting ? "Submitting..." : "Submit"}
//       </motion.button>
//     </form>
//   );
// };

// export default FormRenderer;
