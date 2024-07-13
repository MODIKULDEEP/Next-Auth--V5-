"use server";
import * as z from "zod";
import { RegisterSchema } from "@/schemas";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validateFiels = RegisterSchema.safeParse(values);
  if (!validateFiels.success) return { error: "Invalid fields" };
  return { success: "Email Sent" };
};
