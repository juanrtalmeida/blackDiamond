import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { NotFound } from './NotFound'

const routes = Object.keys(
	import.meta.glob('/src/pages/**/[a-z[]*.tsx', {
		eager: true
	})
).map((route) => {
	const path = route
		.replace(/\/src\/pages|index|\.tsx$/g, '')
		.replace(/\[\.{3}.+\]/, '*')
		.replace(/\[(.+)\]/, ':$1')
	const Component = React.lazy(
		() =>
			import(
				/* @vite-ignore */
				`${route}`
			)
	)
	return {
		component: Component,
		path
	}
})

const RouterAllRoutes = React.memo(function RouterRoutes() {
	function renderRoutes() {
		return routes.map(({ path, component: Component }) => {
			return <Route key={path} path={path} element={<Component />} />
		})
	}

	return (
		<main>
			<Suspense fallback={<div>Loading...</div>}>
				<Routes>
					{renderRoutes()}
					<Route path="*" element={<NotFound />} />
				</Routes>
			</Suspense>
		</main>
	)
})

export { RouterAllRoutes }
