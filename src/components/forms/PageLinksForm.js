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
    await savePageLinks(links);
    toast.success('Saved!');
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
      const newLinks = [...prev];
      newLinks.forEach((link) => {
        if (link.key === keyOfLinkToChange) {
          link[prop] = ev.target.value;
        }
      });
      return [...prev];
    })
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
              <div key={l.key} className="mt-4 rounded-xl border border-gray-200 bg-gray-50/80 p-3 flex flex-col md:flex-row gap-4 md:gap-5 md:items-start">
                <div className="handle self-start md:self-center mt-1">
                  <FontAwesomeIcon
                    className="text-gray-500 mr-2 cursor-ns-resize"
                    icon={faGripLines} />
                </div>
                <div className="text-center md:text-left shrink-0">
                  <div className="bg-gray-300 inline-block relative aspect-square overflow-hidden w-16 h-16 rounded-lg inline-flex justify-center items-center border border-gray-200">
                    {l.icon && (
                      <Image
                        className="w-full h-full object-cover"
                        src={l.icon}
                        alt={'icon'}
                        width={64} height={64} />
                    )}
                    {!l.icon && (
                      <FontAwesomeIcon size="xl" icon={faLink} />
                    )}
                  </div>
                  <div>
                    <button
                      onClick={() => removeLink(l.key)}
                      type="button" className="w-full bg-gray-200 hover:bg-red-100 text-gray-700 hover:text-red-700 py-2 px-3 mt-2 h-full flex gap-2 items-center justify-center rounded-lg transition-colors">
                      <FontAwesomeIcon icon={faTrash} />
                      <span>Remove</span>
                    </button>
                  </div>
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
