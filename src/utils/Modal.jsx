import { X } from "lucide-react";
import { motion } from "framer-motion";

const Modal = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="bg-white bg-opacity-30 backdrop-blur-lg p-6 rounded-[10px] shadow-lg text-center border border-gray-200"
      >
        <p className="text-lg font-medium text-white">{message}</p>
        <button
          onClick={onClose}
          className="mt-4 p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-40 transition"
        >
          <X className="text-white" />
        </button>
      </motion.div>
    </div>
  );
};

export default Modal;
