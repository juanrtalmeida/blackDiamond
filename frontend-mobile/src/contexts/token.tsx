import { createContext, Dispatch, SetStateAction } from 'react'
interface FirstTimeUserContextType {
	hasToken: boolean
	setHasToken: Dispatch<SetStateAction<boolean>>
}

export const TokenContext = createContext<FirstTimeUserContextType>({
	hasToken: false,
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	setHasToken: () => {}
})
