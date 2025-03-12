import React from "react";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-[#13162D]">
      <div className="relative flex justify-center items-center w-20 h-20">
        {/* Outer Ring */}
        <div
          className="absolute w-full h-full border-8 border-transparent border-t-[#FDBF17] border-r-[#FDBF17] rounded-full animate-spin"
          style={{
            animationDuration: "2s",
            boxShadow: "0 0 10px rgba(253, 191, 23, 0.5)",
          }}
        />

        {/* Middle Ring */}
        <div
          className="absolute w-3/4 h-3/4 border-6 border-transparent border-b-[#FDBF17] border-l-[#FDBF17] rounded-full animate-spin-reverse"
          style={{
            animationDuration: "1.5s",
            boxShadow: "0 0 8px rgba(253, 191, 23, 0.4)",
          }}
        />

        {/* Inner Ring */}
        <div
          className="absolute w-1/2 h-1/2 border-4 border-transparent border-t-[#FDBF17] border-r-[#FDBF17] rounded-full animate-spin"
          style={{
            animationDuration: "1s",
            boxShadow: "0 0 6px rgba(253, 191, 23, 0.3)",
          }}
        />

        {/* Center Dot */}
        <div
          className="absolute w-4 h-4 bg-[#FDBF17] rounded-full"
          style={{
            boxShadow: "0 0 10px rgba(253, 191, 23, 0.8)",
          }}
        />
      </div>
    </div>
  );
};

export default Spinner;
