import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faEnvelope, faTwitter, faInstagram, faLinkedin, faMailReply } from "@fortawesome/free-solid-svg-icons";
import { faInstagramSquare, faLinkedinIn, faSquareXTwitter } from "@fortawesome/free-brands-svg-icons";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white text-gray-800 p-6">
      {/* Logo Section */}
      <div className="flex justify-center mb-8">
        <span className="font-bold text-4xl flex items-center text-blue-500">
          Mero
          <FontAwesomeIcon icon={faLink} className="ml-2 text-blue-600" />
          Link
        </span>
      </div>

      {/* Welcome Section */}
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6">Connect with Mero Link</h1>
        <p className="text-lg text-gray-600 mb-8">
          We'd love to hear from you! Get in touch with us via email or social media 📬
        </p>

        {/* Email Section */}
        <div className="p-6 bg-gray-100 shadow-lg rounded-lg mb-8 transition-all hover:shadow-xl hover:bg-gray-200">
          <FontAwesomeIcon icon={faEnvelope} className="text-blue-500 text-3xl mb-2" />
          <h2 className="text-2xl font-bold mb-2">Email Us</h2>
          <p className="text-gray-600">Drop us a line anytime at:</p>
          <a href="mailto:pro.victus07@gmail.com" className="block mt-3 text-blue-600 hover:underline">
            pro.victus07@gmail.com
          </a>
        </div>

        {/* Social Media Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 bg-gray-100 shadow-lg rounded-lg transition-all hover:shadow-xl hover:bg-gray-200">
            <FontAwesomeIcon icon={faSquareXTwitter} className="text-black-800 text-3xl mb-2" />
            <h2 className="text-2xl font-bold mb-2">Twitter 🐦</h2>
            <p className="text-gray-600">Follow us for updates.</p>
            <a href="#" className="block mt-3 text-blue-600 hover:underline">
              @MeroLink
            </a>
          </div>

          <div className="p-6 bg-gray-100 shadow-lg rounded-lg transition-all hover:shadow-xl hover:bg-gray-200">
            <FontAwesomeIcon icon={faInstagramSquare} className="text-red-600 text-3xl mb-2" />
            <h2 className="text-2xl font-bold mb-2">Instagram 📸</h2>
            <p className="text-gray-600">Check our latest posts.</p>
            <a href="#" className="block mt-3 text-blue-600 hover:underline">
              @MeroLink
            </a>
          </div>

          <div className="p-6 bg-gray-100 shadow-lg rounded-lg transition-all hover:shadow-xl hover:bg-gray-200">
            <FontAwesomeIcon icon={faLinkedinIn} className="text-blue-700 text-3xl mb-2" />
            <h2 className="text-2xl font-bold mb-2">LinkedIn 💼</h2>
            <p className="text-gray-600">Connect with us professionally.</p>
            <a href="#" className="block mt-3 text-blue-600 hover:underline">
              Mero Link
            </a>
          </div>
        </div>

        {/* Notice Section */}
        <div className="bg-gray-100 shadow-md rounded-lg p-6 text-gray-600">
          <p>
            <em>Note: Some social handles may not be functional at the moment. Check back soon!</em>
          </p>
        </div>
      </div>
    </div>
  );
}
