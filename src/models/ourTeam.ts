import { model, Schema } from "mongoose";
import { OutTeam } from "../types/types";

const OurTeamSchema = new Schema<OutTeam>({
    name: {
        type: String,
        required: [true, "name is required"],
    },
    role: {
        type: String,
        required: [true, "role is required"],
    },
    image: {
        type: String,
        required: [true, "image is required"],
    },
})

const OurTeam = model<OutTeam>("OurTeam", OurTeamSchema);

export default OurTeam