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
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { useEffect, useState } from 'react'
import { useAuth } from '@/helpers/auth'
import { TiTick } from 'react-icons/ti'
import { ImCross } from 'react-icons/im'
import { TiEye } from "react-icons/ti"
import { useRouter } from 'next/navigation'

export default function Dashboard() {
	let router = useRouter()
	let [ sme, setSme ] = useState(null)
	let [ loans, setLoans ] = useState([])

	let { token } = useAuth()

	if (!token) router.push("/login")

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
			// let res = await fetch("http://127.0.0.1:8000/api/smedata")
		}

		getSme()
	}, [])

	return (
		<div className="grid min-h-screen w-full grid-cols-1 gap-6 overflow-hidden bg-background md:grid-cols-[280px_1fr] md:gap-8 md:p-8">
			<div className="flex flex-col gap-6">
				<div className="flex flex-col gap-5 items-center justify-between rounded-lg bg-neutral-100 px-4 py-10 shadow-sm dark:bg-gray-800">
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
									Register now to apply for loans.
								</p>
							</div>
						)}
					</div>
					{sme ? (
						<Link href="/">
							<Button variant="outline">Update Details</Button>
						</Link>
					) : (
						<Link href="/completeRegistration">
							<Button variant="outline">Register SME</Button>
						</Link>
					)}
				</div>
				<div className="flex flex-col items-center justify-center rounded-lg bg-neutral-100 p-6 shadow-sm dark:bg-gray-800">
					<div className="relative h-[200px] w-[200px]">
						<div className="absolute inset-0 flex flex-col items-center justify-center">
							<p className="text-4xl text-background font-bold">
								800
							</p>
							<p className="text-sm text-background dark:text-gray-400">
								CIBIL Score
							</p>
						</div>
					</div>
				</div>
			</div>
			<div className="flex flex-col gap-6">
				<Card>
					<CardHeader className="flex justify-between items-center flex-row">
						<CardTitle>Loan Details</CardTitle>
						<Button variant="secondary">Apply for Loan</Button>
					</CardHeader>
					<CardContent>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Loan ID</TableHead>
									<TableHead>Amount</TableHead>
									<TableHead>Status</TableHead>
									<TableHead>Submitted On</TableHead>
									<TableHead>Action</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								<TableRow>
									<TableCell>
										<Link
											className="font-medium text-background"
											href="#"
										>
											#12345
										</Link>
									</TableCell>
									<TableCell>₹50,000</TableCell>
									<TableCell>
										<Badge variant="success">
											Approved
										</Badge>
									</TableCell>
									<TableCell>2023-04-15</TableCell>
									<TableCell>
										<Button
											size="icon"
											className="bg-neutral-100 border-background border hover:bg-neutral-200"
										>
											<TiEye size={20} />
											<span className="sr-only">
												View
											</span>
										</Button>
									</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</CardContent>
				</Card>
			</div>
		</div>
	)
}