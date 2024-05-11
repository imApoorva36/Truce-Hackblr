import { z } from "zod"

export const formSchema = z.object({
    no_of_dependents: z.coerce.number({ invalid_type_error: "Enter number of dependents" }).min(0, { message: "Enter valid number"}),
    income_annum: z.coerce.number({ invalid_type_error: "Enter yearly income" }).min(1, { message: "Enter valid income"}),
    residential_assets_value: z.coerce.number({ invalid_type_error: "Enter residential assets value" }).min(0, { message: "Enter valid value"}),
    commercial_assets_value: z.coerce.number({ invalid_type_error: "Enter commercial assets value" }).min(0, { message: "Enter valid value"}),
    luxury_assets_value: z.coerce.number({ invalid_type_error: "Enter luxury assets value" }).min(0, { message: "Enter valid value"}),
    bank_assets_value: z.coerce.number({ invalid_type_error: "Enter bank assets value" }).min(0, { message: "Enter valid value"}),
    self_employed: z.boolean().default(false).optional(),

    loan_amount: z.coerce.number({ invalid_type_error: "Enter loan ammount" }).min(1, { message: "Enter valid amount"}),
    loan_term: z.coerce.number({ invalid_type_error: "Enter loan term" }).min(1, { message: "Enter valid number"})
})
