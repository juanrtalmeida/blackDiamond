import { StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native'
import Lottie from 'lottie-react-native'
import loader from '../../assets/animations/71490-rounding-lines-2-yellow.json'
import { text as TextConst } from '../../assets/styles/text'
import { colors } from '../../assets/styles/colors'

type ButtonPropsType = {
	isLoading?: boolean
	onPress?: () => void
	title: string
	style?: ViewStyle
}

export function Button({ isLoading, onPress, title, style }: ButtonPropsType) {
	return (
		<TouchableOpacity activeOpacity={0.9} onPress={onPress} style={{ ...styles.button, ...style }}>
			{isLoading ? (
				<Lottie style={{ width: 30 }} autoPlay loop source={loader} />
			) : (
				<Text style={styles.text}>{title}</Text>
			)}
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	text: {
		fontFamily: TextConst.montserratBold
	},
	button: {
		backgroundColor: colors.secondary,
		borderRadius: 6,
		flexDirection: 'row',
		paddingHorizontal: 20,
		paddingVertical: 10
	}
})
