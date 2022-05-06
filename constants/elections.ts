import { GET_TABLE_ROWS } from "./blockchain"
import { Election, Nominee } from '../types/blockchain';

const ARBITRATION_CONTRACT = process.env.ARBITRATION_CONTRACT

export const ELECTION_STATUS = [
	'',
	'Created',
	'Live',
	'Ended'
]

export const FETCH_ELECTIONS = async (): Promise<Election[]> => {
	const { rows } = await GET_TABLE_ROWS({
		code: ARBITRATION_CONTRACT,
		scope: ARBITRATION_CONTRACT,
		table: 'elections',
		reverse: true
	})
	return rows
}

export const FETCH_NOMINEES = async (): Promise<Nominee[]> => {
	const { rows } = await GET_TABLE_ROWS({
		code: ARBITRATION_CONTRACT,
		scope: ARBITRATION_CONTRACT,
		table: 'nominees',
		reverse: true
	})
	return rows
}

export const STRING_TO_LOCALE_TIME = (string: string): Date => new Date(string).toLocaleString()