'use client';
import { useState } from 'react';
import { ReactSortable } from 'react-sortablejs';
import { PiPlusBold, PiTrashBold, PiDotsSixVerticalBold, PiPlayFill } from 'react-icons/pi';
import { extractVideoInfo, getThumbnailUrl } from '@/libs/videoExtractor';
import { Button, Field, Segmented } from '@/components/ui';
import { useEditor } from './EditorProvider';

export default function VideosEditor() {
  const { draft, update } = useEditor();
  const videos = draft.videos;
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const [adding, setAdding] = useState(false);

  async function add(ev) {
    ev.preventDefault();
    const info = extractVideoInfo(url);
    if (!info) return setError('Paste a YouTube, Vimeo, Spotify or TikTok link.');
    if (videos.some((v) => v.videoId === info.videoId)) return setError('Already added.');
    if (videos.length >= 10) return setError('You can add up to 10.');
    setAdding(true);
    const thumbnail = await getThumbnailUrl(info).catch(() => '');
    update({
      videos: [...videos, {
        id: `vid_${Date.now().toString(36)}`, url: info.embedUrl, title: '', platform: info.platform,
        videoId: info.videoId, thumbnail: thumbnail || '',
      }],
    });
    setUrl('');
    setError('');
    setAdding(false);
  }

  const change = (id, patch) => update({ videos: videos.map((v) => (v.id === id ? { ...v, ...patch } : v)) });

  return (
    <section aria-labelledby="videos-h">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 id="videos-h" className="font-display text-xl font-bold">Videos and music</h2>
          <p className="mt-1 text-sm text-muted">Visitors play them right on your page.</p>
        </div>
        {videos.length > 0 && (
          <Segmented
            label="Video position"
            value={draft.videoPosition}
            onChange={(v) => update({ videoPosition: v })}
            options={[{ value: 'before', label: 'Above links' }, { value: 'after', label: 'Below links' }]}
          />
        )}
      </div>

      <form onSubmit={add} className="mt-5">
        <Field htmlFor="video-url" error={error}>
          <div className="flex gap-2">
            <input id="video-url" className="field" value={url} onChange={(e) => { setUrl(e.target.value); setError(''); }}
              placeholder="Paste a YouTube, Vimeo, Spotify or TikTok link" inputMode="url" aria-label="Media link" />
            <Button type="submit" variant="ink" disabled={!url || adding} className="shrink-0"><PiPlusBold aria-hidden /> Add</Button>
          </div>
        </Field>
      </form>

      {videos.length > 0 && (
        <ReactSortable list={videos} setList={(next) => {
          if (next.some((v, i) => v.id !== videos[i]?.id)) update({ videos: next.map(({ chosen, selected, ...v }) => v) });
        }} handle=".handle" animation={180} className="mt-4 grid gap-2">
          {videos.map((v) => (
            <div key={v.id} className="flex items-center gap-3 rounded-2xl border border-line bg-surface p-2 pr-3">
              <button type="button" className="handle grid h-9 w-6 cursor-grab place-items-center text-muted" aria-label="Drag to reorder">
                <PiDotsSixVerticalBold className="h-5 w-5" aria-hidden />
              </button>
              <div className="grid h-12 w-20 shrink-0 place-items-center overflow-hidden rounded-xl bg-surface-2">
                {v.thumbnail
                  // eslint-disable-next-line @next/next/no-img-element
                  ? <img src={v.thumbnail} alt="" className="h-full w-full object-cover" />
                  : <PiPlayFill className="text-muted" aria-hidden />}
              </div>
              <div className="min-w-0 flex-1">
                <input value={v.title} onChange={(e) => change(v.id, { title: e.target.value })} placeholder="Add a title"
                  aria-label="Video title" className="w-full rounded-md bg-transparent px-1 py-1 text-sm font-semibold outline-none focus:bg-surface-2" />
                <p className="px-1 text-xs capitalize text-muted">{v.platform}</p>
              </div>
              <button type="button" onClick={() => update({ videos: videos.filter((x) => x.id !== v.id) })}
                className="grid h-9 w-9 place-items-center rounded-full text-muted hover:bg-red-500/10 hover:text-red-600" aria-label="Remove video">
                <PiTrashBold aria-hidden />
              </button>
            </div>
          ))}
        </ReactSortable>
      )}
    </section>
  );
}
