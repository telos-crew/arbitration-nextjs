import { GET_TABLE_ROWS } from "./"
import { Claim } from "../types"

const NEXT_PUBLIC_ARBITRATION_CONTRACT = process.env.NEXT_PUBLIC_ARBITRATION_CONTRACT

export const DECISION_CLASS_LIST = [
	'',
	'Undecided',
	'Lost Key Recovery',
	'Transaction Reversal',
	'Emergency Intervention',
	'Contested Ownership',
	'Unexecuted Relief',
	'Contract Breach',
	'Misused CR IP',
	'A Tort',
	'BP Penalty Reversal',
	'Wrongful Arbitration Act',
	'Act Exec Relief',
	'Works Project Failure',
	'TBNOA Breach',
	'Misc'
]

export const FETCH_CLAIMS = async (case_id: number): Promise<Claim[]> => {
	const { rows } = await GET_TABLE_ROWS({
		code: NEXT_PUBLIC_ARBITRATION_CONTRACT,
		scope: case_id,
		table: 'claims'
	})
	return rows
}