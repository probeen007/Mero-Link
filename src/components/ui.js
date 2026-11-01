// Brand UI primitives used across the marketing site and dashboard.
// Plain components with no hooks, so they work in server and client trees.
import Link from 'next/link';
import clsx from 'clsx';

const BUTTON_VARIANTS = {
  primary: 'bg-accent text-accent-ink sticker',
  ink: 'bg-ink text-bg hover:bg-ink/85',
  secondary: 'bg-surface text-ink border border-line hover:border-ink/40',
  ghost: 'text-ink hover:bg-ink/5',
  danger: 'text-red-600 hover:bg-red-500/10 dark:text-red-400',
};

const BUTTON_SIZES = {
  sm: 'h-9 px-3.5 text-sm gap-1.5',
  md: 'h-11 px-5 text-[15px] gap-2',
  lg: 'h-14 px-7 text-base gap-2.5',
  icon: 'h-9 w-9 justify-center',
};

export function Button({ href, variant = 'primary', size = 'md', className, children, ...props }) {
  const cls = clsx(
    'inline-flex items-center justify-center whitespace-nowrap rounded-full font-semibold transition-colors',
    'disabled:opacity-50 disabled:pointer-events-none',
    BUTTON_VARIANTS[variant],
    BUTTON_SIZES[size],
    className,
  );
  if (href) {
    // Downloads, mailto: and external URLs bypass the client router.
    const Tag = href.startsWith('/') && !props.download && !props.target ? Link : 'a';
    return <Tag href={href} className={cls} {...props}>{children}</Tag>;
  }
  return <button type="button" className={cls} {...props}>{children}</button>;
}

export function Field({ label, htmlFor, hint, error, children, className }) {
  return (
    <div className={clsx('grid gap-1.5', className)}>
      {label && <label htmlFor={htmlFor} className="text-sm font-medium text-ink">{label}</label>}
      {children}
      {error ? (
        <p className="text-[13px] text-red-600 dark:text-red-400" role="alert">{error}</p>
      ) : hint ? (
        <p className="text-[13px] text-muted">{hint}</p>
      ) : null}
    </div>
  );
}

export function Switch({ checked, onChange, label, className }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={clsx(
        'relative inline-flex h-6 w-10 shrink-0 items-center rounded-full transition-colors',
        checked ? 'bg-ink' : 'bg-line',
        className,
      )}
    >
      <span
        className={clsx(
          'inline-block h-[18px] w-[18px] rounded-full bg-surface shadow transition-transform',
          checked ? 'translate-x-[19px]' : 'translate-x-[3px]',
        )}
      />
    </button>
  );
}

// Segmented control: options = [{ value, label, icon? }]
export function Segmented({ value, onChange, options, className, label }) {
  return (
    <div role="radiogroup" aria-label={label} className={clsx('inline-flex flex-wrap gap-1 rounded-full bg-surface-2 p-1', className)}>
      {options.map((o) => {
        const active = o.value === value;
        const Icon = o.icon;
        return (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(o.value)}
            className={clsx(
              'inline-flex h-8 items-center gap-1.5 rounded-full px-3.5 text-sm font-medium transition-colors',
              active ? 'bg-surface text-ink shadow-sm' : 'text-muted hover:text-ink',
            )}
          >
            {Icon && <Icon className="h-4 w-4" aria-hidden />}
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

export function Card({ className, children, ...props }) {
  return (
    <div className={clsx('rounded-card border border-line bg-surface', className)} {...props}>
      {children}
    </div>
  );
}

export function Badge({ tone = 'neutral', className, children }) {
  const tones = {
    neutral: 'bg-surface-2 text-muted',
    accent: 'bg-accent/15 text-accent-text',
    lime: 'bg-lime text-on-sticker',
  };
  return (
    <span className={clsx('inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold', tones[tone], className)}>
      {children}
    </span>
  );
}

export function Skeleton({ className }) {
  return <div className={clsx('animate-pulse rounded-field bg-surface-2', className)} aria-hidden />;
}

export function EmptyState({ icon: Icon, title, children, action }) {
  return (
    <div className="flex flex-col items-center rounded-card border border-dashed border-line px-6 py-12 text-center">
      {Icon && (
        <span className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-butter text-on-sticker">
          <Icon className="h-6 w-6" aria-hidden />
        </span>
      )}
      <h3 className="font-display text-lg font-bold">{title}</h3>
      {children && <p className="mt-1 max-w-sm text-sm text-muted">{children}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export function Logo({ className, compact = false }) {
  return (
    <span className={clsx('inline-flex items-center gap-2 font-display text-xl font-extrabold tracking-tight', className)}>
      <span className="grid h-8 w-8 place-items-center rounded-[10px] border-2 border-ink bg-accent text-on-sticker shadow-sticker-sm">
        <span className="text-base leading-none">m</span>
      </span>
      {compact ? <span className="sr-only">Mero Link</span> : 'mero link'}
    </span>
  );
}
