"use client"

import { TiTick } from "react-icons/ti"
import { ImCross } from "react-icons/im"
import { FaQuestion } from "react-icons/fa";
import { useEffect, useState } from "react"
import { PieChart } from '@mui/x-charts/PieChart';

export function LoanStatus({ loan }) {
	let [ ring, setRing ] = useState(0)

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
    stage2 = <ImCross size={14} />
    stage3 = <ImCross size={14} />
  } else {
    titleText = "Pending"
    stage2 = <FaQuestion />
    stage3 = <FaQuestion />
  }

  return (
    (<div className="flex flex-col gap-8 w-full max-w-4xl mx-auto">
      <h1 className="text-lg font-semibold">Loan #{loan.id}: Loan Application {titleText}</h1>
      <div className="flex items-start justify-center gap-8">
        <div className="flex flex-col items-center gap-2 relative w-60">
          <div className="bg-gray-100 rounded-full p-3 dark:bg-gray-800">
            <TiTick size={20} />
          </div>
          <div className="text-center">
            <h3 className="text-lg font-medium">Stage 1</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              CIBIL Score Verification
            </p>
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
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              AI-Powered Loan Application Validation
            </p>
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
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Final Approval
            </p>
          </div>
        </div>
      </div>

      <div className="border p-5 border-neutral-600 rounded-lg flex justify-center gap-10">
          <div className="w-[500px]">
            <h1 className="text-lg font-semibold mb-3">AI-Powered Verification</h1>
            <p>We use Machine Learning to verify and rate your loan application based on the data you have provided.</p>
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
    </div>)
  );
}

