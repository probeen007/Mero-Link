"use client";

import { faEdit } from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";



export default function Dashboard() {
  return (
    <button
      className="flex mx-auto items-center gap-2 border p-2 px-4 shadow">
      <FontAwesomeIcon icon={faEdit} className="h-4" />
      Dashboard
    </button>
  );
}