"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faRocket, faUsers, faShareAlt } from "@fortawesome/free-solid-svg-icons";

export default function AboutPage() {
  return (
    <div className="bg-white p-6 md:p-10 transition-all duration-300">
      {/* Top Section with Logo and Welcome */}
      <div className="flex flex-col items-center mb-12 animate-fade-in">
        <span className="font-bold flex items-center text-3xl md:text-4xl text-blue-600">
          Mero
          <FontAwesomeIcon icon={faLink} className="text-blue-700 ml-2" />
          Link
        </span>
        <h1 className="text-4xl md:text-5xl font-semibold mt-4">Welcome to Mero Link! 🌟</h1>
        <p className="text-base md:text-lg text-gray-600 mt-2 text-center">
          The ultimate solution for sharing your online presence effortlessly!
          Join us on a journey to unify and streamline your digital identity.
        </p>
      </div>

      {/* Our Journey */}
      <div className="bg-gray-100 rounded-lg p-6 mb-12 shadow-md transition-all hover:shadow-lg animate-fade-in">
        <h2 className="text-2xl md:text-3xl font-semibold mb-2">🚀 Our Journey</h2>
        <p className="text-gray-600 mt-2">
          Mero Link started with a simple idea: to make it easier for individuals and businesses to share all their social media profiles, websites, and links in one place.
          It’s a one-stop solution to showcase everything about you, whether you're a creator, entrepreneur, or business owner.
        </p>
        <p className="text-gray-600 mt-2">
          Our team recognized the growing need for a streamlined approach to online sharing, leading us to develop a platform that allows you to present your online identity in a cohesive way.
          We aim to empower users by providing them with a tool that not only simplifies their digital sharing but also enhances their professional image.
          We believe in the power of connections, and Mero Link is here to facilitate those connections effortlessly!
        </p>
      </div>

      {/* Key Features */}
      <div className="bg-gray-100 rounded-lg p-6 mb-12 shadow-md transition-all hover:shadow-lg animate-fade-in">
        <h2 className="text-2xl md:text-3xl font-semibold mb-2">✨ Key Features</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all">
            <h3 className="text-xl font-bold mb-1 flex items-center">
              <FontAwesomeIcon icon={faShareAlt} className="text-blue-500 mr-2" />
              Custom Link Tree
            </h3>
            <p className="text-gray-600">
              Create a personalized link tree to showcase all your profiles with a single link. Effortlessly guide your audience to your most important online spaces! 🌐
            </p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all">
            <h3 className="text-xl font-bold mb-1 flex items-center">
              <FontAwesomeIcon icon={faUsers} className="text-blue-500 mr-2" />
              User-Friendly Interface
            </h3>
            <p className="text-gray-600">
              Our intuitive design makes it easy to manage and share your links. Enjoy a smooth experience that lets you focus on connecting! 💻
            </p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all">
            <h3 className="text-xl font-bold mb-1 flex items-center">
              <FontAwesomeIcon icon={faRocket} className="text-blue-500 mr-2" />
              Fast & Reliable
            </h3>
            <p className="text-gray-600">
              Enjoy seamless performance with quick loading times and robust uptime. Stay connected without interruptions! ⚡️
            </p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all">
            <h3 className="text-xl font-bold mb-1 flex items-center">
              <FontAwesomeIcon icon={faLink} className="text-blue-500 mr-2" />
              Analytics & Insights
            </h3>
            <p className="text-gray-600">
              Gain valuable insights into your audience engagement and link performance to optimize your online presence! 📊
            </p>
          </div>
        </div>
      </div>

      {/* How This Idea Came */}
      <div className="bg-gray-100 rounded-lg p-6 mb-12 shadow-md transition-all hover:shadow-lg animate-fade-in">
        <h2 className="text-2xl md:text-3xl font-semibold mb-2">💡 How This Idea Came to Life</h2>
        <p className="text-gray-600 mt-2">
          The idea was born out of necessity. Managing multiple social handles and links became increasingly complex, especially in today’s fast-paced digital world.
          Mero Link provides a solution for that, simplifying your online presence.
          Now, you can connect, share, and engage without the hassle!
        </p>
        <p className="text-gray-600 mt-2">
          We are driven by innovation and continuously seek feedback from our users to improve the platform. Join us as we evolve and adapt to your needs, ensuring that Mero Link remains your go-to solution for online sharing!
        </p>
      </div>
    </div>
  );
}
