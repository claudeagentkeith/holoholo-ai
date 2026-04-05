import { z } from "zod";

const budgetTier = z.enum(["value", "balanced", "luxury"]);
const terrainPreference = z.enum(["beach", "mountain", "mixed"]);
const fitnessLevel = z.enum(["easy", "moderate", "active"]);
const diningStyle = z.enum(["casual", "mixed", "elevated"]);

export const previewRequestSchema = z.object({
  travelerName: z.string().min(2).max(100),
  travelerEmail: z.string().email(),
  travelerPhone: z.string().max(30).optional().or(z.literal("")),
  smsAlertsRequested: z.boolean().optional().default(false),
  arrivalDate: z.string().min(10),
  departureDate: z.string().min(10),
  groupSize: z.coerce.number().int().min(1).max(20),
  interests: z.array(z.string()).min(1),
  budgetTier,
  terrainPreference,
  fitnessLevel,
  diningStyle,
  specialRequests: z.string().max(1000).optional().or(z.literal(""))
});

export const tripRequestSchema = previewRequestSchema;

export const previewConversionSchema = z.object({
  previewPublicId: z.string().min(1)
});

export type PreviewRequestInput = z.infer<typeof previewRequestSchema>;
export type TripRequestInput = z.infer<typeof tripRequestSchema>;
export type PreviewConversionInput = z.infer<typeof previewConversionSchema>;
