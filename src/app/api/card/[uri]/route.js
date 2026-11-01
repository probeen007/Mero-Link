import Image from '@/app/(page)/[uri]/opengraph-image';

// Stable download URL for a profile's share card (the OG image route itself
// gets a build-hashed path).
export async function GET(_req, { params }) {
  return Image({ params });
}
