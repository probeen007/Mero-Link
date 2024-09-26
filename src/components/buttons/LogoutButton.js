'use client';
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut } from "next-auth/react";

export default function LogoutButton({
  className = 'flex mx-auto items-center gap-2 border p-2 px-5 shadow ',
  iconLeft = false,
  iconClasses = '',
}) {
  return (
    <button
      className={className}
      onClick={() => signOut()}>

      <span>Logout</span>

      <FontAwesomeIcon icon={faRightFromBracket} className={iconClasses} />
    </button>
  );
}