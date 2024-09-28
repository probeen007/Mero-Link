'use client';

import { savePageButtons } from "@/actions/pageActions"; // Custom action for saving buttons
import SubmitButton from "@/components/buttons/SubmitButton"; // Custom button component
import SectionBox from "@/components/layout/SectionBox"; // Custom layout component
import { ReactSortable } from "react-sortablejs"; // Drag and drop library

// Font Awesome icons for buttons
import {
  faDiscord,
  faFacebook,
  faGithub,
  faInstagram,
  faTelegram,
  faTiktok,
  faWhatsapp,
  faYoutube,
  faTwitter,
  faLinkedin,
  faSnapchat,
  faPinterest,
  faReddit,
  faTwitch,
  faSpotify,
  faSoundcloud,
  faMedium,
  faTumblr
} from "@fortawesome/free-brands-svg-icons";

import {
  faEnvelope,
  faGripLines,
  faMobile,
  faPlus,
  faSave,
  faTrash
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // For Font Awesome icons
import { useState } from "react"; // React hook for managing state
import toast from "react-hot-toast"; // Library for showing toast notifications

// List of all available buttons with icons, labels, and placeholders
export const allButtons = [
  { key: 'email', 'label': 'e-mail', icon: faEnvelope, placeholder: 'test@example.com' },
  { key: 'mobile', 'label': 'mobile', icon: faMobile, placeholder: '' },
  { key: 'instagram', 'label': 'instagram', icon: faInstagram, placeholder: 'https://instagram.com/yourprofile' },
  { key: 'facebook', 'label': 'facebook', icon: faFacebook, placeholder: 'https://facebook.com/yourprofile' },
  { key: 'discord', 'label': 'discord', icon: faDiscord, placeholder: 'https://discord.gg/invitecode' },
  { key: 'tiktok', 'label': 'tiktok', icon: faTiktok, placeholder: 'https://tiktok.com/@yourusername' },
  { key: 'youtube', 'label': 'youtube', icon: faYoutube, placeholder: 'https://youtube.com/channel/yourchannelid' },
  { key: 'whatsapp', 'label': 'whatsapp', icon: faWhatsapp, placeholder: 'https://wa.me/yourphonenumber' },
  { key: 'github', 'label': 'github', icon: faGithub, placeholder: 'https://github.com/yourusername' },
  { key: 'telegram', 'label': 'telegram', icon: faTelegram, placeholder: 'https://t.me/yourusername' },
  { key: 'twitter', 'label': 'twitter', icon: faTwitter, placeholder: 'https://twitter.com/yourprofile' },
  { key: 'linkedin', 'label': 'linkedin', icon: faLinkedin, placeholder: 'https://linkedin.com/in/yourprofile' },
  { key: 'snapchat', 'label': 'snapchat', icon: faSnapchat, placeholder: 'https://snapchat.com/add/yourusername' },
  { key: 'pinterest', 'label': 'pinterest', icon: faPinterest, placeholder: 'https://pinterest.com/yourprofile' },
  { key: 'reddit', 'label': 'reddit', icon: faReddit, placeholder: 'https://reddit.com/user/yourusername' },
  { key: 'twitch', 'label': 'twitch', icon: faTwitch, placeholder: 'https://twitch.tv/yourchannel' },
  { key: 'spotify', 'label': 'spotify', icon: faSpotify, placeholder: 'https://spotify.com/user/yourprofile' },
  { key: 'soundcloud', 'label': 'soundcloud', icon: faSoundcloud, placeholder: 'https://soundcloud.com/yourprofile' },
  { key: 'medium', 'label': 'medium', icon: faMedium, placeholder: 'https://medium.com/@yourprofile' },
  { key: 'tumblr', 'label': 'tumblr', icon: faTumblr, placeholder: 'https://yourprofile.tumblr.com' },
];

// Helper function to capitalize the first letter of each label
function upperFirst(str) {
  return str.slice(0, 1).toUpperCase() + str.slice(1);
}

export default function PageButtonsForm({ user, page }) {
  const pageButtons = page?.buttons || {};
  const pageSavedButtonsKeys = Object.keys(pageButtons);

  // Get saved buttons info based on the keys
  const pageSavedButtonsInfo = pageSavedButtonsKeys
    .map(k => allButtons.find(b => b.key === k));

  const [activeButtons, setActiveButtons] = useState(pageSavedButtonsInfo);

  // Function to add a button to the profile
  function addButtonToProfile(button) {
    setActiveButtons(prevButtons => [...prevButtons, button]);
  }

  // Function to save buttons
  async function saveButtons(formData) {
    await savePageButtons(formData);
    toast.success('Settings saved!');
  }

  // Function to remove a button from the profile
  function removeButton({ key: keyToRemove }) {
    setActiveButtons(prevButtons =>
      prevButtons.filter(button => button.key !== keyToRemove)
    );
  }

  // Get available buttons that haven't been added yet
  const availableButtons = allButtons.filter(b1 => !activeButtons.find(b2 => b1.key === b2.key));

  return (
    <SectionBox>
      <form action={saveButtons}>
        <h2 className="text-2xl font-bold mb-4">Buttons</h2>
        <ReactSortable
          handle=".handle"
          list={activeButtons}
          setList={setActiveButtons}
        >
          {activeButtons.map(b => (
            <div key={b.key} className="mb-4 md:flex items-center">
              <div className="w-56 flex h-full text-gray-700 p-2 gap-2 items-center">
                <FontAwesomeIcon
                  icon={faGripLines}
                  className="cursor-pointer text-gray-400 handle p-2"
                />
                <FontAwesomeIcon icon={b.icon} />
                <span>{upperFirst(b.label)}:</span>
              </div>
              <div className="grow flex">
                <input
                  placeholder={b.placeholder}
                  name={b.key}
                  defaultValue={pageButtons[b.key]}
                  type="text"
                  style={{ marginBottom: '0' }}
                />
                <button
                  onClick={() => removeButton(b)}
                  type="button"
                  className="py-2 px-4 bg-gray-300 cursor-pointer"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>
          ))}
        </ReactSortable>
        <div className="flex flex-wrap gap-2 mt-4 border-y py-4">
          {availableButtons.map(b => (
            <button
              key={b.key}
              type="button"
              onClick={() => addButtonToProfile(b)}
              className="flex items-center gap-1 p-2 bg-gray-200"
            >
              <FontAwesomeIcon icon={b.icon} />
              <span>{upperFirst(b.label)}</span>
              <FontAwesomeIcon icon={faPlus} />
            </button>
          ))}
        </div>
        <div className="max-w-xs mx-auto mt-8">
          <SubmitButton>
            <FontAwesomeIcon icon={faSave} />
            <span>Save</span>
          </SubmitButton>
        </div>
      </form>
    </SectionBox>
  );
}
