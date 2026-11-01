'use client';
import clsx from 'clsx';
import { PiCheckBold, PiArrowCounterClockwiseBold, PiSparkleFill, PiListBold, PiSquaresFourBold, PiRowsBold } from 'react-icons/pi';
import { THEMES, THEME_KEYS, BUTTON_STYLES, RADII, GRADIENTS, getBgMode, normalizeThemeKey } from '@/libs/themes';
import { FONT_CHOICES } from '@/libs/fontChoices';
import ThemeThumb from '@/components/profile/ThemeThumb';
import { Button, Field, Segmented } from '@/components/ui';
import { useEditor } from './EditorProvider';

const ACCENTS = ['#111014', '#FF4D2E', '#FF4FA3', '#7C3AED', '#2563EB', '#00A3A3', '#16A34A', '#D4F55A', '#FFD23F', '#FFFFFF'];

function Group({ title, children, hint }) {
  return (
    <div className="grid gap-3 border-t border-line pt-6 first:border-t-0 first:pt-0">
      <div>
        <h3 className="font-semibold">{title}</h3>
        {hint && <p className="text-sm text-muted">{hint}</p>}
      </div>
      {children}
    </div>
  );
}

function Chip({ active, onClick, children, className, style, label }) {
  return (
    <button type="button" onClick={onClick} aria-pressed={active} aria-label={label} style={style}
      className={clsx('inline-flex h-10 items-center justify-center gap-1.5 rounded-full border px-4 text-sm font-medium transition',
        active ? 'border-ink bg-ink text-bg' : 'border-line bg-surface hover:border-ink/40', className)}>
      {children}
    </button>
  );
}

function Swatch({ color, active, onClick, label }) {
  return (
    <button type="button" onClick={onClick} aria-label={label} aria-pressed={active}
      className={clsx('grid h-9 w-9 place-items-center rounded-full border transition hover:scale-110', active ? 'ring-2 ring-ink ring-offset-2 ring-offset-bg' : 'border-line')}
      style={{ background: color }}>
      {active && <PiCheckBold className="mix-blend-difference text-white" aria-hidden />}
    </button>
  );
}

export default function AppearanceEditor({ welcome }) {
  const { draft, update, previewPage, previewUser, uri } = useEditor();
  const current = normalizeThemeKey(draft.theme);
  const o = draft.themeOverrides || {};
  const bgMode = getBgMode(draft);
  const setO = (patch) => update({ themeOverrides: { ...o, ...patch } });
  const clearO = (key) => {
    const { [key]: _, ...rest } = o;
    update({ themeOverrides: rest });
  };

  const pickTheme = (key) => update({ theme: key, themeOverrides: {}, bgMode: 'theme' });

  return (
    <div className="grid gap-10">
      {welcome && (
        <div className="flex items-start gap-3 rounded-card bg-lime p-5 text-on-sticker">
          <PiSparkleFill className="mt-0.5 h-5 w-5 shrink-0" aria-hidden />
          <div>
            <p className="font-display text-lg font-bold">Your link is live. Now pick a look.</p>
            <p className="text-sm">Choose a theme below, then head to Links to add what you want to share.</p>
          </div>
        </div>
      )}

      <section aria-labelledby="themes-h">
        <h1 id="themes-h" className="font-display text-3xl font-extrabold tracking-tight">Appearance</h1>
        <p className="mt-1 text-sm text-muted">Every theme below is your own page. Hover to see it move.</p>

        <div className="mt-6 grid grid-cols-[repeat(auto-fill,140px)] justify-between gap-x-3 gap-y-5 max-sm:justify-center">
          {THEME_KEYS.map((key) => {
            const active = key === current;
            return (
              <button key={key} type="button" onClick={() => pickTheme(key)} aria-pressed={active}
                className={clsx('group text-left', active && 'is-active')}>
                <div className={clsx('overflow-hidden rounded-[20px] border-2 transition',
                  active ? 'border-ink shadow-sticker' : 'border-transparent group-hover:-translate-y-1 group-hover:border-line')}>
                  <ThemeThumb page={{ ...previewPage, theme: key, themeOverrides: {}, bgMode: 'theme' }} user={previewUser} uri={uri} scale={0.36} />
                </div>
                <p className="mt-2 flex items-center gap-1.5 text-sm font-semibold">
                  {THEMES[key].name} {active && <PiCheckBold className="text-accent-text" aria-label="Selected" />}
                </p>
              </button>
            );
          })}
        </div>
      </section>

      <section aria-labelledby="custom-h" className="rounded-card border border-line bg-surface p-5 sm:p-6">
        <div className="mb-6 flex items-center justify-between gap-3">
          <div>
            <h2 id="custom-h" className="font-display text-xl font-bold">Make it yours</h2>
            <p className="text-sm text-muted">Tweaks sit on top of {THEMES[current].name}.</p>
          </div>
          <Button variant="ghost" size="sm" onClick={() => update({ themeOverrides: {}, bgMode: 'theme' })}>
            <PiArrowCounterClockwiseBold aria-hidden /> Reset
          </Button>
        </div>

        <div className="grid gap-6">
          <Group title="Background">
            <Segmented label="Background type" value={bgMode} onChange={(v) => update({ bgMode: v })}
              options={[{ value: 'theme', label: 'Theme' }, { value: 'color', label: 'Color' }, { value: 'gradient', label: 'Gradient' }, { value: 'image', label: 'Image' }]} />
            {bgMode === 'color' && (
              <div className="flex items-center gap-3">
                <input type="color" value={/^#[0-9a-f]{6}$/i.test(draft.bgColor) ? draft.bgColor : '#111014'}
                  onChange={(e) => update({ bgColor: e.target.value })} className="h-11 w-14 cursor-pointer rounded-xl border border-line bg-surface p-1" aria-label="Background color" />
                <span className="font-mono text-sm text-muted">{draft.bgColor}</span>
              </div>
            )}
            {bgMode === 'gradient' && (
              <div className="flex flex-wrap gap-2">
                {Object.entries(GRADIENTS).map(([key, g]) => (
                  <button key={key} type="button" onClick={() => setO({ gradient: key })} aria-pressed={o.gradient === key} aria-label={g.label}
                    className={clsx('h-12 w-20 rounded-2xl border-2 transition hover:scale-105', o.gradient === key ? 'border-ink' : 'border-transparent')}
                    style={{ background: g.css }} />
                ))}
              </div>
            )}
            {bgMode === 'image' && (
              <Field htmlFor="bg-image" hint="Paste a direct link to a JPG, PNG or WebP. We darken it so text stays readable.">
                <input id="bg-image" className="field" value={draft.bgImage} onChange={(e) => update({ bgImage: e.target.value.trim() })} placeholder="https://..." inputMode="url" />
              </Field>
            )}
          </Group>

          <Group title="Button color">
            <div className="flex flex-wrap items-center gap-2">
              <Chip active={!o.accent} onClick={() => clearO('accent')}>Theme</Chip>
              {ACCENTS.map((c) => <Swatch key={c} color={c} active={o.accent === c} onClick={() => setO({ accent: c })} label={`Use ${c}`} />)}
              <label className="relative grid h-9 w-9 cursor-pointer place-items-center overflow-hidden rounded-full border border-dashed border-ink/40 text-xs font-bold" title="Custom color">
                +
                <input type="color" className="absolute inset-0 cursor-pointer opacity-0" value={o.accent || '#FF4D2E'} onChange={(e) => setO({ accent: e.target.value })} aria-label="Custom button color" />
              </label>
            </div>
          </Group>

          <Group title="Button style">
            <div className="flex flex-wrap gap-2">
              <Chip active={!o.button} onClick={() => clearO('button')}>Theme</Chip>
              {Object.entries(BUTTON_STYLES).map(([key, label]) => (
                <Chip key={key} active={o.button === key} onClick={() => setO({ button: key })}>{label}</Chip>
              ))}
            </div>
          </Group>

          <Group title="Corners">
            <div className="flex flex-wrap gap-2">
              <Chip active={!o.radius} onClick={() => clearO('radius')}>Theme</Chip>
              {Object.entries(RADII).map(([key, r]) => (
                <Chip key={key} active={o.radius === key} onClick={() => setO({ radius: key })} className="capitalize">
                  <span className="h-4 w-6 border-2 border-current" style={{ borderRadius: Math.min(r, 8) }} aria-hidden /> {key}
                </Chip>
              ))}
            </div>
          </Group>

          <Group title="Font">
            <div className="flex flex-wrap gap-2">
              <Chip active={!o.font} onClick={() => clearO('font')}>Theme</Chip>
              {Object.entries(FONT_CHOICES).map(([key, f]) => (
                <Chip key={key} active={o.font === key} onClick={() => setO({ font: key })} style={{ fontFamily: f.stack }}>{f.label}</Chip>
              ))}
            </div>
          </Group>

          <Group title="Link layout">
            <Segmented label="Link layout" value={draft.linkStyle} onChange={(v) => update({ linkStyle: v })}
              options={[{ value: 'list', label: 'List', icon: PiListBold }, { value: 'grid', label: 'Grid', icon: PiSquaresFourBold }, { value: 'compact', label: 'Compact', icon: PiRowsBold }]} />
          </Group>
        </div>
      </section>
    </div>
  );
}
