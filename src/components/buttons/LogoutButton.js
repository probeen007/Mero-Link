'use client';
import { faRightFromBracket, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut } from "next-auth/react";
import { useState } from "react";

export default function LogoutButton({
  className = 'flex mx-auto items-center gap-2 border p-2 px-5 shadow ',
  iconLeft = false,
  iconClasses = '',
}) {
  const [pending, setPending] = useState(false);

  const handleLogout = async () => {
    if (pending) return;
    try {
      setPending(true);
      await signOut({ callbackUrl: '/' });
    } catch {
      setPending(false);
    }
  };

  return (
    <button
      className={`${className} disabled:opacity-70 disabled:cursor-not-allowed`}
      disabled={pending}
      onClick={handleLogout}>

      {iconLeft && (
        <FontAwesomeIcon icon={pending ? faSpinner : faRightFromBracket} className={`${iconClasses} ${pending ? 'animate-spin' : ''}`} />
      )}
      
      <span>{pending ? 'Logging out...' : 'Logout'}</span>

      {!iconLeft && (
        <FontAwesomeIcon icon={pending ? faSpinner : faRightFromBracket} className={`${iconClasses} ${pending ? 'animate-spin' : ''}`} />
      )}
    </button>
  );
}
