"use client";

import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Dashboard({ 
  className = "inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-2 px-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 text-sm focus-ring" 
}) {
  return (
    <button className={className}>
      <FontAwesomeIcon icon={faEdit} className="h-4" />
      <span>Dashboard</span>
    </button>
  );
}
