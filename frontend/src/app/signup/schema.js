"use client"

import { z } from "zod"

export const formSchema = z.object({
  email: z.string().min(1, { message: "Kindly enter your email"}).email(),
  password: z.string().min(1, { message: "Password is required"}).min(8, "Password too short")
})
