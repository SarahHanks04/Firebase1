import React from "react";

const Notification = ({ message, type }) => {
  return (
    <div
      className={`p-4 rounded ${
        type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"
      }`}
    >
      {message}
    </div>
  );
};

export default Notification;
