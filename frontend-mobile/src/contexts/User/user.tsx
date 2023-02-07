/* eslint-disable camelcase */
import { createContext } from 'react'

type UserType = {
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
interface UserContextType extends UserType {
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
	zip_code: ''
}
export const UserContext = createContext<UserContextType>(USER_INITIAL_CONTEXT)
