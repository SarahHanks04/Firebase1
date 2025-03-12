import React from "react";

const ErrorText = ({ message }) => {
  if (!message) return null;

  return <p className="text-sm text-red-600 font-medium mt-1">{message}</p>;
};

export default ErrorText;
