// import React, { useState } from "react";
// import { useParams } from "react-router-dom";
// import { useFetchFormById } from "@/api/ResponseApi";
// import FormRenderer from "./FormRenderer";
// import { useSubmitResponse } from "@/api/ResponseApi";
// import Spinner from "./Spinner";
// import { X } from "lucide-react";

// const GenericFormView = () => {
//   const { formId } = useParams();
//   const { data: form, isLoading, error } = useFetchFormById(formId);
//   const { mutate: submitResponse, isLoading: isSubmitting } =
//     useSubmitResponse();
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const handleSubmit = (formData, reset) => {
//     submitResponse(
//       {
//         formId: form.id,
//         formData,
//         formDetails: form,
//       },
//       {
//         onSuccess: () => {
//           setIsModalOpen(true);
//           reset();

//           // Automatically close the modal after 5 seconds
//           setTimeout(() => {
//             setIsModalOpen(false);
//           }, 5000);
//         },
//         onError: (error) => {
//           console.error("Submission failed:", error);
//         },
//       }
//     );
//   };

//   if (isLoading)
//     return (
//       <div>
//         <Spinner />
//       </div>
//     );
//   if (error) return <div>Error loading form.</div>;
//   if (!form) return <div>Form not found.</div>;

//   return (
//     <div className="py-12 px-4">
//       {/* Render the form */}
//       <FormRenderer
//         formFields={form.fields}
//         onSubmit={handleSubmit}
//         isSubmitting={isSubmitting}
//       />

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
//     </div>
//   );
// };

// export default GenericFormView;



// WITH FIREBASE
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, addDoc, collection } from "firebase/firestore";
import { db } from "@/config/firebase"; // Adjust the import path as needed
import FormRenderer from "./FormRenderer";
import Spinner from "./Spinner";
import { X } from "lucide-react";

const GenericFormView = () => {
  const { formId } = useParams();
  const [form, setForm] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch form details from Firestore
  useEffect(() => {
    const fetchFormDetails = async () => {
      try {
        const formRef = doc(db, "formEvents", formId);
        const formSnap = await getDoc(formRef);

        if (formSnap.exists()) {
          setForm(formSnap.data());
        } else {
          setError("Form not found.");
        }
      } catch (err) {
        console.error("Error fetching form details:", err);
        setError("Failed to load form. Please try again later.");
      }
      setIsLoading(false);
    };

    fetchFormDetails();
  }, [formId]);

  // Handle form submission
  const handleSubmit = async (formData, reset) => {
    if (!formData || !form) return;

    setIsSubmitting(true);

    try {
      // Transform formData into the desired format
      const formattedResponses = Object.entries(formData).map(([key, value]) => ({
        id: key,
        label: key.charAt(0).toUpperCase() + key.slice(1),
        type: "text", // Default type, adjust as needed
        value: value,
      }));

      // Add the formatted responses to Firestore
      await addDoc(collection(db, "responses"), {
        formId: formId,
        formType: form.type || "genericForm", // Use form type from Firestore or default
        responses: formattedResponses,
        submissionDate: new Date().toISOString(),
        status: "unresolved",
      });

      // Show success modal
      setIsModalOpen(true);
      reset();

      // Automatically close the modal after 5 seconds
      setTimeout(() => {
        setIsModalOpen(false);
      }, 5000);
    } catch (err) {
      console.error("Error submitting form:", err);
      setError("Failed to submit form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading)
    return (
      <div>
        <Spinner />
      </div>
    );
  if (error) return <div>{error}</div>;
  if (!form) return <div>Form not found.</div>;

  return (
    <div className="py-12 px-4">
      {/* Render the form */}
      <FormRenderer
        formFields={form.fields || []}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />

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
  );
};

export default GenericFormView;