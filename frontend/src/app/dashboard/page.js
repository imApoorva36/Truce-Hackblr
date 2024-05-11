"use client"

import { useAuth } from "@/helpers/auth"
import { useRouter } from "next/navigation"

export default function Dashboard () {
    let router = useRouter()
    let { username } = useAuth()

    if (!username) router.push("/login")

    return (
        <h1>Dashboard</h1>
    )
}