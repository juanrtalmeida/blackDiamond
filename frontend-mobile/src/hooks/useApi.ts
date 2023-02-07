import { useAxios } from './useAxios'
export function useApi() {
	const { postData, getData } = useAxios('http://192.168.100.7:4000/api')

	async function login(email: string, password: string) {
		const { headers } = await postData('/login', { email, password })
		return { headers }
	}

	async function register({ email, password, name }: { email: string; password: string; name: string }) {
		try {
			const { headers } = await postData('/register', { email, name, password })
			return { headers }
		} catch (e) {
			return { error: e }
		}
	}

	async function getUserInfos(token: string): Promise<{ data?: UserApiReturn; error?: unknown }> {
		try {
			const data = await getData('/me', { authorization: 'Bearer ' + token })
			return data
		} catch (e) {
			return { error: e }
		}
	}
	return { login, register, getUserInfos }
}

export type UserApiReturn = {
	adress: string | null
	adress_number: string | null
	birth_date: string | null
	checkins: []
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
}
