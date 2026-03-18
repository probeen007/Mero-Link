// models/Page.js
import { model, models, Schema } from "mongoose";

// Define theme enum values separately for reuse
const THEME_VALUES = [
  "default", "aurora", "neon", "light", "starfield",
  "gamer", "coder", "hacker", "elegant", "funky", 
  "feminine", "retro", "nature", "corporate", "cosmic",
  "nepal", "minecraft", "adventure", "anime", "cartoon",
  "galaxy", "ocean", "forest", "egyptian", "sakura",
  "viking", "cyberpunk", "medieval", "tropical", "artdeco",
  "rainycity", "desertdune", "arcticglass", "volcanicforge", "emeraldlake", "sunsetcliff"
];

const PageSchema = new Schema(
  {
    uri: { type: String, required: true, min: 1, unique: true },
    owner: { type: String, required: true },
    displayName: { type: String, default: "" },
    location: { type: String, default: "" },
    bio: { type: String, default: "" },
    bgType: { type: String, default: "color" },
    bgColor: { type: String, default: "#000" },
    bgImage: { type: String, default: "" },
    adaptBackground: { type: Boolean, default: false },
    buttons: { type: Object, default: {} },
    links: { type: Object, default: [] },
    theme: {
      type: String,
      enum: THEME_VALUES,
      default: "default",
      validate: {
        validator: function(v) {
          return THEME_VALUES.includes(v);
        },
        message: props => `${props.value} is not a valid theme. Valid themes are: ${THEME_VALUES.join(', ')}`
      }
    },
  },
  { timestamps: true }
);

// Export theme values for use in other files
export { THEME_VALUES };

// Clear any existing model to force re-compilation in development
if (process.env.NODE_ENV === 'development' && models.Page) {
  delete models.Page;
}

export const Page = models?.Page || model("Page", PageSchema);


