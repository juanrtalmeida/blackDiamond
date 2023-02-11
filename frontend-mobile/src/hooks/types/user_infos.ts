export type UserInfoApiReturn = {
	adress: string | null
	adress_number: string | null
	birth_date: string | null
	checkins: checkinType[]
	classes: []
	contact: null | string
	cpf: null | string
	email: string
	emergency_contact: string | null
	expire_date_end: string | null
	expire_date_start: string | null
	id: string
	monthly_payment: []
	name: string
	privileges: string
	rg: string | null
	zip_code: string | null
	sex_orientation: string | null
}

type checkinType = {
	type: string
	date: string
}
