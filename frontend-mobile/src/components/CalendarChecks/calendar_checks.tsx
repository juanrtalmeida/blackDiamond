import { View } from 'react-native'
import { colors } from '../../assets/styles/colors'

export function CalendarChecks({ dates }: { dates: string[] }) {
	function getDaysInCurrentMonth() {
		const date = new Date()

		return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
	}

	const datesInDate = dates.map((date) => new Date(date).getDate())
	return (
		<View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
			{new Array(29).fill('').map((_, index) => {
				const isCheckedIn = datesInDate.includes(index + 1)

				return (
					<View
						key={index}
						style={{
							marginHorizontal: 3,
							marginVertical: 2,
							width: 20,
							borderRadius: 6,
							height: 20,
							backgroundColor: isCheckedIn ? colors.secondary : colors.quinary
						}}
					/>
				)
			})}
		</View>
	)
}
