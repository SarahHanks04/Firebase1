// import { useFetchFormById, useMutateFormEvent } from "@/api/ResponseApi";
// import Spinner from "@/utils/Spinner";
// import Notification from "@/utils/Notification";
// import FieldEditor from "@/utils/FieldEditor";
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// const AdminFeedbackView = () => {
//   const { formId } = useParams();

//   const { data: form, isLoading, error, refetch } = useFetchFormById(formId);
//   const { mutate: saveForm } = useMutateFormEvent();
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     refetch();
//   }, [formId]);

//   useEffect(() => {
//     if (error) {
//       setMessage("Failed to fetch form data");
//     }
//   }, [error]);

//   if (isLoading) return <Spinner />;

//   if (!form || !form.fields) {
//     return (
//       <div className="admin-form-container">
//         <Notification message="Form not found" type="error" />
//       </div>
//     );
//   }

//   const handleSave = (updatedFields) => {
//     if (!updatedFields || updatedFields.length === 0) {
//       setMessage("Error: No fields to save.");
//       return;
//     }
//     saveForm(
//       { id: formId, data: { ...form, fields: updatedFields } },
//       {
//         onSuccess: () => {
//           setMessage("Form updated successfully!");
//           setTimeout(() => refetch(), 500);
//         },
//       }
//     );
//   };

//   return (
//     <div className="admin-form-container">
//       {message && (
//         <Notification
//           message={message}
//           type="success"
//           className="notification-container"
//         />
//       )}
//       <h1 className="admin-form-title">Admin Feedback View</h1>
//       {form && form.fields ? (
//         <FieldEditor fields={form.fields} onSave={handleSave} />
//       ) : (
//         <Notification message="Form fields not found" type="error" />
//       )}
//     </div>
//   );
// };

// export default AdminFeedbackView;

import { useFetchFormById, useMutateFormEvent } from "@/api/ResponseApi";
import Spinner from "@/utils/Spinner";
import Notification from "@/utils/Notification";
import FieldEditor from "@/utils/FieldEditor";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const AdminFeedbackView = () => {
  const { formId } = useParams();

  const { data: form, isLoading, error, refetch } = useFetchFormById(formId);
  const { mutate: saveForm } = useMutateFormEvent();
  const [message, setMessage] = useState("");

  useEffect(() => {
    refetch();
  }, [formId]);

  useEffect(() => {
    if (error) {
      setMessage("Failed to fetch form data");
    }
  }, [error]);

  if (isLoading) return <Spinner />;

  if (!form || !form.fields) {
    return (
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg text-center">
        <Notification message="Form not found" type="error" />
      </div>
    );
  }

  const handleSave = (updatedFields) => {
    if (!updatedFields || updatedFields.length === 0) {
      setMessage("Error: No fields to save.");
      return;
    }
    saveForm(
      { id: formId, data: { ...form, fields: updatedFields } },
      {
        onSuccess: () => {
          setMessage("Form updated successfully!");
          setTimeout(() => refetch(), 500);
        },
      }
    );
  };

  return (
    <div className="max-w-5xl mt-[3.4rem] mx-auto p-6 md:p-8 bg-bulb-lightBlue shadow-lg rounded-lg">
      {message && (
        <Notification
          message={message}
          type="success"
          className="mb-4 text-center"
        />
      )}
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-6">
        Admin Feedback Editor
      </h1>
      {form?.fields ? (
        <FieldEditor fields={form.fields} onSave={handleSave} />
      ) : (
        <Notification message="Form fields not found" type="error" />
      )}
    </div>
  );
};

export default AdminFeedbackView;
