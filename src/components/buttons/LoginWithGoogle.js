'use client';
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signIn } from "next-auth/react";

export default function LoginWithGoogle() {
  return (
    <button
      onClick={() => signIn("google")}
      className="group relative w-full bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-blue-300 text-gray-700 hover:text-blue-700 font-semibold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-4 overflow-hidden"
    >
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {/* Google Icon */}
      <div className="relative z-10 w-6 h-6 flex items-center justify-center">
        <FontAwesomeIcon 
          icon={faGoogle} 
          className="text-xl text-red-500 group-hover:scale-110 transition-transform duration-300" 
        />
      </div>
      
      {/* Button Text */}
      <span className="relative z-10 text-base font-semibold">
        Continue with Google
      </span>
      
      {/* Shine effect */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-out"></div>
    </button>
  );
}