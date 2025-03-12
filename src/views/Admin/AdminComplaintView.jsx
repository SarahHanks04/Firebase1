// import { useFetchFormById, useMutateFormEvent } from "@/api/ResponseApi";
// import FieldEditor from "@/utils/FieldEditor";
// import Notification from "@/utils/Notification";
// import Spinner from "@/utils/Spinner";
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// const AdminComplaintView = () => {
//   const { formId } = useParams();
//   console.log("AdminComplaintView received formId:", formId);

//   const { data: form, isLoading, error, refetch } = useFetchFormById(formId);
//   const { mutate: saveForm } = useMutateFormEvent();
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     refetch();
//   }, [formId, refetch]);

//   useEffect(() => {
//     if (error) {
//       setMessage("Failed to fetch complaint form data");
//     }
//   }, [error]);

//   if (isLoading) return <Spinner />;

//   if (!form || !form.fields) {
//     return (
//       <div className="admin-form-container">
//         <Notification message="Complaint form not found" type="error" />
//       </div>
//     );
//   }

//   const handleSave = (updatedFields) => {
//     console.log("Saving complaint form with fields:", updatedFields);
//     if (!updatedFields || updatedFields.length === 0) {
//       setMessage("Error: No fields to save.");
//       return;
//     }
//     saveForm({ id: formId, data: { ...form, fields: updatedFields } });
//     setMessage("Complaint form updated successfully!");
//     refetch();
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
//       <h1 className="admin-form-title">Admin Complaint View</h1>
//       {form && form.fields ? (
//         <FieldEditor fields={form.fields} onSave={handleSave} />
//       ) : (
//         <Notification message="Complaint form fields not found" type="error" />
//       )}
//     </div>
//   );
// };

// export default AdminComplaintView;

import { useFetchFormById, useMutateFormEvent } from "@/api/ResponseApi";
import FieldEditor from "@/utils/FieldEditor";
import Notification from "@/utils/Notification";
import Spinner from "@/utils/Spinner";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const AdminComplaintView = () => {
  const { formId } = useParams();
  console.log("AdminComplaintView received formId:", formId);

  const { data: form, isLoading, error, refetch } = useFetchFormById(formId);
  const { mutate: saveForm } = useMutateFormEvent();
  const [message, setMessage] = useState("");

  useEffect(() => {
    refetch();
  }, [formId]);

  useEffect(() => {
    if (error) {
      setMessage("Failed to fetch complaint form data");
    }
  }, [error]);

  if (isLoading) return <Spinner />;

  if (!form || !form.fields) {
    return (
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg text-center">
        <Notification message="Complaint form not found" type="error" />
      </div>
    );
  }

  const handleSave = (updatedFields) => {
    console.log("Saving complaint form with fields:", updatedFields);
    if (!updatedFields || updatedFields.length === 0) {
      setMessage("Error: No fields to save.");
      return;
    }
    saveForm(
      { id: formId, data: { ...form, fields: updatedFields } },
      {
        onSuccess: () => {
          setMessage("Complaint form updated successfully!");
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
        Admin Complaint Editor
      </h1>
      {form?.fields ? (
        <FieldEditor fields={form.fields} onSave={handleSave} />
      ) : (
        <Notification message="Complaint form fields not found" type="error" />
      )}
    </div>
  );
};

export default AdminComplaintView;
