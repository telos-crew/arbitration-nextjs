import { GET_TABLE_ROWS } from "./";

const NEXT_PUBLIC_ARBITRATION_CONTRACT = process.env.NEXT_PUBLIC_ARBITRATION_CONTRACT

export const CASE_STATUS = {
	0: 'Case Setup',			// 0
	1: 'Awaiting Arbs',		// 1
	2: 'Case Investigation', // 2
	3: 'Hearing',			// 3
	4: 'Deliberation',		// 4
	5: 'Decision',			// 5 NOTE: No more joinders allowed
	6: 'Enforcement',		// 6
	7: 'Resolved',			// 7
	8: 'Dismissed'			// 8 NOTE: Dismissed cases advance and stop here	
}

export const CASE_STATUS_LIST = [
	'Case Setup',			// 0
	'Awaiting Arbs',		// 1
	'Case Investigation', // 2
	'Hearing',			// 3
	'Deliberation',		// 4
	'Decision',			// 5 NOTNo more joinders allowed
	'Enforcement',		// 6
	'Resolved',			// 7
	'Dismissed'			// 8 NOTE: Dismissed cases advance and stop here	
]

export const FETCH_CASE_FILES = async (case_id?: number): Promise<any> => {
	const { rows } = await GET_TABLE_ROWS({
		code: NEXT_PUBLIC_ARBITRATION_CONTRACT,
		scope: NEXT_PUBLIC_ARBITRATION_CONTRACT,
		table: 'casefiles',
		upper_bound: case_id.toString(),
		lower_bound: case_id.toString()
	});
	return rows
}