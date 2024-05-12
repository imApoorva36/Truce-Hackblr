'use client'

import { Button } from '@/components/ui/button'
import { CardTitle, CardHeader, CardContent, Card } from '@/components/ui/card'
import {
	TableHead,
	TableRow,
	TableHeader,
	TableCell,
	TableBody,
	Table
} from '@/components/ui/table'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { useEffect, useState } from 'react'
import { useAuth } from '@/helpers/auth'
import { TiTick } from 'react-icons/ti'
import { ImCross } from 'react-icons/im'
import { TiEye } from "react-icons/ti"
import { PieChart } from '@mui/x-charts/PieChart';
import { LoanStatus } from '@/components/LoanModal/LoanStatus'

export default function Dashboard() {
	let router = useRouter()
	let [ sme, setSme ] = useState(null)
	let [ loans, setLoans ] = useState([])
	let [ ring, setRing ] = useState(0)
	let [ loanOpen, setLoanOpen ] = useState(-1)

	let { token, username } = useAuth()

	if (!username) router.push("/login")
	else if (username == "admin@quickcredit.com") router.push("/adminDashboard");

	useEffect(() => {
		async function getSme() {
			let res = await fetch('http://127.0.0.1:8000/api/smedata', {
				headers: {
					Authorization: `Bearer ${token}`
				}
			})
			let data = await res.json()

			if (data.length != 0) {
				setSme(data[0])
				getLoans()
			}
		}

		async function getLoans () {
			let res = await fetch("http://127.0.0.1:8000/api/loan_status", {
				headers: {
					Authorization: `Bearer ${token}`
				}
			})

			if (!res.ok) {
				alert("Error fetching loans")
				return
			}

			let data = await res.json()
			setLoans(data)
		}

		getSme()
	}, [])

	useEffect(() => {
		if (!sme) return
		
		function setNext () {
			if (!sme) return

			let cibil = sme.cibil_score
			let endAngle = cibil * 360/850
			let difference = endAngle - ring

			if (!difference) return
			if (difference < 50) difference = 50

			setRing(Math.min((ring + difference/3), endAngle))
		}

		setTimeout(setNext, 100)
	}, [sme, ring])

	return (
		<>
		<div className="grid min-h-[calc(100vh_-_96px)] w-full grid-cols-1 gap-6 overflow-hidden bg-background md:grid-cols-[280px_1fr] md:gap-8 md:p-8">
			<div className="flex flex-col gap-6">
				<div className="flex flex-col gap-5 items-center justify-between rounded-lg bg-neutral-100 px-4 py-10 shadow-sm">
					<div className="flex items-center gap-3">
						<div
							className={`rounded-full ${
								sme ? 'bg-green-500 p-1' : 'bg-red-500 p-2'
							} text-white`}
						>
							{sme ? <TiTick size={20} /> : <ImCross size={14} />}
						</div>
						{sme ? (
							<div>
								<p className="text-sm text-background font-semibold">
									SME Registered
								</p>
								<p className="text-xs text-background">
									Your SME is already registered with us.
								</p>
							</div>
						) : (
							<div>
								<p className="text-sm text-background font-semibold">
									SME Not Registered
								</p>
								<p className="text-xs text-background">
									Register your SME now to apply for loans.
								</p>
							</div>
						)}
					</div>
					{sme ? (
						<Link href="/updateSME">
							<Button variant="outline">Update Details</Button>
						</Link>
					) : (
						<Link href="/completeRegistration">
							<Button variant="outline">Register SME</Button>
						</Link>
					)}
				</div>
				<div className="flex items-center justify-center rounded-lg bg-neutral-100 p-6 shadow-sm dark:bg-gray-800">
					<div className="relative h-[200px] w-[200px]">
						<PieChart
							series={[
								{
									data: [{value: 1}],
									innerRadius: 70,
									outerRadius: 90,
									cornerRadius: 2,
									startAngle: 0,
									endAngle: -ring,
									cx: 95,
									cy: 95,
								}
							]}
							width={200}
							height={200}
						/>
						<div className="absolute h-[200px] w-[200px] top-0 left-0 flex justify-center items-center flex-col text-background">
							<h1 className="text-4xl font-extrabold text-center">{sme ? sme.cibil_score : "?"}</h1>
							<h2 className="text-md font-medium text-center">CIBIL Score</h2>
						</div>
					</div>
				</div>
			</div>
			<div className="flex flex-col gap-6 text-center">
				<Card>
					<CardHeader className="flex justify-between items-center flex-row">
						<CardTitle>Loan Details</CardTitle>
						<Link href="/loans/create"><Button variant="outline" className="text-foreground">Apply for Loan</Button></Link>
					</CardHeader>
					<CardContent>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead className="text-center">Loan ID</TableHead>
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
					<LoanStatus loan={loans[loanOpen]} />
				</div>
			</div> 
			: null
		}
		</>
	)
}