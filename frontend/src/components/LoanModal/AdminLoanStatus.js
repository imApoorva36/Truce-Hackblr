"use client"

import { TiTick } from "react-icons/ti"
import { ImCross } from "react-icons/im"
import { FaQuestion } from "react-icons/fa";
import { useEffect, useState } from "react"
import { PieChart } from '@mui/x-charts/PieChart';
import LoanCharts from "./LoanCharts"
import { Button } from "../ui/button"
import { useAuth } from "@/helpers/auth"

export function AdminLoanStatus({ loan }) {
	let [ ring, setRing ] = useState(0)
  let { token } = useAuth()

  useEffect(() => {
		function setNext () {
			let prob = loan.repay_prob
			let endAngle = prob * 360
			let difference = endAngle - ring

			if (!difference) return
			if (difference < 50) difference = 50

			setRing(Math.min((ring + difference/3), endAngle))
		}

		setTimeout(setNext, 100)
	}, [ring])


  async function accept () {
    let res = await fetch("http://localhost:8000/api/bank/approve/"+loan.loan_application_id, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (res.ok) window.location.reload()
    else alert("An error occured")
  }

  async function reject () {
    let res = await fetch("http://localhost:8000/api/bank/deny/"+loan.loan_application_id, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (res.ok) window.location.reload()
    else alert("An error occured")
  }


  let titleText
  let stage2
  let stage3

  if (loan.status == "ml_approved") {
    titleText = "Pending"
    stage2 = <TiTick size={20} />
    stage3 = <FaQuestion />
  } else if (loan.status == "ml_rejected") {
    titleText = "Rejected"
    stage2 = <ImCross size={14} />
    stage3 = <ImCross size={14} />
  } else if (loan.status == "approved") {
    titleText = "Accepted!"
    stage2 = <TiTick size={20} />
    stage3 = <TiTick size={20} />
  } else if (loan.status == "rejected") {
    titleText = "Rejected"
    stage2 = <TiTick size={20} />
    stage3 = <ImCross size={14} />
  } else {
    titleText = "Pending"
    stage2 = <FaQuestion />
    stage3 = <FaQuestion />
  }

  return (
    (<div className="flex flex-col gap-8 w-full max-w-4xl mx-auto">
      <h1 className="text-lg font-semibold">Loan #{loan.loan_application_id}: Loan Application {titleText}</h1>
      <div className="flex items-start justify-center gap-8">
        <div className="flex flex-col items-center gap-2 relative w-60">
          <div className="bg-gray-100 rounded-full p-3 dark:bg-gray-800">
            <TiTick size={20} />
          </div>
          <div className="text-center">
            <h3 className="text-lg font-medium">Stage 1</h3>
          </div>
          <div
            className="absolute left-44 top-6 w-36 h-[4px] bg-gray-500" />
        </div>
        <div className="flex flex-col items-center gap-2 relative w-60">
          <div className="bg-gray-100 rounded-full p-3 dark:bg-gray-800">
            {stage2}
          </div>
          <div className="text-center">
            <h3 className="text-lg font-medium">Stage 2</h3>
          </div>
          <div
            className="absolute left-44 top-6 w-36 h-[4px] bg-gray-500 dark:bg-gray-600" />
        </div>
        <div className="flex flex-col items-center gap-2 relative w-60">
          <div className="bg-gray-100 rounded-full p-3 dark:bg-gray-800">
            {stage3}
          </div>
          <div className="text-center">
            <h3 className="text-lg font-medium">Stage 3</h3>
          </div>
        </div>
      </div>

      <div className="border p-5 border-neutral-600 rounded-lg flex justify-center gap-10">
          <div className="w-[500px]">
            <h1 className="text-lg font-semibold mb-3">Repayment Probability</h1>
            <p>An AI-Calculated estimated probability that the loan will be successfully repayed. This is for reference purposes.</p>
          </div>
          <div className="relative h-[150px] w-[150px]">
            <PieChart
                series={[
                  {
                    data: [{value: 1}],
                    innerRadius: 50,
                    outerRadius: 70,
                    cornerRadius: 2,
                    startAngle: 0,
                    endAngle: -ring,
                    cx: 75,
                    cy: 75,
                  }
                ]}
                width={150}
                height={150}
              />
              <div className="absolute h-[150px] w-[150px] top-0 left-0 flex justify-center items-center flex-col text-background">
                <h1 className="text-2xl font-bold text-center">{loan.repay_prob}</h1>
                <h2 className="text-sm font-medium text-center">Your Score</h2>
              </div>
          </div>
      </div>
      {loan.business_plan_evaluation ? 
        <>
          <h1 className="text-xl font-bold">Business Proposal Analysis</h1>
          <LoanCharts business_plan_evaluation={loan.business_plan_evaluation}/>
        </> 
        : null
      }

      { loan.status == "ml_approved" ?
        <div className="flex justify-end gap-4">
          <Button className="text-foreground bg-green-700 hover:bg-green-700/90" onClick={accept}>Approve</Button>
          <Button className="text-foreground bg-red-700 hover:bg-red-700/90" onClick={reject}>Reject</Button>
        </div>
        : null
      }
    </div>)
  );
}

