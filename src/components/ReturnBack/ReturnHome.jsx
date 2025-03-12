import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const ReturnHome = () => {
  const navigate = useNavigate();

  const handleHome = () => {
    navigate(-1);
  };

  return (
    <button
      onClick={handleHome}
      className="flex items-center justify-center p-[5px] rounded-full bg-[var(--accent)] text-[var(--background)] hover:bg-[var(--accent-dark)] focus:outline-none focus:ring-[var(--accent)] focus:ring-opacity-50 transition-all duration-200 ease-in-out"
    >
      <ArrowLeft className="w-[18px] h-[18px]" />
    </button>
  );
};

export default ReturnHome;
