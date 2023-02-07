import { createContext, Dispatch, SetStateAction } from 'react'
interface FirstTimeUserContextType {
	isFirstTime: boolean
	setIsFirstTime: Dispatch<SetStateAction<boolean>>
}

export const FirstTimeUserContext = createContext<FirstTimeUserContextType>({
	isFirstTime: false,
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	setIsFirstTime: () => {}
})
