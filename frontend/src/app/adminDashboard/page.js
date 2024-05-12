"use client"

import { useAuth } from "@/helpers/auth"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { CardTitle, CardHeader, CardContent, Card } from '@/components/ui/card'
import {
	TableHead,
	TableRow,
	TableHeader,
	TableCell,
	TableBody,
	Table
} from '@/components/ui/table'

import { Badge } from '@/components/ui/badge'
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { TiEye } from "react-icons/ti"
import { AdminLoanStatus } from "@/components/LoanModal/AdminLoanStatus"

export default function Admin () {
    let router = useRouter()
    let { username, token } = useAuth()
	let [ loans, setLoans ] = useState([])
	let [ loanOpen, setLoanOpen ] = useState(-1)

	if (!username) router.push("/login")
    else if (username != "admin@quickcredit.com") router.push("/dashboard");

    useEffect(() => {
		async function getLoans () {
			let res = await fetch("http://127.0.0.1:8000/api/bank", {
				headers: {
					Authorization: `Bearer ${token}`
				}
			})

			if (!res.ok) {
				alert("Error fetching loans")
				return
			}

			let data = await res.json()
			setLoans(data.toReversed())
		}

		getLoans()
	}, [])

	return (
		<>
		<div className="min-h-[calc(100vh_-_96px)] w-full overflow-hidden bg-background p-8">
			<div className="flex flex-col gap-6 text-center">
				<Card>
					<CardHeader className="flex justify-between items-center flex-row">
						<CardTitle>Loan Details</CardTitle>
					</CardHeader>
					<CardContent>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead className="text-center">Loan ID</TableHead>
									<TableHead className="text-center">Enterprise Name</TableHead>
									<TableHead className="text-center">Amount</TableHead>
									<TableHead className="text-center">Status</TableHead>
									<TableHead className="text-center">Submitted On</TableHead>
									<TableHead className="text-center">Action</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{loans.map((d,i) => (
								<TableRow>
									<TableCell className="font-mediun text-background">
										#{d.loan_application_id}
									</TableCell>
									<TableCell className="font-mediun text-background">
										{d.name}
									</TableCell>
									<TableCell>₹{d.loan_amount}</TableCell>
									<TableCell>
										<Badge variant="success">
											{d.status}
										</Badge>
									</TableCell>
									<TableCell>{d.created_at}</TableCell>
									<TableCell>
										<Button
											size="icon"
											className="bg-neutral-100 border-background border hover:bg-neutral-200"
											onClick = {() => setLoanOpen(i)}
										>
											<TiEye size={20} />
										</Button>
									</TableCell>
								</TableRow>
								))}
							</TableBody>
						</Table>
					</CardContent>
				</Card>
			</div>
		</div>
		{
			loanOpen >= 0 ? 
			<div className="h-screen w-full bg-black/80 flex justify-center items-center fixed top-0 left-0 z-50" onClick={() => setLoanOpen(-1)}>
				<div className="bg-white text-secondary rounded-lg shadow max-h-[80vh] overflow-scroll p-10" onClick={e => e.stopPropagation()}>
					<AdminLoanStatus loan={loans[loanOpen]} />
				</div>
			</div> 
			: null
		}
		</>
	)
}