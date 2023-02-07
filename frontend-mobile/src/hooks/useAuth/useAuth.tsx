import { useContext } from 'react'
import { UserContext } from '../../contexts/User/user'

export const useAuth = () => {
	const context = useContext(UserContext)
	return context
}
