// import React, { useState } from "react";
// import { useParams } from "react-router-dom";
// import { useQueryClient } from "@tanstack/react-query";
// import { useFetchFormById, useSubmitResponse } from "@/api/ResponseApi";
// import Spinner from "@/utils/Spinner";
// import ErrorText from "@/utils/ErrorText";
// import FormRenderer from "@/utils/FormRenderer";
// import UserInformation from "../UserInformation";
// import { toast } from "react-toastify";
// import { X } from "lucide-react";

// const ComplaintUserView = () => {
//   const { formId } = useParams();
//   const queryClient = useQueryClient();

//   const { data: formDetails, isLoading, error } = useFetchFormById(formId);
//   const { mutate: submitResponse, isPending } = useSubmitResponse();

//   const [userInfo, setUserInfo] = useState({
//     firstName: "",
//     lastName: "",
//     contact: "",
//     emailAddress: "",
//   });

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [clearFields, setClearFields] = useState(false);

//   if (isLoading) return <Spinner />;
//   if (error)
//     return (
//       <ErrorText message="Failed to load the complaint form. Please try again later." />
//     );
//   if (!formDetails) return <ErrorText message="Complaint form not found." />;

//   const handleUserInfoUpdate = (field, value) => {
//     setUserInfo((prevInfo) => ({ ...prevInfo, [field]: value }));
//   };

//   const handleSubmit = (responseData, resetForm) => {
//     const combinedData = { ...userInfo, ...responseData };
//     if (!combinedData || Object.keys(combinedData).length === 0) {
//       alert("Error: Complaint form submission is empty.");
//       return;
//     }
//     submitResponse(
//       { formId, formData: combinedData, formDetails },
//       {
//         onSuccess: () => {
//           queryClient.invalidateQueries(["form", formId]);
//           queryClient.invalidateQueries(["formEvents"]);
//           resetForm();
//           setIsModalOpen(true);
//           setClearFields(true);

//           // Automatically close the modal after 5 seconds
//           setTimeout(() => {
//             setIsModalOpen(false);
//           }, 5000);
//         },
//         onError: () => {
//           toast.error("Failed to submit the form. Please try again.", {
//             position: "top-center",
//             autoClose: 3000,
//           });
//         },
//       }
//     );
//   };

//   return (
//     <div className="flex mt-[3rem] px-6 md:px-8 lg:px-12 sm:px-0">
//       <div className="w-full">
//         {/* User Information Section */}
//         <div>
//           <UserInformation
//             onUpdate={handleUserInfoUpdate}
//             clearFields={clearFields}
//             onClear={() => setClearFields(false)}
//           />
//         </div>

//         {/* Complaint Form */}
//         <div className="mb-6">
//           <FormRenderer
//             formFields={formDetails.fields || []}
//             onSubmit={handleSubmit}
//             isSubmitting={isPending}
//           />
//         </div>

//         {/* Success Modal */}
//         {isModalOpen && (
//           <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//             <div className="bg-white rounded-xl p-6 w-[90%] max-w-lg shadow-lg relative">
//               <button
//                 className="absolute top-0 right-4 py-3 mb-6 text-gray-500 hover:text-black focus:outline-none"
//                 onClick={() => setIsModalOpen(false)}
//               >
//                 <X size={24} />
//               </button>
//               <p className="text-center py-4 text-gray-700">
//                 Your response has been submitted successfully.
//               </p>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ComplaintUserView;



// import React, { useState, useEffect } from "react";
// import { doc, getDoc, addDoc, collection } from "firebase/firestore";
// import FormRenderer from "@/utils/FormRenderer";
// import UserInformation from "../UserInformation";
// import Spinner from "@/utils/Spinner";
// import { db } from "@/config/firebase";

// const ComplaintUserView = () => {
//   const [formDetails, setFormDetails] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     fetchFormDetails();
//   }, []);

//   const fetchFormDetails = async () => {
//     try {
//       const complaintRef = doc(db, "formEvents", "complaint");
//       const complaintSnap = await getDoc(complaintRef);

//       if (complaintSnap.exists()) {
//         setFormDetails(complaintSnap.data());
//       } else {
//         setFormDetails(null);
//       }
//     } catch (error) {
//       console.error("Error fetching form details:", error);
//     }
//     setIsLoading(false);
//   };

//   const handleSubmit = async (responseData, resetForm) => {
//     if (!responseData || !formDetails?.fields) return;

//     try {
//       const formattedResponses = formDetails.fields.map((field) => ({
//         id: field.id,
//         label: field.label || field.id.charAt(0).toUpperCase() + field.id.slice(1),
//         type: field.type || "text", 
//         value: responseData[field.id] || "", 
//       }));

//       // Add the formatted responses to Firestore
//       await addDoc(collection(db, "responses"), {
//         formId: "complaint",
//         formType: "complaint",
//         responses: formattedResponses,
//         submissionDate: new Date().toISOString(),
//         status: "unresolved",
//       });

//       alert("Form submitted successfully!");
//       resetForm();
//     } catch (error) {
//       console.error("Error submitting form:", error);
//     }
//   };

//   if (isLoading) return <Spinner />;
//   if (!formDetails) return <p>No form available</p>;

//   return (
//     <div className="p-6">
//       <UserInformation />
//       <h2 className="text-2xl font-bold">{formDetails.title}</h2>
//       <FormRenderer formFields={formDetails.fields || []} onSubmit={handleSubmit} />
//     </div>
//   );
// };

// export default ComplaintUserView;





import React, { useState, useEffect } from "react";
import { doc, getDoc, addDoc, collection } from "firebase/firestore";
import FormRenderer from "@/utils/FormRenderer";
import UserInformation from "../UserInformation";
import Spinner from "@/utils/Spinner";
import { db } from "@/config/firebase";

const ComplaintUserView = () => {
  const [formDetails, setFormDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userFormData, setUserFormData] = useState({
    firstName: "",
    lastName: "",
    contact: "",
    emailAddress: "",
  });
  const [clearFields, setClearFields] = useState(false);

  useEffect(() => {
    fetchFormDetails();
  }, []);

  const fetchFormDetails = async () => {
    try {
      const complaintRef = doc(db, "formEvents", "complaint");
      const complaintSnap = await getDoc(complaintRef);

      if (complaintSnap.exists()) {
        setFormDetails(complaintSnap.data());
      } else {
        setFormDetails(null);
      }
    } catch (error) {
      console.error("Error fetching form details:", error);
    }
    setIsLoading(false);
  };

  const handleUserFormChange = (field, value) => {
    setUserFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (responseData, resetForm) => {
    if (!responseData || !formDetails?.fields) return;

    try {
      // Merge UserInformation data with complaint form data
      const mergedData = {
        ...responseData,
        ...userFormData,
      };

      // Transform mergedData into the desired format
      const formattedResponses = formDetails.fields.map((field) => ({
        id: field.id,
        label: field.label || field.id.charAt(0).toUpperCase() + field.id.slice(1),
        type: field.type || "text",
        value: mergedData[field.id] || "",
      }));

      // Add UserInformation fields to the responses
      Object.entries(userFormData).forEach(([key, value]) => {
        formattedResponses.push({
          id: key,
          label: key.charAt(0).toUpperCase() + key.slice(1),
          type: key === "emailAddress" ? "email" : "text",
          value: value,
        });
      });

      // Add the formatted responses to Firestore
      await addDoc(collection(db, "responses"), {
        formId: "complaint",
        formType: "complaint",
        responses: formattedResponses,
        submissionDate: new Date().toISOString(),
        status: "unresolved",
      });

      alert("Form submitted successfully!");
      resetForm();
      setClearFields(true);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  // Reset UserInformation form after submission
  useEffect(() => {
    if (clearFields) {
      setUserFormData({
        firstName: "",
        lastName: "",
        contact: "",
        emailAddress: "",
      });
      setClearFields(false);
    }
  }, [clearFields]);

  if (isLoading) return <Spinner />;
  if (!formDetails) return <p>No form available</p>;

  return (
    <div className="p-6">
      <UserInformation
        formData={userFormData}
        onUpdate={handleUserFormChange}
        clearFields={clearFields}
        onClear={() => setClearFields(false)}
      />
      <h2 className="text-2xl font-bold">{formDetails.title}</h2>
      <FormRenderer formFields={formDetails.fields || []} onSubmit={handleSubmit} />
    </div>
  );
};

export default ComplaintUserView;