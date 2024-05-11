"use client"

import { useAuth } from "@/helpers/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { formSchema } from "@/components/SMEForm/SMEFormSchema"
import SMEForm from "@/components/SMEForm/SMEForm"

export default function UpdateSme () {
    let router = useRouter()
    let { token } = useAuth()

    if (!token) router.push("/login")

    let form = useForm({ 
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: ""
        }
    })

    useEffect(() => {
		async function getSme() {
			let res = await fetch('http://127.0.0.1:8000/api/smedata', {
				headers: {
					Authorization: `Bearer ${token}`
				}
			})
			let data = await res.json()

			if (data.length != 0) {
				let { name, year, industry, address, cibil_score } = data[0]
                form.setValue("name", name)
                form.setValue("year", year)
                form.setValue("industry", industry)
                form.setValue("address", address)
                form.setValue("cibil_score", cibil_score)
			}
		}

        getSme()
    }, [])

    async function handleSubmit () {
        let { name, year, industry, address, cibil_score } = form.getValues()
        
        let res = await fetch("http://localhost:8000/api/smeupdate", {
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
            alert("Error updating SME")
            return
        }

        router.push("/dashboard")
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="max-w-[700px] mb-10">
                <h1 className="text-xl font-semibold mb-6">Update the details of your Small or Medium Scale Enterprise</h1>
                <SMEForm submitText="Update Details" form={form} onSubmit={handleSubmit} />
            </div>
        </div>
    )
}