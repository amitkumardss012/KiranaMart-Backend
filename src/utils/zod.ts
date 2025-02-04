import z, { optional } from "zod";

export const applyFranchiseSchema = z.object({
  firstname: z
    .string({ required_error: "First name is required" })
    .min(3, "First name must be at least 3 characters")
    .max(20, "First name must be at most 20 characters")
    .trim(),
  lastname: z
    .string()
    .min(3, "Last name must be at least 3 characters")
    .max(20, "Last name must be at most 20 characters")
    .trim()
    .optional(),
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email")
    .trim(),
  phone: z
    .string({ required_error: "Phone number is required" })
    .min(10, "Phone number must be at least 10 characters")
    .max(10, "Phone number must be at most 10 characters")
    .trim(),
  address1: z
    .string({ required_error: "Address is required" })
    .min(10, "Address must be at least 10 characters")
    .max(500, "Address must be at most 500 characters")
    .trim(),
  address2: z.string().trim(),
  state: z
    .string({ required_error: "State is required" })
    .min(3, "State must be at least 3 characters")
    .max(30, "State must be at most 100 characters")
    .trim(),
  pincode: z
    .string({ required_error: "Pincode is required" })
    .min(6, "Pincode must be at least 6 characters")
    .max(6, "Pincode must be at most 6 characters")
    .trim(),
});

export type ApplyFranchiseType = z.infer<typeof applyFranchiseSchema>;

export const adminSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email")
    .trim(),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password must be at most 20 characters")
    .trim(),
});

export type AdminType = z.infer<typeof adminSchema>;

export const OurTeamValidationSchema = z.object({
  name: z
    .string({ required_error: "name is required" })
    .trim()
    .refine((name) => name.length > 0, "name is required"),
  role: z
    .string({ required_error: "role is required" })
    .trim()
    .refine((role) => role.length > 0, "role is required"),
});

export type OutTeamType = z.infer<typeof OurTeamValidationSchema>;
