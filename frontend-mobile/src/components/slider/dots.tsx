import { ReactNode } from 'react'
import { ImageSourcePropType, View } from 'react-native'
import { Dimensions, Animated } from 'react-native'
import { colors } from '../../assets/styles/colors'

export function Dots({
	items,
	scrollX
}: {
	items: { id: number; image?: ImageSourcePropType; title: ReactNode }[]
	scrollX: Animated.Value
}) {
	const { width } = Dimensions.get('screen')
	return (
		<View
			style={{
				alignItems: 'center',
				bottom: 30,
				flexDirection: 'row',
				justifyContent: 'center',
				position: 'absolute',
				width: '100%'
			}}
		>
			{items.map((item, index) => {
				const inputRange = [(index - 1) * width, index * width, (index + 1) * width]
				const dotWidth = scrollX.interpolate({ extrapolate: 'clamp', inputRange, outputRange: [15, 30, 15] })
				const background = scrollX.interpolate({
					extrapolate: 'clamp',
					inputRange,
					outputRange: [colors.quinary, colors.secondary, colors.quinary]
				})
				return (
					<Animated.View
						key={item.id}
						style={{
							backgroundColor: background,
							borderRadius: 6,
							height: 12,
							marginHorizontal: 5,
							width: dotWidth
						}}
					/>
				)
			})}
		</View>
	)
}
