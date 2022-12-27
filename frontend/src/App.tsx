import React from 'react'
import './App.css'
import { Router } from './Router/Router'
import { OneTwo } from '@components/OneTwo'
import { Accordion } from '@components/UI/Accordion/Accordion'
import { useNavigate } from 'react-router-dom'
import { Button } from '@components/UI/Button/Button'
import { usePageTitle } from '@hooks/usePageTitle/usePageTitle'

function App() {
	const navigate = useNavigate()
	usePageTitle('A melhor de Belém')
	return (
		<div className="app">
			<button type="button" onClick={() => navigate('/dashboard')}>
				go to dash
			</button>
			<Accordion buttonContent="Accordion">This is the content</Accordion>
			<OneTwo />
			<Button>This is a button</Button>
			<Router />
		</div>
	)
}

export default App
