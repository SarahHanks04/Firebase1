import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useFetchFormById } from "@/api/ResponseApi";
import FormRenderer from "./FormRenderer";
import { useSubmitResponse } from "@/api/ResponseApi";
import Spinner from "./Spinner";
import { X } from "lucide-react";

const GenericFormView = () => {
  const { formId } = useParams();
  const { data: form, isLoading, error } = useFetchFormById(formId);
  const { mutate: submitResponse, isLoading: isSubmitting } =
    useSubmitResponse();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (formData, reset) => {
    submitResponse(
      {
        formId: form.id,
        formData,
        formDetails: form,
      },
      {
        onSuccess: () => {
          setIsModalOpen(true);
          reset();

          // Automatically close the modal after 5 seconds
          setTimeout(() => {
            setIsModalOpen(false);
          }, 5000);
        },
        onError: (error) => {
          console.error("Submission failed:", error);
        },
      }
    );
  };

  if (isLoading)
    return (
      <div>
        <Spinner />
      </div>
    );
  if (error) return <div>Error loading form.</div>;
  if (!form) return <div>Form not found.</div>;

  return (
    <div className="py-12 px-4">
      {/* Render the form */}
      <FormRenderer
        formFields={form.fields}
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
