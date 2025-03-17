// import React, { useState } from "react";
// import { useQueryClient } from "@tanstack/react-query";
// import { toast } from "react-toastify";
// import { useFetchFormById, useSubmitResponse } from "@/api/ResponseApi";
// import Spinner from "@/utils/Spinner";
// import ErrorText from "@/utils/ErrorText";
// import FormRenderer from "@/utils/FormRenderer";
// import { useParams } from "react-router-dom";
// import UserInformation from "../UserInformation";
// import { X } from "lucide-react";

// const EventFeedbackUserView = () => {
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
//       <ErrorText message="Failed to load the form. Please try again later." />
//     );
//   if (!formDetails) return <ErrorText message="Event form not found." />;

//   const handleUserInfoUpdate = (field, values) => {
//     setUserInfo((prevInfo) => ({ ...prevInfo, [field]: values }));
//   };

//   const handleSubmit = (responseData, resetForm) => {
//     const combinedData = { ...userInfo, ...responseData };
//     if (!combinedData || Object.keys(combinedData).length === 0) {
//       alert("Error: Event form submission is empty.");
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

//         {/* Event Form */}
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

// export default EventFeedbackUserView;



// WITH FIREBASE
import React, { useState, useEffect } from "react";
import { doc, getDoc, addDoc, collection } from "firebase/firestore";
import { useParams } from "react-router-dom";
import FormRenderer from "@/utils/FormRenderer";
import UserInformation from "../UserInformation";
import Spinner from "@/utils/Spinner";
import { db } from "@/config/firebase";
import { X } from "lucide-react";

const EventFeedbackUserView = () => {
  const { formId } = useParams();
  const [formDetails, setFormDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userFormData, setUserFormData] = useState({
    firstName: "",
    lastName: "",
    contact: "",
    emailAddress: "",
  });
  const [clearFields, setClearFields] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchFormDetails();
  }, [formId]);

  const fetchFormDetails = async () => {
    try {
      const eventRef = doc(db, "formEvents", formId);
      const eventSnap = await getDoc(eventRef);

      if (eventSnap.exists()) {
        setFormDetails(eventSnap.data());
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
      // Merge UserInformation data with event form data
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
        formId: formId,
        formType: "event",
        responses: formattedResponses,
        submissionDate: new Date().toISOString(),
        status: "unresolved",
      });

      // Show success modal
      setIsModalOpen(true);
      resetForm();
      setClearFields(true); // Trigger reset of UserInformation form

      // Automatically close the modal after 5 seconds
      setTimeout(() => {
        setIsModalOpen(false);
      }, 5000);
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
    <div className="flex mt-[3rem] px-6 md:px-8 lg:px-12 sm:px-0">
      <div className="w-full">
        {/* User Information Section */}
        <div>
          <UserInformation
            formData={userFormData}
            onUpdate={handleUserFormChange}
            clearFields={clearFields}
            onClear={() => setClearFields(false)}
          />
        </div>

        {/* Event Form */}
        <div className="mb-6">
          <FormRenderer
            formFields={formDetails.fields || []}
            onSubmit={handleSubmit}
          />
        </div>

        {/* Success Modal */}
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
      </div>
    </div>
  );
};

export default EventFeedbackUserView;