import AsyncStorage from '@react-native-async-storage/async-storage'
import { ReactNode, useContext, useEffect, useState } from 'react'
import { USER_INITIAL_CONTEXT, UserContext } from './user'
import { useApi } from '../../hooks/useApi'
import { TokenContext } from '../token'

export function UserProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState(USER_INITIAL_CONTEXT)
	useEffect(() => {
		async function loadStorageData() {
			try {
				setUser((prev) => ({ ...prev, isLoading: true }))
				const token = await AsyncStorage.getItem('token')
				const { data } = await useApi().getUserInfos(token!)
				setUser({
					...data!,
					token: token!,
					isLogged: true,
					isLoading: false,
					refresh: () => loadStorageData()
				})
			} catch (err) {
				const { setHasToken } = useContext(TokenContext)
				setHasToken(false)
				await AsyncStorage.removeItem('token')
			}
		}

		loadStorageData()
	}, [])
	return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}
