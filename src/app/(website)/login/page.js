"use client";

import LoginWithGoogle from "@/components/buttons/LoginWithGoogle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { useSession } from "next-auth/react"; // Import useSession from next-auth
import { useRouter } from "next/navigation"; // Import useRouter for redirection
import { useEffect } from "react"; // Import useEffect to handle redirection

export default function LoginPage() {
  const { data: session } = useSession(); // Get the current session data
  const router = useRouter(); // Get the router for navigation

  // If user is already logged in, redirect to the account page
  useEffect(() => {
    if (session) {
      router.push("/account");
    }
  }, [session, router]); // Redirect if the session is available

  return (
    <div className="login-page">
      {/* Logo Section */}
      <div className="logo-section">
        <h1 className="logo flex items-center justify-center text-4xl font-bold text-blue-500 mb-4">
          Mero
          <span className="ml-2">
            <FontAwesomeIcon icon={faLink} className="text-blue-600" />
          </span>
          Link
        </h1>
      </div>

      {/* Login Box */}
      <div className="login-box p-6 mx-auto bg-grey-200">
        <h1 className="text-3xl font-semibold text-center mb-3 text-gray-800">
          Sign In
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Sign in to your account using one of the methods below
        </p>
        <LoginWithGoogle />
      </div>

      <style jsx>{`
        .login-page {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background-color: white;
        }

        .logo-section {
          text-align: center;
          margin-bottom: 2rem;
        }

        .login-box {
          padding: 2rem;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 400px;
        }

        .login-box:hover {
          transform: translateY(-3px);
          transition: transform 0.2s ease;
        }

        @media (min-width: 768px) {
          .logo {
            font-size: 4.5rem;
          }

          .login-box {
            padding: 2.5rem;
          }
        }
      `}</style>
    </div>
  );
}
