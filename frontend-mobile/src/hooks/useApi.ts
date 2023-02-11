import { ShopInfosApiReturn } from './types/shop_infos'
import { UserInfoApiReturn } from './types/user_infos'
import { userRegister } from './types/user_register'
import { useAxios } from './useAxios'
export function useApi() {
	const { postData, getData } = useAxios('http://192.168.100.7:4000/api')

	async function login(email: string, password: string) {
		const { headers } = await postData('/login', { email, password })
		return { headers }
	}

	async function register(registerObject: userRegister) {
		try {
			const { headers } = await postData('/register', registerObject)
			return { headers }
		} catch (e) {
			throw new Error('Erro ao registrar usuário')
		}
	}

	async function getUserInfos(token: string): Promise<{ data?: UserInfoApiReturn; error?: unknown }> {
		try {
			const data = await getData('/me', { authorization: 'Bearer ' + token })
			return data
		} catch (e) {
			return { error: e }
		}
	}

	async function shop(): Promise<ShopInfosApiReturn> {
		const { data } = await getData('/shop')
		return data
	}
	return { login, register, getUserInfos, shop }
}
