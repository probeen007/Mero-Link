'use client';
// Holds the editable draft of the signed-in user's page. Every edit updates the
// live preview immediately and is autosaved (debounced) through savePage().
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { savePage } from '@/actions/pageActions';

const EditorContext = createContext(null);
const SAVE_DELAY = 700;

export function EditorProvider({ page, user, clicks, children }) {
  const [draft, setDraft] = useState(() => ({
    displayName: page.displayName || '',
    location: page.location || '',
    bio: page.bio || '',
    avatar: user.image || '',
    theme: page.theme,
    themeOverrides: page.themeOverrides || {},
    bgMode: page.bgMode,
    bgType: page.bgType,
    bgColor: page.bgColor,
    bgImage: page.bgImage || '',
    adaptBackground: page.adaptBackground,
    linkStyle: page.linkStyle || 'list',
    videoPosition: page.videoPosition || 'before',
    buttons: page.buttons || {},
    links: (page.links || []).map((l) => ({ type: 'link', ...l })),
    videos: page.videos || [],
  }));
  const [status, setStatus] = useState('saved'); // saved | pending | saving | error
  const latest = useRef(draft);
  const dirty = useRef(new Set());
  const timer = useRef(null);

  const flush = useCallback(async () => {
    clearTimeout(timer.current);
    if (dirty.current.size === 0) return;
    const keys = [...dirty.current];
    dirty.current.clear();
    const patch = Object.fromEntries(keys.map((k) => [k, latest.current[k]]));
    setStatus('saving');
    try {
      const res = await savePage(patch);
      if (!res?.ok) throw new Error('save failed');
      setStatus(dirty.current.size ? 'pending' : 'saved');
    } catch {
      keys.forEach((k) => dirty.current.add(k));
      setStatus('error');
    }
  }, []);

  const update = useCallback((patch) => {
    setDraft((d) => {
      const next = { ...d, ...(typeof patch === 'function' ? patch(d) : patch) };
      latest.current = next;
      return next;
    });
    const keys = Object.keys(typeof patch === 'function' ? patch(latest.current) : patch);
    keys.forEach((k) => dirty.current.add(k));
    setStatus('pending');
    clearTimeout(timer.current);
    timer.current = setTimeout(flush, SAVE_DELAY);
  }, [flush]);

  // Don't lose an edit made in the last few hundred ms before leaving.
  useEffect(() => {
    const onLeave = (ev) => {
      if (dirty.current.size === 0) return;
      flush();
      ev.preventDefault();
    };
    window.addEventListener('beforeunload', onLeave);
    return () => window.removeEventListener('beforeunload', onLeave);
  }, [flush]);

  const value = useMemo(() => ({
    draft,
    update,
    status,
    retry: flush,
    uri: page.uri,
    user,
    clicks,
    // Shape ProfileView expects.
    previewPage: { ...page, ...draft },
    previewUser: { ...user, image: draft.avatar },
  }), [draft, update, status, flush, page, user, clicks]);

  return <EditorContext.Provider value={value}>{children}</EditorContext.Provider>;
}

export function useEditor() {
  return useContext(EditorContext);
}
