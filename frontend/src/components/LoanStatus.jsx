import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { ResponsiveBar } from "@nivo/bar"
import { ResponsivePie } from "@nivo/pie"
import { ResponsiveLine } from "@nivo/line"
import { ResponsiveHeatMap } from "@nivo/heatmap"
import { Button } from "@/components/ui/button"

export function LoanStatus({ loan }) {
  return (
    (<div className="flex flex-col gap-8 w-full max-w-4xl mx-auto">
      <h1 className="text-lg font-semibold">Loan #{loan.id}</h1>
      <div className="flex items-start justify-center gap-8">
        <div className="flex flex-col items-center gap-2 relative w-60">
          <div className="bg-gray-100 rounded-full p-3 dark:bg-gray-800">
            <CheckIcon className="w-6 h-6 text-green-500" />
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
            <CheckIcon className="w-6 h-6 text-green-500" />
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
            <CheckIcon className="w-6 h-6 text-green-500" />
          </div>
          <div className="text-center">
            <h3 className="text-lg font-medium">Stage 3</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Final Approval
            </p>
          </div>
        </div>
      </div>
    </div>)
  );
}

