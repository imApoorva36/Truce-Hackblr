import { z } from "zod"

export const formSchema = z.object({
  name: z.string().min(1, { message: "Enter name of enterprise"}),
  year: z.coerce.number({ invalid_type_error: "Enter year of establishment" }).min(1900, { message: "Enter valid year"}).max((new Date()).getFullYear(), { message: "Enter valid year"}),
  industry: z.string().optional(),
  address: z.string().optional(),
  cibil_score: z.coerce.number({ invalid_type_error: "Enter CIBIL Score"}).min(0, { message: "Enter valid CIBIL Score" }).max(850, { message: "Enter valid CIBIL Score" }).optional()
})
