import { model, models, Schema } from "mongoose";

const EventSchema = new Schema({
  type: String, // click or view
  page: { type: String, index: true }, // for example "dawid"
  uri: String, // /dawid | https://
}, { timestamps: true });

// Compound index for analytics queries (page + type + date)
EventSchema.index({ page: 1, type: 1, createdAt: -1 });

export const Event = models?.Event || model('Event', EventSchema);
