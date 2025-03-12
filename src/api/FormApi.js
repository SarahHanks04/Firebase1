import axios from "axios";

const BASE_URL = "http://localhost:5000";

// export const fetchForms = async () => {
//   const { data } = await axios.get(`${BASE_URL}/formEvents`);
//   return data;
// };

// export const fetchResponses = async () => {
//   const { data } = await axios.get(`${BASE_URL}/responses`);
//   return data;
// };

// export const updateForm = async (formId, updatedFields) => {
//   return axios.patch(`${BASE_URL}/formEvents/${formId}`, {
//     fields: updatedFields,
//   });
// };

// export const submitResponse = async (response) => {
//   return axios.post(`${BASE_URL}/responses`, response);
// };

export const fetchForm = async (formId) => {
  const response = await fetch(`http://localhost:5000/formEvents/${formId}`);
  return response.json();
};

export const updateForm = async (formId, updatedFields) => {
  await fetch(`http://localhost:5000/formEvents/${formId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fields: updatedFields }),
  });
};

export const submitResponse = async (formId, data) => {
  await fetch("http://localhost:5000/responses", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ formId, data }),
  });
};
