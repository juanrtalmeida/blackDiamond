import React, { ReactNode, useRef, useState } from 'react'
import cn from 'classnames'
import s from './style.module.css'

type AccordionPropsType = {
	buttonContent: string | ReactNode
	children: string | ReactNode
}
export function Accordion({ buttonContent, children }: AccordionPropsType) {
	const [isVisible, setVisible] = useState(false)
	const containerRef = useRef<HTMLDivElement>(null)
	const signClassName = cn(s.sign, { [s.signActive]: isVisible })

	return (
		<div className={s.accordionContainer} ref={containerRef}>
			<button className={s.container} type="button" onClick={() => setVisible(!isVisible)}>
				<div className={s.buttonSeparator}>
					{buttonContent}
					<div className={signClassName}> {'+'} </div>
				</div>
			</button>
			<div className={s.contentContainer} style={{ maxHeight: isVisible ? containerRef.current?.scrollHeight : 0 }}>
				<p className={s.contentText}>{children}</p>
			</div>
		</div>
	)
}
