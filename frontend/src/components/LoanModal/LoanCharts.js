'use client'
import s from "./loancharts.module.css"

export default function LoanCharts({ business_plan_evaluation: b }) {
	return (
		<div className={`flex gap-20 flex-wrap justify-center ${s.charts}`}>
			<div>
				<div
					className="radial-progress"
					style={{ '--value': b.market_analysis_rating }}
					role="progressbar"
				>
					{b.market_analysis_rating}%
				</div>
                <h2>Market Analysis Rating</h2>
			</div>
			<div>
				<div
					className="radial-progress"
					style={{ '--value': b.business_model_rating }}
					role="progressbar"
				>
					{b.business_model_rating}%
				</div>
                <h2>Business Model Rating</h2>
			</div>
			<div>
				<div
					className="radial-progress"
					style={{ '--value': b.financial_projections_rating }}
					role="progressbar"
				>
					{b.financial_projections_rating}%
				</div>
                <h2>Financial Projections Rating</h2>
			</div>
			<div>
				<div
					className="radial-progress"
					style={{ '--value': b.management_team_rating }}
					role="progressbar"
				>
					{b.management_team_rating}%
				</div>
                <h2>Managemenet Team Rating</h2>
			</div>
			<div>
				<div
					className="radial-progress"
					style={{ '--value': b.risk_assessment_rating }}
					role="progressbar"
				>
					{b.risk_assessment_rating}%
				</div>
                <h2>Risk Assessment Rating</h2>
			</div>
			<div>
				<div
					className="radial-progress"
					style={{ '--value': b.overall_score }}
					role="progressbar"
				>
					{b.overall_score}%
				</div>
                <h2>Overall Score</h2>
			</div>
		</div>
	)
}
