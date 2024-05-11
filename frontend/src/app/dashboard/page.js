"use client"

import { useAuth } from "@/helpers/auth"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function Dashboard () {
    let router = useRouter()
    let { username, token } = useAuth()
    let [ sme, setSme ] = useState()

    // useEffect(() => {
    //     fetch("http://127.0.0.1:8000/api/smedata", {
    //         headers: {
    //             Authorization: `Bearer ${token}`
    //         }
    //     })
    // }, [])
    
    if (!username) router.push("/login")

    return (
        <h1>Dashboard</h1>
    )
}