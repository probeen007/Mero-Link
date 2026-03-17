"use client";
import { useFormStatus } from 'react-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function SubmitButton({ children, className = '' }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={`
        group relative w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 
        disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-6 rounded-xl 
        transition-all duration-300 transform hover:scale-105 disabled:scale-100 shadow-lg hover:shadow-xl 
        disabled:shadow-md flex items-center justify-center gap-3 overflow-hidden
        ${className}
      `}
    >
      {/* Background shine effect */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-out"></div>
      
      {/* Loading spinner */}
      {pending && (
        <FontAwesomeIcon 
          icon={faSpinner} 
          className="animate-spin text-white" 
        />
      )}
      
      {/* Button content */}
      <span className="relative z-10">
        {pending ? 'Saving...' : children}
      </span>
    </button>
  );
}
