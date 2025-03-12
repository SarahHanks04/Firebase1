// import { useFetchFormById, useSubmitResponse } from "@/api/ResponseApi";
// import FormRenderer from "@/utils/FormRenderer";
// import React from "react";

// const FormPage = ({ match }) => {
//   const formId = match.params.formId;
//   const { data: form, isLoading } = useFetchFormById(formId);
//   const submitResponse = useSubmitResponse();

//   if (isLoading) return <div>Loading form...</div>;
//   if (!form) return <div>Form not found</div>;

//   const handleSubmit = (data) => {
//     submitResponse.mutate(
//       { formId, formData: data, formDetails: form },
//       {
//         onSuccess: () => toast.success("Form submitted successfully!"),
//         onError: () => toast.error("Error submitting form."),
//       }
//     );
//   };

//   return <FormRenderer formFields={form.fields} onSubmit={handleSubmit} />;
// };

// export default FormPage;
import { useFetchFormById, useSubmitResponse } from "@/api/ResponseApi";
import FormRenderer from "@/utils/FormRenderer";
import React from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const FormPage = () => {
  const { formId } = useParams(); 
  const { data: form, isLoading } = useFetchFormById(formId);
  const submitResponse = useSubmitResponse();

  if (isLoading) return <div>Loading form...</div>;
  if (!form) return <div>Form not found</div>;

  const handleSubmit = (data) => {
    submitResponse.mutate(
      { formId, formData: data, formDetails: form },
      {
        onSuccess: () => toast.success("Form submitted successfully!"),
        onError: (error) => toast.error("Error submitting form: " + error.message),
      }
    );
  };

  return <FormRenderer formFields={form.fields} onSubmit={handleSubmit} />;
};

export default FormPage;