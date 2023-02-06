import React, { useEffect, useState } from 'react'
import './App.css'
import { Router } from './Router/Router'
import { OneTwo } from '@components/OneTwo'
import { Accordion } from '@components/UI/Accordion/Accordion'
import { useNavigate } from 'react-router-dom'
import { Button } from '@components/UI/Button/Button'
import { usePageTitle } from '@hooks/usePageTitle/usePageTitle'
import image from '@assets/Black-Diamond-logo.png'

function App() {
	const navigate = useNavigate()
	const [imageApi, setImageApi] = useState('')
	usePageTitle('A melhor de Belém')
	async function get() {
		const formData = new FormData()
		formData.append('title', 'title')
		formData.append('description', 'content')
		formData.append('image', new File([image], 'image.png'))
		const result = await fetch('http://localhost:4000/api/create/news', {
			method: 'POST',
			body: formData,
			headers: {
				authorization:
					'Bearer SFMyNTY.g2gDbQAAABRqdWFuYWxnYWwyQGdtYWlsLmNvbW4GALQbwaaFAWIAAVGA.4GUzXysimKlld3VwxfbFIZD7UftVGN5TQ7vRsLCQ1JY'
			}
		}).then((res) => console.log(res))
		console.log(result)
	}
	useEffect(() => {
		get()
	})

	return (
		<div className="app">
			<button type="button" onClick={() => navigate('/dashboard')}>
				go to dash
			</button>
			{imageApi ? <img style={{ width: 100, height: 200 }} src={`data:image/png;base64,${imageApi}`} /> : null}
			<div style={{ display: 'flex' }}>
				<div style={{ display: 'flex', flexDirection: 'column' }}>
					<Accordion buttonContent="Accordion">This is the content</Accordion>
					<Accordion buttonContent="Accordion">This is the content</Accordion>
				</div>
				<div style={{ display: 'flex', flexDirection: 'column' }}>
					<Accordion buttonContent="Accordion">This is the content</Accordion>
					<Accordion buttonContent="Accordion">This is the content</Accordion>
				</div>
			</div>

			<OneTwo />
			<Button>This is a button</Button>
			<Router />
		</div>
	)
}

export default App
