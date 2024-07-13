"use server";
import * as z from "zod";
import { LoginSchema } from "@/schemas";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validateFiels = LoginSchema.safeParse(values);
  if (!validateFiels.success) return { error: "Invalid fields" };
  return { success: "Email Sent" };
};
