// import React, { useState } from "react";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import axios from "axios";
// import { BASE_URL } from "../../constants/BASE_URL";
// import { X } from "lucide-react";

// const HeroForm = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     message: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [touched, setTouched] = useState({});
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const queryClient = useQueryClient();

//   // Validate a single field
//   const validateField = (field, value) => {
//     let errorMessage = "";

//     if (!value.trim()) {
//       errorMessage = `${
//         field.charAt(0).toUpperCase() + field.slice(1)
//       } is required.`;
//     } else {
//       if (field === "email" && !/\S+@\S+\.\S+/.test(value)) {
//         errorMessage = "Invalid email format.";
//       }
//     }

//     setErrors((prev) => ({ ...prev, [field]: errorMessage }));
//   };

//   // Handle input change
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));

//     // Validate field on change
//     validateField(name, value);
//   };

//   // Handle input blur (touch event)
//   const handleBlur = (e) => {
//     const { name } = e.target;
//     setTouched((prev) => ({ ...prev, [name]: true }));

//     validateField(name, formData[name]);
//   };

//   // Determine border color based on validation state
//   const getBorderColor = (field) => {
//     if (touched[field]) {
//       if (errors[field]) return "border-b-2 border-red-500";
//       if (formData[field].trim()) return "border-b-2 border-green-500";
//     }
//     return "";
//   };

//   const submitHeroForm = useMutation({
//     mutationFn: async (data) => {
//       const submissionData = {
//         id: Math.random().toString(36).substr(2, 5),
//         formId: "feedback",
//         formType: "feedback",
//         submissionDate: new Date().toISOString(),
//         status: "unresolved",
//         data: Object.entries(data).map(([key, value]) => ({
//           id: key,
//           label: key.charAt(0).toUpperCase() + key.slice(1),
//           type: key === "message" ? "textarea" : "text",
//           value: value,
//         })),
//       };

//       return axios.post(`${BASE_URL}/responses`, submissionData);
//     },
//     onSuccess: () => {
//       setFormData({ name: "", email: "", message: "" });
//       setErrors({});
//       setTouched({});
//       setIsModalOpen(true);
//       queryClient.invalidateQueries("responses");

//       // Automatically close the modal after 5 seconds
//       setTimeout(() => {
//         setIsModalOpen(false);
//       }, 5000);
//     },
//     onError: () => {
//       alert(
//         "Error submitting form. Please ensure all fields are filled correctly."
//       );
//     },
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Ensure all fields are validated before submitting
//     Object.keys(formData).forEach((field) => {
//       validateField(field, formData[field]);
//       setTouched((prev) => ({ ...prev, [field]: true }));
//     });

//     // Prevent submission if there are validation errors
//     if (Object.values(errors).some((error) => error)) {
//       return;
//     }

//     submitHeroForm.mutate(formData);
//   };

//   return (
//     <section className="h-auto bg-bulb-lightBlue dark:bg-[var(--background)] text-[var(--text)]">
//       <div className="flex items-center justify-center font-roboto">
//         <div className="flex flex-col md:flex-row w-full px-[8%]">
//           <div className="md:w-1/2 items-center my-auto">
//             <h1 className="text-[35px] pl-0 md:pl-6 lg:pl-6 font-bold mb-2 text-[var(--text)]">
//               Provide Your Feedback
//             </h1>
//             <p className="mb-3 text-[var(--text)] text-[17px]">
//               Your opinion matters to us. Share your thoughts with us.
//             </p>
//           </div>
//           <div className="md:w-1/2">
//             <form onSubmit={handleSubmit} className="flex flex-col">
//               {/* Name */}
//               <div className="mb-4 pt-2">
//                 <label
//                   htmlFor="name"
//                   className="block text-[15px] font-medium text-[var(--text)]"
//                 >
//                   Name
//                 </label>
//                 <input
//                   type="text"
//                   name="name"
//                   id="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   className={`mt-1 block w-full border border-gray-600 rounded-[8px] py-2 px-3 focus:outline-none focus:border-b-[3.4px] focus:border-bulb-yellow focus:border-t-0 focus:border-l-0 focus:border-r-0 hover:border-b-[3.4px] hover:border-bulb-yellow hover:border-t-0 hover:border-l-0 hover:border-r-0 ${getBorderColor(
//                     "name"
//                   )}`}
//                   required
//                 />
//                 {errors.name && touched.name && (
//                   <span className="text-red-500 text-sm">{errors.name}</span>
//                 )}
//               </div>

//               {/* Email */}
//               <div className="mb-4">
//                 <label
//                   htmlFor="email"
//                   className="block text-[15px] font-medium text-[var(--text)]"
//                 >
//                   Email Address
//                 </label>
//                 <input
//                   type="email"
//                   name="email"
//                   id="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   className={`mt-1 block w-full border border-gray-600 rounded-[8px] py-2 px-3 focus:outline-none focus:border-b-[3.4px] focus:border-bulb-yellow focus:border-t-0 focus:border-l-0 focus:border-r-0 hover:border-b-[3.4px] hover:border-bulb-yellow hover:border-t-0 hover:border-l-0 hover:border-r-0 ${getBorderColor(
//                     "email"
//                   )}`}
//                   required
//                 />
//                 {errors.email && touched.email && (
//                   <span className="text-red-500 text-sm">{errors.email}</span>
//                 )}
//               </div>

//               {/* Message */}
//               <div className="mb-2">
//                 <label
//                   htmlFor="message"
//                   className="block text-[15px] font-medium text-[var(--text)]"
//                 >
//                   Message
//                 </label>
//                 <textarea
//                   name="message"
//                   id="message"
//                   value={formData.message}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   className={`mt-1 block w-full border border-gray-600 rounded-[8px] py-2 px-3 focus:outline-none focus:border-b-[3.4px] focus:border-bulb-yellow focus:border-t-0 focus:border-l-0 focus:border-r-0 hover:border-b-[3.4px] hover:border-bulb-yellow hover:border-t-0 hover:border-l-0 hover:border-r-0 ${getBorderColor(
//                     "message"
//                   )}`}
//                   rows={3}
//                   style={{ resize: "none", overflow: "hidden" }}
//                   onInput={(e) => {
//                     e.target.style.height = "auto";
//                     e.target.style.height = e.target.scrollHeight + "px";
//                   }}
//                   required
//                 />
//                 {errors.message && touched.message && (
//                   <span className="text-red-500 text-sm">{errors.message}</span>
//                 )}
//               </div>

//               {/* Submit Button */}
//               <div className="flex justify-end">
//                 <button
//                   type="submit"
//                   className="bg-bulb-yellow text-[var(--background)] py-1 px-8 rounded-[10px] hover:bg-[var(--accent-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-opacity-50"
//                   disabled={submitHeroForm.isLoading}
//                 >
//                   {submitHeroForm.isLoading ? "Submitting..." : "Submit"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>

//       {/* Success Modal */}
//       {isModalOpen && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white rounded-xl p-6 w-[90%] max-w-lg shadow-lg relative">
//             <button
//               className="absolute top-0 right-4 py-3 mb-6 text-gray-500 hover:text-black focus:outline-none"
//               onClick={() => setIsModalOpen(false)}
//             >
//               <X size={24} />
//             </button>
//             <p className="text-center py-4 text-gray-700">
//               Your response has been submitted successfully.
//             </p>
//           </div>
//         </div>
//       )}
//     </section>
//   );
// };

// export default HeroForm;



// WITH FIREBASE
import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { X } from "lucide-react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/config/firebase";

const HeroForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const queryClient = useQueryClient();

  const validateField = (field, value) => {
    let errorMessage = "";

    if (!value.trim()) {
      errorMessage = `${
        field.charAt(0).toUpperCase() + field.slice(1)
      } is required.`;
    } else {
      if (field === "email" && !/\S+@\S+\.\S+/.test(value)) {
        errorMessage = "Invalid email format.";
      }
    }

    setErrors((prev) => ({ ...prev, [field]: errorMessage }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name, formData[name]);
  };

  const getBorderColor = (field) => {
    if (touched[field]) {
      if (errors[field]) return "border-b-2 border-red-500";
      if (formData[field].trim()) return "border-b-2 border-green-500";
    }
    return "";
  };

  const submitHeroForm = useMutation({
    mutationFn: async (data) => {
      const submissionData = {
        id: Math.random().toString(36).substr(2, 5),
        formId: "feedback",
        formType: "feedback",
        submissionDate: new Date().toISOString(),
        status: "unresolved",
        responses: Object.entries(data).map(([key, value]) => ({
          id: key,
          label: key.charAt(0).toUpperCase() + key.slice(1),
          type: key === "message" ? "textarea" : "text",
          value: value,
        })),
      };

      // Add a new document to the "responses" collection
      const docRef = await addDoc(collection(db, "responses"), submissionData);
      return docRef;
    },
    onSuccess: () => {
      setFormData({ name: "", email: "", message: "" });
      setErrors({});
      setTouched({});
      setIsModalOpen(true);
      queryClient.invalidateQueries("responses");

      setTimeout(() => {
        setIsModalOpen(false);
      }, 5000);
    },
    onError: (error) => {
      console.error("Error submitting form:", error);
      alert(
        "Error submitting form. Please ensure all fields are filled correctly."
      );
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    Object.keys(formData).forEach((field) => {
      validateField(field, formData[field]);
      setTouched((prev) => ({ ...prev, [field]: true }));
    });

    if (Object.values(errors).some((error) => error)) {
      return;
    }

    submitHeroForm.mutate(formData);
  };

  return (
    <section className="h-auto bg-bulb-lightBlue dark:bg-[var(--background)] text-[var(--text)]">
      <div className="flex items-center justify-center font-roboto">
        <div className="flex flex-col md:flex-row w-full px-[8%]">
          <div className="md:w-1/2 items-center my-auto">
            <h1 className="text-[35px] pl-0 md:pl-6 lg:pl-6 font-bold mb-2 text-[var(--text)]">
              Provide Your Feedback
            </h1>
            <p className="mb-3 text-[var(--text)] text-[17px]">
              Your opinion matters to us. Share your thoughts with us.
            </p>
          </div>
          <div className="md:w-1/2">
            <form onSubmit={handleSubmit} className="flex flex-col">
              <div className="mb-4 pt-2">
                <label
                  htmlFor="name"
                  className="block text-[15px] font-medium text-[var(--text)]"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`mt-1 block w-full border border-gray-600 rounded-[8px] py-2 px-3 focus:outline-none focus:border-b-[3.4px] focus:border-bulb-yellow focus:border-t-0 focus:border-l-0 focus:border-r-0 hover:border-b-[3.4px] hover:border-bulb-yellow hover:border-t-0 hover:border-l-0 hover:border-r-0 ${getBorderColor(
                    "name"
                  )}`}
                  required
                />
                {errors.name && touched.name && (
                  <span className="text-red-500 text-sm">{errors.name}</span>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-[15px] font-medium text-[var(--text)]"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`mt-1 block w-full border border-gray-600 rounded-[8px] py-2 px-3 focus:outline-none focus:border-b-[3.4px] focus:border-bulb-yellow focus:border-t-0 focus:border-l-0 focus:border-r-0 hover:border-b-[3.4px] hover:border-bulb-yellow hover:border-t-0 hover:border-l-0 hover:border-r-0 ${getBorderColor(
                    "email"
                  )}`}
                  required
                />
                {errors.email && touched.email && (
                  <span className="text-red-500 text-sm">{errors.email}</span>
                )}
              </div>

              <div className="mb-2">
                <label
                  htmlFor="message"
                  className="block text-[15px] font-medium text-[var(--text)]"
                >
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`mt-1 block w-full border border-gray-600 rounded-[8px] py-2 px-3 focus:outline-none focus:border-b-[3.4px] focus:border-bulb-yellow focus:border-t-0 focus:border-l-0 focus:border-r-0 hover:border-b-[3.4px] hover:border-bulb-yellow hover:border-t-0 hover:border-l-0 hover:border-r-0 ${getBorderColor(
                    "message"
                  )}`}
                  rows={3}
                  style={{ resize: "none", overflow: "hidden" }}
                  onInput={(e) => {
                    e.target.style.height = "auto";
                    e.target.style.height = e.target.scrollHeight + "px";
                  }}
                  required
                />
                {errors.message && touched.message && (
                  <span className="text-red-500 text-sm">{errors.message}</span>
                )}
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-bulb-yellow text-[var(--background)] py-1 px-8 rounded-[10px] hover:bg-[var(--accent-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-opacity-50"
                  disabled={submitHeroForm.isLoading}
                >
                  {submitHeroForm.isLoading ? "Submitting..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl p-6 w-[90%] max-w-lg shadow-lg relative">
            <button
              className="absolute top-0 right-4 py-3 mb-6 text-gray-500 hover:text-black focus:outline-none"
              onClick={() => setIsModalOpen(false)}
            >
              <X size={24} />
            </button>
            <p className="text-center py-4 text-gray-700">
              Your response has been submitted successfully.
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroForm;