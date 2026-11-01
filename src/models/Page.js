import { model, models, Schema } from "mongoose";

// `theme` is validated against THEMES in the save path (libs/themes.js), and
// legacy keys from the old 36-theme set are mapped on read, so no enum here.
const PageSchema = new Schema(
  {
    uri: { type: String, required: true, min: 1, unique: true, index: true },
    owner: { type: String, required: true, index: true },
    displayName: { type: String, default: "" },
    location: { type: String, default: "" },
    bio: { type: String, default: "" },
    theme: { type: String, default: "sticker" },
    themeOverrides: { type: Object, default: {} },
    // theme | color | gradient | image. Older pages use bgType/adaptBackground.
    bgMode: { type: String },
    bgType: { type: String, default: "color" },
    bgColor: { type: String, default: "#000" },
    bgImage: { type: String, default: "" },
    adaptBackground: { type: Boolean, default: false },
    buttons: { type: Object, default: {} },
    // [{ key, type: 'link'|'header', title, subtitle, icon, url, featured, hidden }]
    links: { type: Object, default: [] },
    videos: {
      type: [
        {
          id: { type: String, required: true },
          title: { type: String, default: "" },
          url: { type: String, required: true },
          thumbnail: { type: String, default: "" },
          platform: { type: String, enum: ['youtube', 'vimeo', 'spotify', 'tiktok', 'other'], default: 'youtube' },
          videoId: { type: String, default: "" },
          order: { type: Number, default: 0 }
        }
      ],
      default: []
    },
    videoPosition: { type: String, enum: ['before', 'after'], default: 'before' },
    linkStyle: { type: String, enum: ['list', 'grid', 'compact'], default: 'list' },
  },
  { timestamps: true }
);

PageSchema.index({ owner: 1, createdAt: -1 });

if (process.env.NODE_ENV === 'development' && models.Page) {
  delete models.Page;
}

export const Page = models?.Page || model("Page", PageSchema);
