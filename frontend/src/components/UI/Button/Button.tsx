import classNames from 'classnames'
import s from './Button.module.css'
import React from 'react'
import { Loader } from '../../../assets/icons'

export const BUTTON_THEMES = {
	primary: 'primary',
	secondary: 'secondary',
	tertiary: 'tertiary'
}
export function Button({
	children,
	onClick,
	to,
	theme = 'primary',
	isDisabled = false,
	isLoading = false,
	isFullContainer = false
}: {
	children: string
	onClick?: () => void
	to?: string
	theme?: string
	isDisabled?: boolean
	isLoading?: boolean
	isFullContainer?: boolean
}) {
	const containerClassName = classNames(s.button, {
		[s.disabled]: isDisabled,
		[s.fullContainer]: isFullContainer,
		[s.primary]: theme === 'primary',
		[s.secondary]: theme === 'secondary',
		[s.tertiary]: theme === 'tertiary'
	})
	return to ? (
		<a className={containerClassName} target="_blank" rel="noreferrer noopenner" href={to}>
			{isLoading ? <Loader className={s.loader} /> : children}
		</a>
	) : (
		<button className={containerClassName} onClick={onClick} type="button">
			{isLoading ? <Loader className={s.loader} /> : children}
		</button>
	)
}
