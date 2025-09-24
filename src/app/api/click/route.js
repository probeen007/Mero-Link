import { Event } from '@/models/Event';
import mongoose from 'mongoose';

export async function POST(req) {
  await mongoose.connect(process.env.MONGO_URI);
  const url = new URL(req.url);
  const encoded = url.searchParams.get('url');
  const clickedLink = encoded ? Buffer.from(encoded, 'base64').toString('utf8') : '';
  const page = url.searchParams.get('page');
  await Event.create({ type: 'click', uri: clickedLink, page });
  return Response.json(true);
}