export type TableRowsConfig = {
	code: string,
	table: string,
	scope: string,
	limit?: string,
	upper_bound?: string | null,
	lower_bound?: string | null,
}

export type CaseFile = {
	approvals: any[],
	arbitrators: string[],
	case_id: number,
	case_ruling: string,
	case_status: number,
	claimant: string,
	update_ts: number,
	required_langs: number[],
	respondant: string,
	number_claims: number
}