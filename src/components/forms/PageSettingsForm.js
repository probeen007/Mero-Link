'use client';
import { savePageSettings } from "@/actions/pageActions";
import SubmitButton from "@/components/buttons/SubmitButton";
import RadioTogglers from "@/components/formItems/radioTogglers";
import SectionBox from "@/components/layout/SectionBox";
import { upload } from "@/libs/upload";
import { themes } from "@/libs/themes";
import { faCloudArrowUp, faImage, faPalette, faSave, faMagic } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function PageSettingsForm({ page, user }) {
  const [bgType, setBgType] = useState(page.bgType);
  const [bgColor, setBgColor] = useState(page.bgColor);
  const [bgImage, setBgImage] = useState(page.bgImage);
  const [adaptBackground, setAdaptBackground] = useState(page.adaptBackground || false);
  const [avatar, setAvatar] = useState(user?.image);
  const [uploadingAvatar, setUploadingAvatar] = useState(false); // Fixed this line
  const [uploadingCover, setUploadingCover] = useState(false);
  const [saving, setSaving] = useState(false);

  // Update currentTheme when page theme changes (for real-time theme switching)
  useEffect(() => {
    // This will trigger a re-render when the parent component updates the page prop
  }, [page.theme]);

  async function saveBaseSettings(formData) {
    try {
      setSaving(true);
      console.log('💾 Saving page settings with adaptBackground:', adaptBackground);
      const result = await savePageSettings(formData);
      if (result) {
        toast.success('Settings saved successfully!');
        console.log('✅ Page settings saved successfully');
      }
    } catch (error) {
      console.error('❌ Error saving page settings:', error);
      toast.error('Failed to save settings.');
    } finally {
      setSaving(false);
    }
  }

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const formData = new FormData(ev.target);
    await saveBaseSettings(formData);
  };

  async function handleCoverImageChange(ev) {
    try {
      setUploadingCover(true);
      // Pass current bgImage as old file to delete
      await upload(ev, link => setBgImage(link), bgImage);
    } catch (error) {
      toast.error('Failed to upload cover image.');
    } finally {
      setUploadingCover(false);
    }
  }

  async function handleAvatarImageChange(ev) {
    try {
      setUploadingAvatar(true);
      // Pass current avatar as old file to delete
      await upload(ev, link => setAvatar(link), avatar);
    } catch (error) {
      toast.error('Failed to upload avatar.');
    } finally {
      setUploadingAvatar(false);
    }
  }

  // Get current theme for adapt background - use theme name directly as key
  const currentTheme = themes[page.theme] || themes["default"];

  const backgroundStyle = adaptBackground
    ? {} // Let theme classes handle the background
    : bgType === 'color'
    ? { backgroundColor: bgColor }
    : { backgroundImage: `url(${bgImage})` };

  const backgroundClasses = adaptBackground 
    ? `${currentTheme.bgClass} relative` 
    : '';

  return (
    <div>
      <SectionBox>
        <form onSubmit={handleSubmit}>
          <div
            className={`py-4 -m-4 min-h-[300px] flex justify-center items-center bg-cover bg-center ${backgroundClasses}`}
            style={backgroundStyle}
          >
            <div>
              <RadioTogglers
                defaultValue={adaptBackground ? 'adapt' : (page.bgType === 'adapt' ? 'color' : page.bgType)}
                options={[
                  { value: 'color', icon: faPalette, label: 'Color' },
                  { value: 'image', icon: faImage, label: 'Image' },
                  { value: 'adapt', icon: faMagic, label: 'Adapt Background' },
                ]}
                onChange={val => {
                  if (val === 'adapt') {
                    setAdaptBackground(true);
                    setBgType('color'); // Keep bgType as color for form submission
                  } else {
                    setAdaptBackground(false);
                    setBgType(val);
                  }
                }}
              />
              <input type="hidden" name="bgType" value={bgType} />
              <input type="hidden" name="adaptBackground" value={adaptBackground.toString()} />
              {!adaptBackground && bgType === 'color' && (
                <div className="bg-gray-200 shadow text-gray-700 p-2 mt-2">
                  <div className="flex gap-2 justify-center">
                    <span>Background color:</span>
                    <input
                      type="color"
                      name="bgColor"
                      onChange={ev => setBgColor(ev.target.value)}
                      defaultValue={page.bgColor}
                    />
                  </div>
                </div>
              )}
              {!adaptBackground && bgType === 'image' && (
                <div className="flex justify-center">
                  <label className="bg-white shadow px-4 py-2 mt-2 flex gap-2">
                    <input type="hidden" name="bgImage" value={bgImage} />
                    <input type="file" onChange={handleCoverImageChange} className="hidden" />
                    <div className="flex gap-2 items-center cursor-pointer">
                      <FontAwesomeIcon icon={faCloudArrowUp} className="text-gray-700" />
                      <span>{uploadingCover ? 'Uploading...' : 'Change image'}</span>
                    </div>
                  </label>
                </div>
              )}
              {adaptBackground && (
                <div className="bg-gray-200 shadow text-gray-700 p-2 mt-2">
                  <div className="flex gap-2 justify-center">
                    <FontAwesomeIcon icon={faMagic} className="text-gray-600" />
                    <span>Using theme background: {currentTheme.name}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-center -mb-12">
            <div className="relative -top-8 w-[128px] h-[128px]">
              <div className="overflow-hidden h-full rounded-full border-4 border-white shadow shadow-black/50">
                <Image
                  className="w-full h-full object-cover"
                  src={avatar}
                  alt={'avatar'}
                  width={128}
                  height={128}
                />
              </div>
              <label
                htmlFor="avatarIn"
                className="absolute bottom-0 -right-2 bg-white p-2 rounded-full shadow shadow-black/50 aspect-square flex items-center cursor-pointer"
              >
                <FontAwesomeIcon size={'xl'} icon={faCloudArrowUp} />
              </label>
              <input
                onChange={handleAvatarImageChange}
                id="avatarIn"
                type="file"
                className="hidden"
              />
              <input type="hidden" name="avatar" value={avatar} />
            </div>
          </div>
          <div className="p-0">
            <label className="input-label" htmlFor="nameIn">Display name</label>
            <input
              type="text"
              id="nameIn"
              name="displayName"
              defaultValue={page.displayName}
              placeholder="John Doe"
            />
            <label className="input-label" htmlFor="locationIn">Location</label>
            <input
              type="text"
              id="locationIn"
              name="location"
              defaultValue={page.location}
              placeholder="Somewhere in the world"
            />
            <label className="input-label" htmlFor="bioIn">Bio</label>
            <textarea
              name="bio"
              defaultValue={page.bio}
              id="bioIn"
              placeholder="Your bio goes here..."
            />
            <div className="max-w-[200px] mx-auto">
              <SubmitButton disabled={saving}>
                <FontAwesomeIcon icon={faSave} />
                <span>{saving ? 'Saving...' : 'Save'}</span>
              </SubmitButton>
            </div>
          </div>
        </form>
      </SectionBox>
    </div>
  );
}
