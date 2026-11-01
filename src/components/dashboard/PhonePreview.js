'use client';
import ProfileView from '@/components/profile/ProfileView';
import { useEditor } from './EditorProvider';

// The real ProfileView inside a phone frame. `transform` on the screen makes it
// the containing block for the profile's position:fixed background layers.
export default function PhonePreview({ className = '' }) {
  const { previewPage, previewUser, uri } = useEditor();
  return (
    <div className={`relative mx-auto w-[300px] rounded-[44px] border-[10px] border-[#111014] bg-[#111014] ring-1 ring-line shadow-lift ${className}`}>
      <div className="absolute left-1/2 top-2 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-[#111014]" aria-hidden />
      <div className="relative h-[600px] overflow-y-auto overflow-x-hidden rounded-[34px] no-scrollbar [transform:translateZ(0)]">
        <ProfileView page={previewPage} user={previewUser} uri={uri} preview />
      </div>
    </div>
  );
}
