import React from 'react'
import './App.css'
import { Router } from './Router/Router'
import { OneTwo } from '@components/OneTwo'
import { Accordion } from '@components/UI/Accordion/Accordion'

function App() {
	return (
		<div className="app">
			<Accordion buttonContent="Accordion">This is the content</Accordion>
			<Accordion buttonContent="Who created this website?">@yukitoabe</Accordion>
			<Accordion buttonContent="Accordion">This is the content</Accordion>
			<Accordion buttonContent="Accordion">This is the content</Accordion>
			<Accordion buttonContent="Accordion">This is the content</Accordion>
			<OneTwo />
			<Router />
		</div>
	)
}

export default App
