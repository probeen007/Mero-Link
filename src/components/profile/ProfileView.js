// The one renderer for a profile page. Used by the public page, the dashboard
// live preview, the marketing hero and the /themes gallery. No hooks, so it
// renders on the server; interactivity is limited to the VideoBlock island.
import './profile.css';
import Image from 'next/image';
import { PiSealCheckFill, PiMapPinBold, PiArrowUpRightBold } from 'react-icons/pi';
import { resolveTheme } from '@/libs/themes';
import { SOCIAL_MAP, socialHref } from '@/libs/socials';
import { Backdrop, Overlay } from './Effects';
import VideoBlock from './VideoBlock';

export default function ProfileView({ page, user, preview = false, uri }) {
  const { attrs, style } = resolveTheme(page);
  const name = page?.displayName || user?.name || (uri ? `@${uri}` : '');
  const avatar = user?.image || '/icon-192x192.png';
  const socials = Object.entries(page?.buttons || {}).filter(([k, v]) => SOCIAL_MAP[k] && v);
  const blocks = (page?.links || []).filter((l) => !l.hidden && (l.type === 'header' ? l.title : /^https?:\/\/\S+\.\S/.test(l.url || '')));
  const videos = (page?.videos || []).filter((v) => v?.url);
  const layout = ['grid', 'compact'].includes(page?.linkStyle) ? page.linkStyle : 'list';
  const videoBlock = videos.length > 0 ? <VideoBlock videos={videos} /> : null;
  const videosFirst = page?.videoPosition !== 'after';
  let i = 0;

  return (
    <div className="ml-profile" data-layout={layout} data-preview={preview || undefined} {...attrs} style={style}>
      <div className="ml-bg" aria-hidden>
        <Backdrop effect={attrs['data-effect']} />
      </div>

      <div className="ml-inner">
        <header className="ml-head">
          <div className="ml-avatar ml-anim" style={{ '--i': i++ }}>
            <Image src={avatar} alt={name ? `${name} profile photo` : 'Profile photo'} width={208} height={208} priority={!preview} />
          </div>
          {name && (
            <h1 className="ml-name ml-anim" style={{ '--i': i++ }}>
              <span>{name}</span>
              {user?.isVerified && <PiSealCheckFill className="ml-verified" aria-label="Verified" />}
            </h1>
          )}
          {page?.location && (
            <p className="ml-loc ml-anim" style={{ '--i': i++ }}>
              <PiMapPinBold aria-hidden /> {page.location}
            </p>
          )}
          {page?.bio && <p className="ml-bio ml-anim" style={{ '--i': i++ }}>{page.bio}</p>}
          {socials.length > 0 && (
            <ul className="ml-socials ml-anim" style={{ '--i': i++ }}>
              {socials.map(([key, value]) => {
                const { icon: Icon, label } = SOCIAL_MAP[key];
                return (
                  <li key={key}>
                    <a className="ml-social" href={socialHref(key, value)} target="_blank" rel="noopener noreferrer me" aria-label={label} data-track>
                      <Icon aria-hidden />
                    </a>
                  </li>
                );
              })}
            </ul>
          )}
        </header>

        {videosFirst && videoBlock}

        {blocks.length > 0 ? (
          <ul className="ml-links">
            {blocks.map((b) =>
              b.type === 'header' ? (
                <li key={b.key} className="ml-section ml-anim" style={{ '--i': i++ }}>
                  <h2>{b.title}</h2>
                </li>
              ) : (
                <li key={b.key} className="ml-anim" data-featured={b.featured || undefined} style={{ '--i': i++ }}>
                  <a className="ml-btn" href={b.url} target="_blank" rel="noopener noreferrer" data-track data-featured={b.featured || undefined}>
                    {b.icon ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img className="ml-thumb" src={b.icon} alt="" loading="lazy" width={40} height={40} />
                    ) : (
                      <span className="ml-thumb ml-thumb-empty" aria-hidden />
                    )}
                    <span className="ml-btn-text">
                      <span className="ml-btn-title">{b.title || b.url.replace(/^https?:\/\/(www\.)?/, '')}</span>
                      {b.subtitle && <span className="ml-btn-sub">{b.subtitle}</span>}
                    </span>
                    <PiArrowUpRightBold className="ml-arrow" aria-hidden />
                  </a>
                </li>
              ),
            )}
          </ul>
        ) : preview ? (
          <p className="ml-empty">Your links will show up here.</p>
        ) : null}

        {!videosFirst && videoBlock}

        <footer className="ml-foot">
          <a className="ml-made" href={`/?ref=${encodeURIComponent(uri || 'profile')}`}>
            <span className="ml-made-mark">m</span> Made with Mero Link
          </a>
        </footer>
      </div>

      <div className="ml-overlay" aria-hidden>
        <Overlay effect={attrs['data-effect']} />
      </div>
    </div>
  );
}
