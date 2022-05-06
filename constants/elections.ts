import { GET_TABLE_ROWS } from "./blockchain"
import { Election, Nominee, Arbitrator } from '../types/blockchain';

const NEXT_PUBLIC_ARBITRATION_CONTRACT = process.env.NEXT_PUBLIC_ARBITRATION_CONTRACT

export const ELECTION_STATUS = [
	'',
	'Created',
	'Live',
	'Ended'
]

export const FETCH_ELECTIONS = async (): Promise<Election[]> => {
	const { rows } = await GET_TABLE_ROWS({
		code: NEXT_PUBLIC_ARBITRATION_CONTRACT,
		scope: NEXT_PUBLIC_ARBITRATION_CONTRACT,
		table: 'elections',
		reverse: true
	})
	return rows
}

export const FETCH_NOMINEES = async (): Promise<Nominee[]> => {
	const { rows } = await GET_TABLE_ROWS({
		code: NEXT_PUBLIC_ARBITRATION_CONTRACT,
		scope: NEXT_PUBLIC_ARBITRATION_CONTRACT,
		table: 'nominees',
		reverse: true
	})
	return rows
}

export const FETCH_ARBITRATORS = async (): Promise<Arbitrator[]> => {
	const { rows } = await GET_TABLE_ROWS({
		code: NEXT_PUBLIC_ARBITRATION_CONTRACT,
		scope: NEXT_PUBLIC_ARBITRATION_CONTRACT,
		table: 'arbitrators'
	})
	return rows
}

export const STRING_TO_LOCALE_TIME = (string: string): Date => new Date(string).toLocaleString()