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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 pb-6 sm:pb-8">
      <div className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-6 space-y-4 sm:space-y-6">
        <div className="text-center pt-3 sm:pt-4">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-5">
            <div className="bg-blue-100 p-2 rounded-full">
              <FontAwesomeIcon icon={faCog} className="text-xl sm:text-2xl text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Account Settings
              </h1>
              <p className="text-sm sm:text-base text-gray-600 mt-1">Customize your Mero Link profile and preferences</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-blue-100 p-4 sm:p-6">
            <div className="text-center">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 flex items-center justify-center flex-wrap gap-1 sm:gap-2">
                <span>{page.displayName || user.name}</span>
                {isVerified && (
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className="text-blue-500 text-base sm:text-lg"
                  />
                )}
              </h2>
              <p className="text-blue-600 text-sm sm:text-base font-medium flex items-center justify-center gap-2 mt-1 break-all">
                <FontAwesomeIcon icon={faLink} className="w-4 h-4 shrink-0" />
                <span>merolink.it.com/{page.uri}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-blue-100 p-3 sm:p-5">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center">
            <FontAwesomeIcon icon={faUser} className="text-blue-600 mr-2" />
            Theme Selection
          </h3>
          <ThemeSelectorWrapper
            currentTheme={theme}
            pageId={page._id}
            onThemeChange={(newTheme) => setTheme(newTheme)}
          />
        </div>

        {isVerified ? (
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl shadow-lg p-4 sm:p-6">
            <div className="flex items-start sm:items-center gap-3 sm:gap-4">
              <div className="bg-green-100 p-2.5 sm:p-3 rounded-full shrink-0">
                <FontAwesomeIcon icon={faCheckCircle} className="text-green-600 text-xl sm:text-2xl" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-green-800 mb-1.5 sm:mb-2">Account Verified! 🎉</h3>
                <p className="text-sm sm:text-base text-green-700">
                  Your account has been verified with a blue checkmark. You're now a trusted member of the Mero Link community!
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl shadow-lg p-4 sm:p-6">
            <div className="flex items-start sm:items-center gap-3 sm:gap-4">
              <div className="bg-blue-100 p-2.5 sm:p-3 rounded-full shrink-0">
                <FontAwesomeIcon icon={faEnvelope} className="text-blue-600 text-xl sm:text-2xl" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg sm:text-xl font-semibold text-blue-800 mb-1.5 sm:mb-2">Get Verified</h3>
                <p className="text-sm sm:text-base text-blue-700 mb-3 sm:mb-4">
                  Join our verified community! Get a blue checkmark next to your name and stand out from the crowd.
                </p>
                <a
                  href="mailto:prootech123@gmail.com"
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  <FontAwesomeIcon icon={faEnvelope} className="w-4 h-4" />
                  Contact for Verification
                </a>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-4">
          <div className="bg-white rounded-xl shadow-lg border border-blue-100 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-3 sm:px-4 py-2">
              <h3 className="text-base sm:text-lg font-semibold text-white">Profile Settings</h3>
            </div>
            <div className="p-3 sm:p-4">
              <PageSettingsForm page={page} user={user} />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-blue-100 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-3 sm:px-4 py-2">
              <h3 className="text-base sm:text-lg font-semibold text-white">Social Buttons</h3>
            </div>
            <div className="p-3 sm:p-4">
              <PageButtonsForm page={page} user={user} />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-blue-100 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-3 sm:px-4 py-2">
              <h3 className="text-base sm:text-lg font-semibold text-white">Custom Links</h3>
            </div>
            <div className="p-3 sm:p-4">
              <PageLinksForm page={page} user={user} />
            </div>
          </div>
        </div>

        <div className="pt-1 sm:pt-2">
          <ShareProfileSection />
        </div>
      </div>
    </div>
  );
}
