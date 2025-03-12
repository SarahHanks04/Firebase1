import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const BASE_URL = "http://localhost:5000";

// Fetch all form events
export const useFetchFormEvents = () => {
  return useQuery({
    queryKey: ["formEvents"],
    queryFn: async () => {
      const response = await axios.get(`${BASE_URL}/formEvents`);
      return response.data;
    },
  });
};

// Fetch a specific form by ID
export const useFetchFormById = (id) => {
  return useQuery({
    queryKey: ["form", id],
    queryFn: async () => {
      console.log("Fetching form with ID:", id);

      try {
        const response = await axios.get(`${BASE_URL}/formEvents/${id}`);
        console.log("Fetched form data:", response.data);
        return response.data;
      } catch (error) {
        console.error("Error fetching form:", error);
        throw new Error("Form not found");
      }
    },
    enabled: !!id,
    retry: 2,
  });
};

// Create or update form events (Admin functionality)
export const useMutateFormEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }) => {
      if (id) {
        // Update existing form
        return axios.put(`${BASE_URL}/formEvents/${id}`, data);
      } else {
        // Create a new form
        return axios.post(`${BASE_URL}/formEvents`, data);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["formEvents"]);
    },
    onError: (error) => {
      console.error("Error saving form:", error);
    },
  });
};

// NICE

// export const useSubmitResponse = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async ({ id, formData, formDetails }) => {
//       if (!formData || typeof formData !== "object") {
//         throw new Error(
//           "Invalid form data. Please ensure all fields are filled correctly."
//         );
//       }

//       // Convert formData into a format that includes label, type, and status
//       const formattedData = Object.entries(formData)
//         .map(([key, value]) => {
//           const field = formDetails.fields.find((f) => f.id === key);
//           if (!field) {
//             console.error(`Field with ID ${key} not found in form details.`);
//             return null;
//           }
//           return {
//             id: key,
//             label: field.label,
//             type: field.type,
//             value: value,
//           };
//         })
//         .filter(Boolean);

//       const newResponse = {
//         id,
//         submissionDate: new Date().toISOString(),
//         status: "unresolved",
//         data: formattedData,
//       };

//       return axios.post(`${BASE_URL}/responses`, newResponse);
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["responses"] });
//     },
//     onError: (error) => {
//       console.error("Form submission failed:", error);
//     },
//   });
// };

// VERY GOOD
// export const useSubmitResponse = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async ({ formId, formData, formDetails }) => {
//       if (!formData || typeof formData !== "object") {
//         throw new Error(
//           "Invalid form data. Please ensure all fields are filled correctly."
//         );
//       }

//       const formattedData = Object.entries(formData)
//         .map(([key, value]) => {
//           const field = formDetails.fields.find((f) => f.id === key);
//           if (!field) {
//             console.error(`Field with ID ${key} not found in form details.`);
//             return null;
//           }
//           return {
//             id: key,
//             label: field.label,
//             type: field.type,
//             value: value,
//           };
//         })
//         .filter(Boolean);

//       const newResponse = {
//         // id: Math.random().toString(36).substr(2, 9),
//         id: uuidv4().substr(0, 5),
//         formId: formId,
//         formType: formDetails.formType,
//         submissionDate: new Date().toISOString(),
//         status: "unresolved",
//         data: formattedData,
//       };

//       return axios.post(`${BASE_URL}/responses`, newResponse);
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["responses"] });
//     },
//     onError: (error) => {
//       console.error("Form submission failed:", error);
//     },
//   });
// };

export const useSubmitResponse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ formId, formData, formDetails }) => {
      if (!formData || typeof formData !== "object") {
        throw new Error(
          "Invalid form data. Please ensure all fields are filled correctly."
        );
      }

      // Combine static user info with dynamic form fields
      const combinedFormData = {
        ...formData, // this includes user info from UserInformation component
        ...Object.fromEntries(
          formDetails.fields.map((field) => [
            field.id,
            formData[field.id] || "",
          ])
        ),
      };

      const formattedData = Object.entries(combinedFormData)
        .map(([key, value]) => {
          let field = formDetails.fields.find((f) => f.id === key);
          // If field not found in formDetails (like user info fields), create a mock field
          if (!field) {
            field = {
              id: key,
              label: key.charAt(0).toUpperCase() + key.slice(1),
              type: "text",
            };
          }
          return {
            id: key,
            label: field.label,
            type: field.type,
            value: value,
          };
        })
        .filter(Boolean);

      const newResponse = {
        id: uuidv4().substr(0, 5),
        formId: formId,
        formType: formDetails.formType,
        submissionDate: new Date().toISOString(),
        status: "unresolved",
        data: formattedData,
      };

      return axios.post(`${BASE_URL}/responses`, newResponse);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["responses"] });
    },
    onError: (error) => {
      console.error("Form submission failed:", error);
    },
  });
};

// Fetch all user responses
export const useFetchResponses = () => {
  return useQuery(["responses"], async () => {
    const response = await axios.get(`${BASE_URL}/responses`);
    return response.data;
  });
};

export const useFetchResponsesById = (id) => {
  return useQuery({
    queryKey: ["responses", id],
    queryFn: async () => {
      const response = await axios.get(`${BASE_URL}/responses?id=${id}`);
      return response.data.map((resp) => ({
        ...resp,
        formattedDate: new Date(resp.submissionDate).toLocaleString(), // Format date for UI display
      }));
    },
    enabled: !!id,
  });
};

export const useUpdateResponseStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ responseId, status }) => {
      return axios.patch(`${BASE_URL}/responses/${responseId}`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["responses"] });
    },
    onError: (error) => {
      console.error("Error updating response status:", error);
    },
  });
};
