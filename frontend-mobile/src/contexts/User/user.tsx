/* eslint-disable camelcase */
import { createContext } from 'react'
import { UserInfoApiReturn } from '../../hooks/types/user_infos'

interface UserContextType extends UserInfoApiReturn {
	isLogged: boolean
	token: string
}

export const USER_INITIAL_CONTEXT: UserContextType = {
	isLogged: false,
	birth_date: '',
	contact: '',
	cpf: '',
	email: '',
	expire_date_start: '',
	expire_date_end: '',
	id: '',
	name: '',
	token: '',
	adress: '',
	adress_number: '',
	classes: [],
	checkins: [],
	emergency_contact: '',
	monthly_payment: [],
	privileges: '',
	rg: '',
	zip_code: '',
	sex_orientation: ''
}
export const UserContext = createContext<UserContextType>(USER_INITIAL_CONTEXT)
