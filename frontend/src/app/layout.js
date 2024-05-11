"use client"

import { Inter } from 'next/font/google'
import './globals.css'
import { AuthContextProvider, useAuth } from '@/helpers/auth'
import { Button } from '@/components/ui/button'

const inter = Inter({ subsets: ['latin'] })

function RootLayout({ children }) {
	let { logout } = useAuth()
	
	return (
		<html lang="en">
			<body className={inter.className}>
				<Button className="absolute right-5 top-5" onClick={logout}>Logout</Button>
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

