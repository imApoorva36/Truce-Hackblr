"use client"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { formSchema } from "./LoanFormSchema"
import { FormLabel } from "@mui/material"
import { Switch } from "@/components/ui/switch"
import { useAuth } from "@/helpers/auth"
import { useRouter } from "next/navigation"
import { Textarea } from "../ui/textarea"

export default function LoanForm () {
    let router = useRouter()
    let { token } = useAuth()

    if (!token) router.push("/login")

    let form = useForm({ 
        resolver: zodResolver(formSchema),
        defaultValues: {
            no_of_dependents: 0,
            self_employed: false
        }
    })

    async function onSubmit () {
        let res = await fetch("http://localhost:8000/api/auto_stage", {
            method: "POST",
            body: JSON.stringify({
                ...form.getValues()
            }),
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        if (!res.ok) {
            alert("You are not eligible for this loan because your CIBIL Score is too low.")
            return
        }

        router.push("/dashboard")
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-10 mx-auto max-w-[1100px]">
                <div className="flex mb-5">
                    <div className="flex flex-col gap-4 w-1/2 px-10 py-3 border-r-2 border-neutral-500 border-dashed">
                        <h1 className="text-3xl font-bold mb-3">Personal Details</h1>
                        <FormField
                            control={form.control}
                            name="no_of_dependents"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder="Number of Dependents" type="number" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="income_annum"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder="Annual Income" type="number" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="residential_assets_value"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder="Residential assets value" type="number" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="commercial_assets_value"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder="Commercial assets value" type="number" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="luxury_assets_value"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder="Luxury assets value" type="number" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="bank_asset_value"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder="Bank assets value" type="number" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="self_employed"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                    <FormLabel className="text-base text-foreground">
                                        Self-Employed
                                    </FormLabel>
                                    <FormControl>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="flex flex-col gap-4 w-1/2 px-10 py-3">
                        <h1 className="text-3xl font-bold mb-3">Loan Details</h1>
                        <FormField
                            control={form.control}
                            name="loan_amount"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder="Loan Amount" type="number" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="loan_term"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder="Loan Term" type="number" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="business_plan"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Write a short note on your Business Plan..."
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                    </div>


                </div>

                <Button type="submit" className="w-full h-10 mt-2 mx-10 font-bold text-base">Submit Loan Application</Button>
            </form>
        </Form>
    )
}