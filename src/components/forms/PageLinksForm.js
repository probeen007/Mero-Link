'use client';
import { savePageLinks } from "@/actions/pageActions";
import SubmitButton from "@/components/buttons/SubmitButton";
import SectionBox from "@/components/layout/SectionBox";
import { faGripLines, faLink, faPlus, faSave, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useState, useRef } from "react";
import toast from "react-hot-toast";
import { ReactSortable } from "react-sortablejs";

export default function PageLinksForm({ page, user }) {
  const [links, setLinks] = useState(page.links || []);
  const nextId = useRef(1);
  async function save() {
    try {
      const result = await savePageLinks(links);
      if (result) {
        toast.success('Saved!');
      } else {
        toast.error('Failed to save links.');
      }
    } catch (err) {
      toast.error('An error occurred while saving.');
    }
  }
  function addNewLink() {
    setLinks(prev => {
      const newId = nextId.current++;
      return [...prev, {
        key: `link-${newId}`,
        title: '',
        subtitle: '',
        icon: '',
        url: '',
      }];
    });
  }
  function handleLinkChange(keyOfLinkToChange, prop, ev) {
    setLinks(prev => {
      return prev.map(link => 
        link.key === keyOfLinkToChange ? { ...link, [prop]: ev.target.value } : link
      );
    });
  }
  function removeLink(linkKeyToRemove) {
    setLinks(prevLinks => [...prevLinks].filter(l => l.key !== linkKeyToRemove));
  }
  return (
    <SectionBox className="space-y-4">
      <form action={save}>
        <h2 className="text-xl sm:text-2xl font-bold mb-4">Links</h2>
        <button
          onClick={addNewLink}
          type="button"
          className="text-blue-600 hover:text-blue-700 text-base sm:text-lg flex gap-2 items-center cursor-pointer font-medium">
          <FontAwesomeIcon className="bg-blue-500 text-white p-1 rounded-full aspect-square" icon={faPlus} />
          <span>Add new</span>
        </button>
        <div>
          <ReactSortable
            handle={'.handle'}
            list={links} setList={setLinks}>
            {links.map(l => (
              <div key={l.key} className="mt-4 rounded-xl border border-gray-200 bg-gray-50/80 p-3 sm:p-4 flex flex-col md:flex-row gap-4 md:gap-5">
                <div className="flex md:flex-col items-center justify-between md:justify-start gap-3 md:gap-4 shrink-0 border-b md:border-b-0 pb-3 md:pb-0">
                  <div className="flex items-center gap-3 md:flex-col">
                    <div className="handle cursor-ns-resize text-gray-400 p-2 hover:text-gray-600 transition-colors">
                      <FontAwesomeIcon
                        className="text-gray-500"
                        icon={faGripLines} />
                    </div>
                    <div className="bg-gray-300 relative aspect-square w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center border border-gray-200 shrink-0 overflow-hidden">
                      {l.icon ? (
                        <Image
                          className="w-full h-full object-cover"
                          src={l.icon}
                          alt={'icon'}
                          width={64} height={64} />
                      ) : (
                        <FontAwesomeIcon size="lg" icon={faLink} className="text-gray-500" />
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => removeLink(l.key)}
                    type="button" 
                    className="md:w-full bg-gray-200/80 hover:bg-red-100 text-gray-700 hover:text-red-700 py-2 px-3 flex gap-2 items-center justify-center rounded-lg transition-colors text-sm font-medium shrink-0"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                    <span>Remove</span>
                  </button>
                </div>
                <div className="grow min-w-0">
                  <label className="input-label">Icon URL:</label>
                  <input
                    value={l.icon}
                    onChange={ev => handleLinkChange(l.key, 'icon', ev)}
                    type="url" placeholder="https://example.com/icon.png (optional)" />
                  <p className="text-xs text-gray-500 mb-2">Optional: direct icon image link.</p>
                  <label className="input-label">Title:</label>
                  <input
                    value={l.title}
                    onChange={ev => handleLinkChange(l.key, 'title', ev)}
                    type="text" placeholder="Title" />
                  <label className="input-label">Subtitle:</label>
                  <input
                    value={l.subtitle}
                    onChange={ev => handleLinkChange(l.key, 'subtitle', ev)}
                    type="text" placeholder="Subtitle (optional)" />
                  <label className="input-label">URL:</label>
                  <input
                    value={l.url}
                    onChange={ev => handleLinkChange(l.key, 'url', ev)}
                    type="url" placeholder="https://example.com/" />
                </div>
              </div>
            ))}
          </ReactSortable>
        </div>
        <div className="border-t pt-4 mt-4">
          <SubmitButton className="max-w-xs mx-auto">
            <FontAwesomeIcon icon={faSave} />
            <span>Save</span>
          </SubmitButton>
        </div>
      </form>
    </SectionBox>
  );
}
