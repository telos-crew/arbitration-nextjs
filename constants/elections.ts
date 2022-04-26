import { GET_TABLE_ROWS } from "./blockchain"
import { Election, Nominee } from '../types/blockchain';

const ARBITRATION_CONTRACT = process.env.ARBITRATION_CONTRACT

export const ELECTION_STATUS = [
	'Open',
	'Passed',
	'Failed',
	'Closed'
]

export const FETCH_ELECTIONS = async (): Promise<Election[]> => {
	const { rows } = await GET_TABLE_ROWS({
		code: ARBITRATION_CONTRACT,
		scope: ARBITRATION_CONTRACT,
		table: 'elections'
	})
	return rows
}

export const FETCH_NOMINEES = async (): Promise<Nominee[]> => {
	const { rows } = await GET_TABLE_ROWS({
		code: ARBITRATION_CONTRACT,
		scope: ARBITRATION_CONTRACT,
		table: 'nominees'
	})
	return rows
}