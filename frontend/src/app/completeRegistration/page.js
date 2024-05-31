"use client"

import SMEForm from "@/components/SMEForm/SMEForm"
import { formSchema } from "@/components/SMEForm/SMEFormSchema"
import { useAuth } from "@/helpers/auth"

import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"

export default function CompleteRegistration () {
    let { token } = useAuth()
    let router = useRouter()

    if (!token) router.push("/login")

    let form = useForm({ 
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: ""
        }
    })

    async function handleSubmit () {
        let { name, year, industry, address, cibil_score } = form.getValues()
        
        let res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/smereg`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                name, year, industry, address, cibil_score
            })
        })

        if (!res.ok) {
            alert("Error creating SME")
            return
        }

        router.push("/dashboard")
    }

    return (
        <div className="flex justify-center items-center h-[calc(100vh_-_96px)]">
            <div className="max-w-[700px] mb-10">
                <h1 className="text-xl font-semibold mb-6">Register your Small or Medium Scale Enterprise on our platform!</h1>
                <SMEForm submitText="Create SME" form={form} onSubmit={handleSubmit} />
            </div>
        </div>
    )
}