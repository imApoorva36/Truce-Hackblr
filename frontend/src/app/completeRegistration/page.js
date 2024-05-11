"use client"

import SMEForm from "@/components/SMEForm/SMEForm"
import { formSchema } from "@/components/SMEForm/SMEFormSchema"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

export default function CompleteRegistration () {
    let form = useForm({ 
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: ""
        }
    })

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="max-w-[700px] mb-10">
                <h1 className="text-xl font-semibold mb-6">Register your Small or Medium Scale Enterprise on our platform!</h1>
                <SMEForm submitText="Create SME" form={form} />
            </div>
        </div>
    )
}