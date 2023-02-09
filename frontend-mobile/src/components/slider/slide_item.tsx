import { View, Text, StyleSheet, Dimensions, Image, TouchableHighlight } from 'react-native'
import type { ImageSourcePropType } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { colors } from '../../assets/styles/colors'
import { ReactNode, useContext } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { FirstTimeUserContext } from '../../contexts/first_time'

const { width } = Dimensions.get('screen')
export function SlideItem({
	title,
	image,
	subtitle,
	isLast = false
}: {
	title: ReactNode
	image: ImageSourcePropType
	subtitle: string
	isLast: boolean
}) {
	const { setIsFirstTime } = useContext(FirstTimeUserContext)
	return (
		<View style={styles.container}>
			{image ? <Image resizeMode="contain" style={{ height: '50%', width: width }} source={image} /> : null}
			<Text style={styles.text}>{title}</Text>
			<Text style={styles.subtitle}>{subtitle}</Text>
			{isLast ? (
				<TouchableHighlight
					underlayColor={colors.secondary + '95'}
					onPress={async () => {
						await AsyncStorage.setItem('firstTime', 'false')
						setIsFirstTime(false)
					}}
					style={{
						alignItems: 'center',
						backgroundColor: colors.secondary,
						borderRadius: 6,
						flexDirection: 'row',
						marginTop: 20,
						paddingHorizontal: 20,
						paddingVertical: 10
					}}
				>
					<>
						<Text style={{ fontSize: 16, fontFamily: 'Montserrat-Bold' }}>Começar</Text>
						<Feather name="arrow-right" size={24} color="black" style={{ marginLeft: 10 }} />
					</>
				</TouchableHighlight>
			) : null}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: 'center',
		width: width
	},
	text: {
		color: '#fff',
		fontFamily: 'Montserrat-Bold',
		fontSize: 32,
		marginTop: 20,
		textAlign: 'center'
	},
	subtitle: {
		color: '#fff',
		fontFamily: 'Montserrat-Medium',
		marginTop: 10,
		fontSize: 16,
		textAlign: 'center'
	}
})
