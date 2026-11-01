'use client';
import { useState } from 'react';
import clsx from 'clsx';
import { ReactSortable } from 'react-sortablejs';
import {
  PiPlusBold, PiTextHBold, PiDotsSixVerticalBold, PiStarBold, PiStarFill, PiTrashBold,
  PiImageBold, PiCursorClickBold, PiLinkSimpleBold, PiCaretDownBold, PiArrowUpBold, PiArrowDownBold,
} from 'react-icons/pi';
import { Button, Switch, EmptyState } from '@/components/ui';
import { useEditor } from './EditorProvider';
import SocialsEditor from './SocialsEditor';
import VideosEditor from './VideosEditor';

const newKey = () => `l-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;

function normalized(url) {
  try { return new URL(url).href; } catch { return url; }
}

// Keyboard and screen-reader alternative to drag-and-drop.
function MoveButtons({ onMove, first, last, label }) {
  return (
    <span className="inline-flex">
      <button type="button" onClick={() => onMove(-1)} disabled={first} aria-label={`Move ${label} up`}
        className="grid h-8 w-8 place-items-center rounded-full text-muted hover:bg-surface-2 hover:text-ink disabled:opacity-30">
        <PiArrowUpBold aria-hidden />
      </button>
      <button type="button" onClick={() => onMove(1)} disabled={last} aria-label={`Move ${label} down`}
        className="grid h-8 w-8 place-items-center rounded-full text-muted hover:bg-surface-2 hover:text-ink disabled:opacity-30">
        <PiArrowDownBold aria-hidden />
      </button>
    </span>
  );
}

function LinkCard({ link, onChange, onRemove, onMove, first, last, clicks, autoFocus }) {
  const [open, setOpen] = useState(!!(link.icon || link.subtitle));
  const urlInvalid = link.url && !/^https?:\/\/\S+\.\S/.test(link.url);

  return (
    <div className={clsx('group flex gap-2 rounded-card border bg-surface p-3 pr-4 transition-shadow hover:shadow-lift sm:gap-3', link.hidden ? 'border-dashed border-line opacity-70' : 'border-line')}>
      <button type="button" className="handle mt-1 grid h-9 w-6 shrink-0 cursor-grab place-items-center text-muted active:cursor-grabbing" aria-hidden tabIndex={-1}>
        <PiDotsSixVerticalBold className="h-5 w-5" aria-hidden />
      </button>

      <div className="min-w-0 flex-1">
        <input
          value={link.title}
          onChange={(e) => onChange({ title: e.target.value })}
          placeholder="Title"
          aria-label="Link title"
          className="w-full rounded-md bg-transparent px-1 py-1 font-semibold outline-none placeholder:text-muted/70 focus:bg-surface-2"
        />
        <input
          value={link.url}
          onChange={(e) => onChange({ url: e.target.value.trim() })}
          placeholder="https://"
          aria-label="Link URL"
          aria-invalid={urlInvalid || undefined}
          autoFocus={autoFocus}
          inputMode="url"
          className={clsx('w-full rounded-md bg-transparent px-1 py-1 text-sm outline-none placeholder:text-muted/70 focus:bg-surface-2', urlInvalid ? 'text-red-600 dark:text-red-400' : 'text-muted')}
        />
        {urlInvalid && <p className="px-1 text-xs text-red-600 dark:text-red-400">Start with https:// so visitors can open it.</p>}

        {open && (
          <div className="mt-2 grid gap-2 border-t border-line pt-3 sm:grid-cols-2">
            <input className="field !py-2 text-sm" value={link.subtitle || ''} onChange={(e) => onChange({ subtitle: e.target.value })} placeholder="Subtitle (optional)" aria-label="Subtitle" />
            <input className="field !py-2 text-sm" value={link.icon || ''} onChange={(e) => onChange({ icon: e.target.value.trim() })} placeholder="Thumbnail image URL" aria-label="Thumbnail image URL" inputMode="url" />
          </div>
        )}

        <div className="mt-2 flex flex-wrap items-center gap-1">
          <button type="button" onClick={() => onChange({ featured: !link.featured })}
            className={clsx('inline-flex h-8 items-center gap-1.5 rounded-full px-2.5 text-xs font-semibold transition-colors', link.featured ? 'bg-butter text-on-sticker' : 'text-muted hover:bg-surface-2')}
            aria-pressed={!!link.featured}>
            {link.featured ? <PiStarFill aria-hidden /> : <PiStarBold aria-hidden />} Feature
          </button>
          <button type="button" onClick={() => setOpen(!open)} className="inline-flex h-8 items-center gap-1.5 rounded-full px-2.5 text-xs font-semibold text-muted hover:bg-surface-2" aria-expanded={open}>
            <PiImageBold aria-hidden /> Details <PiCaretDownBold className={clsx('transition-transform', open && 'rotate-180')} aria-hidden />
          </button>
          <span className="inline-flex h-8 items-center gap-1.5 px-2.5 font-mono text-xs text-muted" title="All-time clicks">
            <PiCursorClickBold aria-hidden /> {clicks}
          </span>
          <span className="ml-auto" />
          <MoveButtons onMove={onMove} first={first} last={last} label={link.title || 'link'} />
          <button type="button" onClick={onRemove} className="grid h-8 w-8 place-items-center rounded-full text-muted hover:bg-red-500/10 hover:text-red-600" aria-label="Delete link">
            <PiTrashBold aria-hidden />
          </button>
        </div>
      </div>

      <Switch checked={!link.hidden} onChange={(on) => onChange({ hidden: !on })} label={link.hidden ? 'Show link' : 'Hide link'} className="mt-1.5" />
    </div>
  );
}

function HeaderCard({ link, onChange, onRemove, onMove, first, last, autoFocus }) {
  return (
    <div className="flex items-center gap-2 rounded-card border border-line bg-surface-2 p-3 pr-4 sm:gap-3">
      <button type="button" className="handle grid h-9 w-6 shrink-0 cursor-grab place-items-center text-muted" aria-hidden tabIndex={-1}>
        <PiDotsSixVerticalBold className="h-5 w-5" aria-hidden />
      </button>
      <PiTextHBold className="shrink-0 text-muted" aria-hidden />
      <input
        value={link.title}
        onChange={(e) => onChange({ title: e.target.value })}
        placeholder="Section title"
        aria-label="Section title"
        autoFocus={autoFocus}
        className="min-w-0 flex-1 rounded-md bg-transparent px-1 py-1 font-display font-bold outline-none focus:bg-surface"
      />
      <MoveButtons onMove={onMove} first={first} last={last} label={link.title || 'section'} />
      <button type="button" onClick={onRemove} className="grid h-8 w-8 place-items-center rounded-full text-muted hover:bg-red-500/10 hover:text-red-600" aria-label="Delete section">
        <PiTrashBold aria-hidden />
      </button>
      <Switch checked={!link.hidden} onChange={(on) => onChange({ hidden: !on })} label="Visible" />
    </div>
  );
}

export default function LinksEditor() {
  const { draft, update, clicks } = useEditor();
  const [fresh, setFresh] = useState(null);
  const links = draft.links;

  const setLinks = (next) => update({ links: next });
  const add = (type) => {
    const key = newKey();
    setFresh(key);
    setLinks([{ key, type, title: '', url: '', subtitle: '', icon: '', hidden: false, featured: false }, ...links]);
  };
  const change = (key, patch) => setLinks(links.map((l) => (l.key === key ? { ...l, ...patch } : l)));
  const remove = (key) => setLinks(links.filter((l) => l.key !== key));
  const move = (i, dir) => {
    const next = [...links];
    [next[i], next[i + dir]] = [next[i + dir], next[i]];
    setLinks(next);
  };

  return (
    <div className="grid gap-10">
      <section aria-labelledby="links-h">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 id="links-h" className="font-display text-3xl font-extrabold tracking-tight">Links</h1>
            <p className="mt-1 text-sm text-muted">Drag to reorder. Changes save automatically.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" onClick={() => add('header')}><PiTextHBold aria-hidden /> Section</Button>
            <Button onClick={() => add('link')}><PiPlusBold aria-hidden /> Add link</Button>
          </div>
        </div>

        <div className="mt-6">
          {links.length === 0 ? (
            <EmptyState icon={PiLinkSimpleBold} title="Add your first link" action={<Button onClick={() => add('link')}><PiPlusBold aria-hidden /> Add link</Button>}>
              Your shop, latest video, portfolio, booking page. Anything with a URL.
            </EmptyState>
          ) : (
            <ReactSortable list={links} setList={(next) => {
              // Sortable calls setList on mount with an identical order; only save real moves.
              if (next.some((l, i) => l.key !== links[i]?.key)) setLinks(next.map(({ chosen, selected, ...l }) => l));
            }} handle=".handle" animation={180} className="grid gap-3">
              {links.map((l, i) => (
                <div key={l.key}>
                  {l.type === 'header' ? (
                    <HeaderCard link={l} onChange={(p) => change(l.key, p)} onRemove={() => remove(l.key)} onMove={(d) => move(i, d)} first={i === 0} last={i === links.length - 1} autoFocus={fresh === l.key} />
                  ) : (
                    <LinkCard link={l} onChange={(p) => change(l.key, p)} onRemove={() => remove(l.key)} onMove={(d) => move(i, d)} first={i === 0} last={i === links.length - 1} clicks={clicks[normalized(l.url)] || 0} autoFocus={fresh === l.key} />
                  )}
                </div>
              ))}
            </ReactSortable>
          )}
        </div>
      </section>

      <SocialsEditor />
      <VideosEditor />
    </div>
  );
}
