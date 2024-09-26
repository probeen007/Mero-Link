"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGift, faCheckCircle } from "@fortawesome/free-solid-svg-icons";

export default function PricingPage() {

  return (
    <div className="bg-white p-6 md:p-10 transition-all duration-300">
      {/* Top Section with Welcome Message */}
      <div className="flex flex-col items-center mb-12 animate-fade-in">
        <h1 className="text-5xl font-bold mt-4">💰 Pricing Plans</h1>
        <p className="text-lg text-gray-600 mt-2 text-center">
          Enjoy all our features completely FREE for all users!
          Mero Link is here to help you streamline your online presence with ease.
        </p>
      </div>

      {/* Free Plan Centered */}
      <div className="flex justify-center items-center">
        <div className="bg-gray-100 rounded-lg p-6 shadow-md transition-all hover:shadow-lg w-full md:w-1/2 text-center animate-fade-in">
          <h2 className="text-3xl font-bold mb-4 flex justify-center items-center">
            <FontAwesomeIcon icon={faGift} className="text-blue-500 mr-2" />
            Free Plan
          </h2>
          <p className="text-2xl font-bold text-blue-700 mb-4">💸 $0/month</p>
          <p className="text-lg text-gray-600 mb-6">
            Enjoy all the features of Mero Link at no cost! Perfect for anyone looking to enhance their online identity.
          </p>

          {/* Improved Included Features Section */}
          <div className="text-left">
            <h3 className="text-xl font-semibold mb-4 text-center">Included Features:</h3>
            <ul className="space-y-4 list-none">
              <li className="flex items-start gap-3">
                <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 mt-1" />
                <div>
                  <span className="font-bold text-lg">Custom Link Tree</span>
                  <p className="text-gray-600">Easily create a single link that combines all your social media, websites, and important links into one place.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 mt-1" />
                <div>
                  <span className="font-bold text-lg">User-Friendly Interface</span>
                  <p className="text-gray-600">A simple and intuitive design that anyone can use without technical expertise.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 mt-1" />
                <div>
                  <span className="font-bold text-lg">Advanced Analytics</span>
                  <p className="text-gray-600">Get insights into how your links are performing with detailed reports on clicks and traffic sources.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 mt-1" />
                <div>
                  <span className="font-bold text-lg">Priority Support</span>
                  <p className="text-gray-600">Get help whenever you need it with our priority support for all users.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 mt-1" />
                <div>
                  <span className="font-bold text-lg">Custom Branding</span>
                  <p className="text-gray-600">Personalize your link tree with custom colors, logos, and branding to reflect your style.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Future Disclaimer Section */}
      <div className="mt-8 text-center text-gray-500">
        <p className="text-lg">
          🔄: Please note: While Mero Link is currently free for all users, pricing plans may be introduced in the future. Enjoy the full range of features without charge for now!
        </p>
      </div>


    </div>
  );
}
