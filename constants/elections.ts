import { GET_TABLE_ROWS } from "./blockchain"
import { Election } from '../types/blockchain';

const ARBITRATION_CONTRACT = process.env.ARBITRATION_CONTRACT

export const FETCH_ELECTIONS = async (): Promise<Election[]> => {
	console.log('ARBITRATION_CONTRACT', ARBITRATION_CONTRACT)
	const { rows } = await GET_TABLE_ROWS({
		code: ARBITRATION_CONTRACT,
		scope: ARBITRATION_CONTRACT,
		table: 'elections'
	})
	return rows
}

export const ELECTION_STATUS = [
	'Open',
	'Passed',
	'Failed',
	'Closed'
]