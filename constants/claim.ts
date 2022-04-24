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