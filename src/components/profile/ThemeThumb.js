import ProfileView from './ProfileView';

// A full ProfileView rendered at phone size and scaled down. `scale` must match
// the rendered width: width = 390 * scale.
export default function ThemeThumb({ page, user, uri, scale = 0.4, className = '' }) {
  return (
    <div
      className={`ml-still relative overflow-hidden ${className}`}
      style={{ width: 390 * scale, height: 700 * scale }}
      aria-hidden
      inert
    >
      <div className="absolute left-0 top-0 h-[700px] w-[390px] origin-top-left overflow-hidden" style={{ transform: `scale(${scale})` }}>
        <ProfileView page={page} user={user} uri={uri} preview />
      </div>
    </div>
  );
}
