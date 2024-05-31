"use client"

import { useAuth } from "@/helpers/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { formSchema } from "./schema"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function Login () {
    let router = useRouter()
    let { login, username } = useAuth()

    if (username) router.push("/dashboard")

    let form = useForm({ 
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    
    async function onSubmit (e) {
        let { email, password } = form.getValues()

        let res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/token/`, {
            method: "POST",
            body: JSON.stringify({ username: email, password }),
            headers: {
                'Content-Type': "application/json"
            }
        })

        if (!res.ok) {
            alert("Wrong email or password")
            return
        }
        
        let { access } = await res.json()
        login(email, access)
    }

    return (
        <main className="h-[calc(100vh_-_96px)] flex flex-col items-center justify-center pb-10">
            <h1 className="text-2xl font-bold mb-4">Login</h1>

            <div className="max-w-64">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 mb-3">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder="Email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder="Password" type="password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full h-10 mt-2">Submit</Button>
                    </form>
                </Form>
                <p>Don't have an account? <Link href={"/signup"} className="underline">Sign up!</Link></p>
            </div>
        </main>
    )
}