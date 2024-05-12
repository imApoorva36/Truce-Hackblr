"use client"

import { Inter } from 'next/font/google'
import './globals.css'
import { AuthContextProvider, useAuth } from '@/helpers/auth'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

function RootLayout({ children }) {
	let router = useRouter()
	let { logout, token } = useAuth()
	
	return (
		<html lang="en">
			<body className={`${inter.className} mt-24`}>
				<div className=" fixed w-full h-20 top-0 left-0 flex justify-between items-center px-10 shadow-foreground shadow-sm bg-background z-40">
					<Link href="/">
						<h1 className='text-3xl font-bold'>QuickCredit</h1>
					</Link>
					<div className="flex gap-5">
						{token ?
							<>
								<Button className="h-8 px-10 font-bold" onClick={() => router.push("/dashboard")}>Dashboard</Button>
								<Button className="h-8 px-10 font-bold" onClick={logout}>Logout</Button>
							</>
							:
							<>
								<Button className="h-8 px-10 font-bold" onClick={() => router.push("/login")}>Login</Button>
								<Button className="h-8 px-10 font-bold" onClick={() => router.push("/signup")}>Sign Up</Button>
							</>
						}
					</div>
				</div>
				{children}
			</body>
		</html>
	)
}


export default function RootLayoutMain ({ children }) {
	return (
		<AuthContextProvider>
			<RootLayout>
				{children}
			</RootLayout>
		</AuthContextProvider>
	)
}

