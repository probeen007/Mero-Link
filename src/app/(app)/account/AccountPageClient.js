'use client';
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faEnvelope, faCog, faUser, faLink } from "@fortawesome/free-solid-svg-icons";

import ThemeSelectorWrapper from "@/components/forms/ThemeSelectorWrapper";
import PageSettingsForm from "@/components/forms/PageSettingsForm";
import PageButtonsForm from "@/components/forms/PageButtonsForm";
import PageLinksForm from "@/components/forms/PageLinksForm";
import ShareProfileSection from "@/components/ShareProfileSection";

// Client-side component
export default function AccountPageClient({ page, user, isVerified }) {
  const [theme, setTheme] = useState(page.theme);

  return (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Enhanced Header with Branding */}
  <div className="max-w-4xl mx-auto mb-3 px-3 sm:px-4">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-blue-100 p-1 rounded-full mr-4">
              <FontAwesomeIcon icon={faCog} className="text-2xl text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Account Settings
              </h1>
              <p className="text-gray-600 mt-1">Customize your Mero Link profile and preferences</p>
            </div>
          </div>

          {/* User Profile Summary */}
          <div className="bg-white rounded-xl shadow-lg border border-blue-100 p-6">
            <div className="flex items-center justify-center space-x-4">

              <div className="text-center">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center justify-center">
                  {page.displayName || user.name}
                  {isVerified && (
                    <FontAwesomeIcon
                      icon={faCheckCircle}
                      className="text-blue-500 ml-2 text-lg"
                    />
                  )}
                </h2>
                <p className="text-blue-600 font-medium flex items-center justify-center mt-1">
                  <FontAwesomeIcon icon={faLink} className="w-4 h-4 mr-2" />
                  merolink.it.com/{page.uri}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Theme Selector with Enhanced Styling */}
      <div className="max-w-4xl mx-auto mb-4 sm:mb-6 px-3 sm:px-4">
        <div className="bg-white rounded-xl shadow-lg border border-blue-100 p-3 sm:p-5">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <FontAwesomeIcon icon={faUser} className="text-blue-600 mr-2" />
            Theme Selection
          </h3>
          <ThemeSelectorWrapper
            currentTheme={theme}
            pageId={page._id}
            onThemeChange={(newTheme) => setTheme(newTheme)}
          />
        </div>
      </div>

      {/* Enhanced Verification Status Section */}
  <div className="max-w-4xl mx-auto mb-4 sm:mb-6 px-3 sm:px-4">
        {isVerified ? (
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="bg-green-100 p-3 rounded-full">
                <FontAwesomeIcon icon={faCheckCircle} className="text-green-600 text-2xl" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-green-800 mb-2">Account Verified! 🎉</h3>
                <p className="text-green-700">
                  Your account has been verified with a blue checkmark. You're now a trusted member of the Mero Link community!
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <FontAwesomeIcon icon={faEnvelope} className="text-blue-600 text-2xl" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-blue-800 mb-2">Get Verified</h3>
                <p className="text-blue-700 mb-4">
                  Join our verified community! Get a blue checkmark next to your name and stand out from the crowd.
                </p>
                <a
                  href="mailto:prootech123@gmail.com"
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
                >
                  <FontAwesomeIcon icon={faEnvelope} className="w-4 h-4" />
                  Contact for Verification
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Forms Section */}
  <div className="max-w-4xl mx-auto space-y-0 sm:space-y-1 px-0 sm:px-1">
  <div className="bg-white rounded-none sm:rounded-xl shadow-none sm:shadow-lg border-y sm:border border-blue-100 overflow-hidden sm:mb-0">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-2 sm:p-1">
            <h3 className="text-lg font-semibold text-white">Profile Settings</h3>
          </div>
          <div className="p-3 sm:p-1">
            <PageSettingsForm page={page} user={user} />
          </div>
        </div>

  <div className="bg-white rounded-none sm:rounded-xl shadow-none sm:shadow-lg border-b sm:border border-blue-100 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-2 sm:p-2">
            <h3 className="text-lg font-semibold text-white">Social Buttons</h3>
          </div>
          <div className="p-2 sm:p-1">
            <PageButtonsForm page={page} user={user} />
          </div>
        </div>

  <div className="bg-white rounded-none sm:rounded-xl shadow-none sm:shadow-lg border-b sm:border border-blue-100 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-2 sm:p-2">
            <h3 className="text-lg font-semibold text-white">Custom Links</h3>
          </div>
          <div className="p-2 sm:p-1">
            <PageLinksForm page={page} user={user} />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto mt-4 sm:mt-6 mb-4 sm:mb-6 px-3 sm:px-4">
        <ShareProfileSection />
      </div>
    </div>
  );
}
