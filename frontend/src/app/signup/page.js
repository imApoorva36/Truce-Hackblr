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

export default function Signup () {
    let form = useForm({ 
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: null,
            password: null
        }
    })

    let { login, username, token } = useAuth()


    console.log("From comp: ", username, token)
    async function onSubmit (e) {
        let { email, password } = form.getValues()
        
        let res = await fetch("http://localhost:8000/api/register/", {
            method: "POST",
            body: JSON.stringify({ email, password })
        })

        if (!res.ok) {
            alert("Error signing up")
            return
        }

        res = await fetch("http://localhost:8000/api/token/", {
            method: "POST",
            body: JSON.stringify({ username: email, password }),
            headers: {
                'Content-Type': "application/json"
            }
        })
        
        let { access } = await res.json()
        login(email, access)
    }

    return (
        <main className="h-screen flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold mb-4">Sign Up</h1>

            <div className="max-w-64">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-center gap-4 mb-10">
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
            </div>
        </main>
    )
}