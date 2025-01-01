import { Page } from "@/models/Page";
import { User } from "@/models/User";
import { Event } from "@/models/Event";
import {
  faDiscord, faFacebook, faGithub, faInstagram, faLinkedin, faMedium, faPinterest, faReddit, faSnapchat, faSoundcloud, faSpotify, faTelegram, faTiktok,
  faTumblr,
  faTwitch,
  faTwitter,
  faWhatsapp, faYoutube
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faLink, faLocationDot, faMagic, faMobile, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import mongoose from "mongoose";
import { btoa } from "next/dist/compiled/@edge-runtime/primitives";
import Image from "next/image";
import Link from "next/link";

export const buttonsIcons = {
  email: faEnvelope,
  mobile: faPhone,
  instagram: faInstagram,
  facebook: faFacebook,
  discord: faDiscord,
  tiktok: faTiktok,
  youtube: faYoutube,
  whatsapp: faWhatsapp,
  github: faGithub,
  telegram: faTelegram,
  twitter: faTwitter,
  linkedin: faLinkedin,
  snapchat: faSnapchat,
  pinterest: faPinterest,
  reddit: faReddit,
  twitch: faTwitch,
  spotify: faSpotify,
  soundcloud: faSoundcloud,
  medium: faMedium,
  tumblr: faTumblr,
};

function buttonLink(key, value) {
  if (key === 'mobile') {
    return 'tel:' + value;
  }
  if (key === 'email') {
    return 'mailto:' + value;
  }
  return value;
}

export default async function UserPage({ params }) {
  const uri = params.uri;
  // Ensure connection
  await mongoose.connect(process.env.MONGO_URI);

  // Fetch page data
  const page = await Page.findOne({ uri }).lean();

  // Check if page exists
  if (!page) {
    // You can return a 404 page or a custom error message here
    return <div className="text-center text-white">Page not found!</div>;
  }

  // Fetch user data based on the page owner
  const user = await User.findOne({ email: page.owner });

  // Log the view event
  await Event.create({ uri: uri, page: uri, type: 'view' });

  return (
    <div className="bg-blue-950 text-white min-h-screen">
      {/* Banner Section */}
      <div
        className="h-36 bg-gray-400 bg-cover bg-center relative"
        style={
          page.bgType === "color"
            ? { backgroundColor: page.bgColor }
            : { backgroundImage: `url(${page.bgImage})` }
        }
      ></div>

      {/* Avatar Section */}
      <div className="aspect-square w-36 h-36 mx-auto relative -top-16 -mb-12 border-4 border-white rounded-full shadow-lg">
        <Image
          className="rounded-full w-full h-full object-cover"
          src={user?.image || "/default-avatar.png"}
          alt="avatar"
          width={250}
          height={250}
        />
      </div>

      {/* User Info */}
      <h2 className="text-3xl font-semibold text-center mb-1">{page.displayName || "@randomuser"}</h2>
      <h3 className="text-md flex gap-2 justify-center items-center text-white/70">
        <FontAwesomeIcon className="h-4" icon={faLocationDot} />
        <span>{page.location || " "}</span>
      </h3>
      <div className="max-w-md mx-auto text-center my-2">
        <p className="text-white/70">{page.bio || " "}</p>
      </div>

      {/* Social Buttons */}
      <div className="flex gap-3 justify-center mt-4 pb-4">
        {page.buttons && Object.keys(page.buttons).length > 0 ? (
          Object.keys(page.buttons).map((buttonKey) => (
            <Link
              key={buttonKey}
              href={buttonLink(buttonKey, page.buttons[buttonKey])}
              className="rounded-full bg-white text-blue-950 p-2 flex items-center justify-center shadow-md hover:bg-blue-100 transition duration-200"
            >
              <FontAwesomeIcon className="w-5 h-5" icon={buttonsIcons[buttonKey]} />
            </Link>
          ))
        ) : (
          <p> </p> // You can customize this to show a different message or nothing at all
        )}
      </div>


      {/* Links Section */}
      <div className="max-w-2xl mx-auto grid md:grid-cols-2 gap-6 p-4 px-6">
        {page.links.map((link) => (
          <Link
            key={link.url}
            target="_blank"
            ping={process.env.URL + "api/click?url=" + btoa(link.url) + "&page=" + page.uri}
            className="flex items-center bg-indigo-800 hover:bg-indigo-700 transition duration-200 rounded-lg p-4 shadow-md"
            href={link.url}
          >
            {/* Link Icon */}
            <div className="w-16 h-16 flex items-center justify-center bg-blue-700 rounded-full mr-4">
              {link.icon ? (
                <Image
                  className="w-full h-full object-cover rounded-full"
                  src={link.icon}
                  alt="icon"
                  width={64}
                  height={64}
                />
              ) : (
                <FontAwesomeIcon icon={faLink} className="w-8 h-8 text-white/80" />
              )}
            </div>

            {/* Link Content */}
            <div className="flex-1 overflow-hidden">
              <h3 className="text-lg font-medium truncate">{link.title}</h3>
              <p className="text-white/50 text-sm truncate">{link.subtitle}</p>
            </div>
          </Link>
        ))}
      </div>
      <div className="relative flex justify-center mt-12 ">
        <div className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-full shadow-lg flex items-center space-x-2 transition-transform hover:scale-105 mb-4">
          <div className="bg-yellow-400 text-blue-700 p-2 rounded-full shadow-md">
            <FontAwesomeIcon icon={faMagic} className="w-4 h-4" />
          </div>
          <a href="https://merolink.me"
            target="_blank"
            rel="noopener noreferrer"> <span className="text-sm md:text-base font-medium">Make your one</span></a>
        </div>
      </div>

    </div>




  );
}
