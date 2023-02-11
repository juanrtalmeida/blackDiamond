import { View } from 'react-native'
import { colors } from '../../assets/styles/colors'

export function CalendarChecks() {
	function getDaysInCurrentMonth() {
		const date = new Date()

		return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
	}

	return (
		<View style={{ paddingHorizontal: 10, flexDirection: 'row', flexWrap: 'wrap' }}>
			{new Array(getDaysInCurrentMonth()).fill('').map((_, index) => {
				const value = Math.round(Math.random())
				return (
					<View
						key={index}
						style={{
							margin: 5,
							width: 20,
							borderRadius: 6,
							height: 20,
							backgroundColor: value ? colors.secondary : colors.quinary,
							position: 'relative',
							zIndex: 1
						}}
					/>
				)
			})}
		</View>
	)
}
