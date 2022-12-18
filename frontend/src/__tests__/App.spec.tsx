import React from 'react'
import { render } from '@testing-library/react'
import { OneTwo } from '../components/OneTwo'

describe('App Component Tests', () => {
	it('Should render component correctly', () => {
		const { getByText } = render(<OneTwo />)
		expect(getByText('OneTwdo')).toBeInTheDocument()
	})
})
