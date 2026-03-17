import { model, models, Schema } from "mongoose";

const ProjectSchema = new Schema(
  {
    owner: { type: String, required: true, index: true },
  },
  {
    timestamps: true,
    strict: false,
  }
);

export const Project = models?.Project || model("Project", ProjectSchema);
