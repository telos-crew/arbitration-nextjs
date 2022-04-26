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

export type Claim = {
	claim_id: number,
	claim_summary: string,
	decision_link: string,
	response_link: string,
	status: number,
	decision_class: number
}

export type Election = {
	election_id: 3,
	ballot_name: string,
	info_url: string,
	candidates: { name: string, value: string}[],
	available_seats: number,
	begin_add_candidates_ts: string,
	end_add_candidates_ts: string,
	begin_voting_ts: string,
	end_voting_ts: string,
	status: number
}

export type Nominee = {
	nominee_name: string,
	credentials_link: string,
	application_time: string
}