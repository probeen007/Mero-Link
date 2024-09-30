'use client';
import grabUsername from "@/actions/grabUsername";
import SubmitButton from "@/components/buttons/SubmitButton";
import RightIcon from "@/components/icons/RightIcon";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function UsernameForm({ desiredUsername }) {
  const [taken, setTaken] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [buttonClicked, setButtonClicked] = useState(false); // State to track button click

  async function handleSubmit(ev) {
    ev.preventDefault(); // Prevent default form submission behavior
    const formData = new FormData(ev.target); // Create FormData from the form
    const username = formData.get('username').trim(); // Trim whitespace

    // Basic validation
    if (!username) {
      setError('Username cannot be empty.');
      return;
    } else {
      setError(''); // Reset error if valid
    }

    setLoading(true); // Set loading state
    setButtonClicked(true); // Set button clicked state

    try {
      const result = await grabUsername(formData);
      setTaken(result === false);

      if (result) {
        redirect('/account?created=' + encodeURIComponent(username));
      }
    } catch (err) {
      setError('An error occurred. Please try again.'); // Handle error
    } finally {
      setLoading(false); // Reset loading state
      setTimeout(() => setButtonClicked(false), 200); // Reset button clicked state after 200ms
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-4xl font-bold text-center mb-4">
          Grab your Username
        </h1>
        <p className="text-center mb-6 text-gray-500">
          Your username will be your unique identity, choose wisely.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4">
            <input
              name="username"
              className="block p-3 mx-auto border border-gray-300 w-full rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
              defaultValue={desiredUsername}
              type="text"
              placeholder="Enter your username"
              disabled={loading} // Disable input during loading
            />
            {taken && (
              <div className="bg-red-200 border border-red-500 p-2 mt-2 text-center rounded-lg text-red-600">
                This username is already taken. Try another one.
              </div>
            )}
            {error && (
              <div className="bg-red-200 border border-red-500 p-2 mt-2 text-center rounded-lg text-red-600">
                {error}
              </div>
            )}
          </div>
          <div className="flex justify-center">
            <SubmitButton
              disabled={loading}
              className={`px-4 py-2 rounded-md text-white ${buttonClicked ? "bg-blue-400" : "bg-blue-500"} transition duration-150 ease-in-out`}
            >
              {loading ? (
                <span>Loading...</span>
              ) : (
                <>
                  <span>Claim your username</span>
                  <RightIcon />
                </>
              )}
            </SubmitButton>
          </div>
        </form>
      </div>
    </div>
  );
}
