import { useAxios } from '../useAxios/useAxios'
export function useApi() {
	const { postData } = useAxios('http://localhost:4000/api')

	async function login(email: string, password: string) {
		try {
			const { headers } = await postData('/login', { email, password })
			return { headers }
		} catch (e) {
			return { error: e }
		}
	}

	async function register({ email, password, name }: { email: string; password: string; name: string }) {
		try {
			const { headers } = await postData('/register', { email, name, password })
			return { headers }
		} catch (e) {
			return { error: e }
		}
	}
	return { login, register }
}
