import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const GotoNext = () => {
  const navigate = useNavigate();

  const handleGoNext = () => {
    navigate(+1);
  };

  return (
    <button
      onClick={handleGoNext}
      className="flex items-center justify-center p-2 rounded-full bg-[var(--accent)] text-[var(--background)] hover:bg-[var(--accent-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-opacity-50 transition-all duration-200 ease-in-out"
    >
      <ArrowRight className="w-6 h-6" />
    </button>
  );
};

export default GotoNext;
