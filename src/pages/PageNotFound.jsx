import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center dark:bg-dark-background px-4">
      <h1 className="text-4xl md:text-6xl font-bold text-red-500 dark:text-dark-text">
        404
      </h1>
      <p className="text-lg md:text-xl mt-4 text-black dark:text-bulb-white">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="mt-6 px-4 py-1 text-[12px] bg-[#FDBF17] dark:bg-bulb-lightBlue text-black dark:text-black rounded-md transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default PageNotFound;
