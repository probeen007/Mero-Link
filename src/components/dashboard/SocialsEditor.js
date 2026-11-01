'use client';
import clsx from 'clsx';
import { PiXBold } from 'react-icons/pi';
import { SOCIALS, SOCIAL_MAP } from '@/libs/socials';
import { useEditor } from './EditorProvider';

export default function SocialsEditor() {
  const { draft, update } = useEditor();
  const buttons = draft.buttons;
  const active = Object.keys(buttons).filter((k) => SOCIAL_MAP[k]);

  const set = (next) => update({ buttons: next });
  const add = (key) => set({ ...buttons, [key]: '' });
  const remove = (key) => {
    const { [key]: _, ...rest } = buttons;
    set(rest);
  };

  return (
    <section aria-labelledby="socials-h">
      <h2 id="socials-h" className="font-display text-xl font-bold">Social icons</h2>
      <p className="mt-1 text-sm text-muted">Shown as a row of icons under your bio.</p>

      {active.length > 0 && (
        <ul className="mt-5 grid gap-2">
          {active.map((key) => {
            const { icon: Icon, label, placeholder, type } = SOCIAL_MAP[key];
            return (
              <li key={key} className="flex items-center gap-3 rounded-2xl border border-line bg-surface p-2 pl-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-surface-2"><Icon aria-hidden /></span>
                <input
                  className="min-w-0 flex-1 bg-transparent py-2 text-sm outline-none placeholder:text-muted/70"
                  type={type || 'url'}
                  value={buttons[key]}
                  onChange={(e) => set({ ...buttons, [key]: e.target.value })}
                  placeholder={placeholder}
                  aria-label={label}
                  autoFocus={buttons[key] === ''}
                />
                <button type="button" onClick={() => remove(key)} className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-muted hover:bg-surface-2 hover:text-ink" aria-label={`Remove ${label}`}>
                  <PiXBold aria-hidden />
                </button>
              </li>
            );
          })}
        </ul>
      )}

      <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Add a social icon">
        {SOCIALS.filter((s) => !(s.key in buttons)).map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            type="button"
            onClick={() => add(key)}
            title={`Add ${label}`}
            aria-label={`Add ${label}`}
            className={clsx('grid h-11 w-11 place-items-center rounded-full border border-line bg-surface text-muted transition',
              'hover:-translate-y-0.5 hover:border-ink hover:text-ink')}
          >
            <Icon className="h-[18px] w-[18px]" aria-hidden />
          </button>
        ))}
      </div>
    </section>
  );
}
