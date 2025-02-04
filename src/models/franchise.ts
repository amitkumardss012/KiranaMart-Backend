import { model, Schema } from "mongoose";
import { ApplyFranchiseType } from "../utils/zod";

const FranchiseSchema = new Schema<ApplyFranchiseType>({
  firstname: { type: String, required: true },
  lastname: { type: String, required: false },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  address1: { type: String, required: true },
  address2: { type: String, required: false },
  state: { type: String, required: true },
  pincode: { type: String, required: true },
}, {timestamps: true});


const Franchise = model<ApplyFranchiseType>("Franchise", FranchiseSchema);

export default Franchise;