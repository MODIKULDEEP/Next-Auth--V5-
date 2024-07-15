"use server";
import * as z from "zod";
import bcrypt from "bcrypt";
import { RegisterSchema } from "@/schemas";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validateFiels = RegisterSchema.safeParse(values);

  if (!validateFiels.success) {
    return { error: "Invalid fields" };
  }

  const { email, password, name } = validateFiels.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  const exsitingUser = await getUserByEmail(email);

  if (exsitingUser) {
    return { error: "Email already in use!" };
  }

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  // TODO: Send Verification Email Logic

  return { success: "User Created" };
};
