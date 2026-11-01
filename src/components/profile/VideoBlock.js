'use client';
// Lite embeds: a thumbnail button that swaps itself for the real iframe on
// click, so no third-party player loads until a visitor asks for it.
import { useState } from 'react';
import { PiPlayFill } from 'react-icons/pi';
import { SiSpotify, SiTiktok, SiVimeo, SiYoutube } from 'react-icons/si';

const PLATFORM_ICON = { youtube: SiYoutube, vimeo: SiVimeo, spotify: SiSpotify, tiktok: SiTiktok };

function Media({ video }) {
  const [playing, setPlaying] = useState(false);
  const Icon = PLATFORM_ICON[video.platform] || PiPlayFill;
  const tall = video.platform === 'tiktok';
  const title = video.title || 'Play media';

  return (
    <figure className="ml-media" data-tall={tall || undefined}>
      <div className="ml-media-frame">
        {playing ? (
          <iframe
            src={video.url}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            allowFullScreen
          />
        ) : (
          <button type="button" className="ml-media-poster" onClick={() => setPlaying(true)} aria-label={`Play ${title}`}>
            {video.thumbnail ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={video.thumbnail} alt="" loading="lazy" />
            ) : (
              <Icon className="ml-media-brand" aria-hidden />
            )}
            <span className="ml-media-play"><PiPlayFill aria-hidden /></span>
          </button>
        )}
      </div>
      {video.title && <figcaption>{video.title}</figcaption>}
    </figure>
  );
}

export default function VideoBlock({ videos }) {
  return (
    <section className="ml-videos ml-anim" aria-label="Videos" data-count={videos.length > 1 ? 'many' : 'one'}>
      {videos.map((v) => <Media key={v.id || v.url} video={v} />)}
    </section>
  );
}
