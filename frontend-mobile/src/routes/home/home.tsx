/* eslint-disable max-len */
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack'
import { useContext } from 'react'
import { Text, StyleSheet, View, FlatList, Dimensions, Image, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors } from '../../assets/styles/colors'
import { text } from '../../assets/styles/text'
import { Button } from '../../components/Button/button'
import { TokenContext } from '../../contexts/token'
import { useAuth } from '../../hooks/useAuth/useAuth'
import { RootStackParamList } from '../router'
import { impactAsync } from 'expo-haptics'
import image from '../../assets/images/register.jpg'
import { ImpactFeedbackStyle } from 'expo-haptics/build/Haptics.types'
import Lottie from 'lottie-react-native'
import loader from '../../assets/animations/71490-rounding-lines-2-yellow.json'
import { CalendarChecks } from '../../components/CalendarChecks/calendar_checks'

export function Home({ navigation, route }: StackScreenProps<RootStackParamList, 'HomeOne'>) {
	const { name, isLoading } = useAuth()

	const { setHasToken } = useContext(TokenContext)

	const navigator = useNavigation<StackNavigationProp<RootStackParamList>>()
	const array = [
		{ name: 'teste', startingHour: 15, type: 'Kung Fu', professor: 'Juan Almeida', image },
		{ name: 'teste', startingHour: 15, type: 'Kung Fu', professor: 'Juan Almeida', image },
		{ name: 'teste', startingHour: 15, type: 'Kung Fu', professor: 'Juan Almeida', image }
	]

	const newsArray = [
		{
			title: 'teste',
			description:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos voluptatem fugit similique rem totam illo, exercitationem laudantium provident consequuntur corporis!',
			image
		},
		{
			title: 'teste',
			description:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos voluptatem fugit similique rem totam illo, exercitationem laudantium provident consequuntur corporis!',
			image
		},
		{
			title: 'teste',
			description:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos voluptatem fugit similique rem totam illo, exercitationem laudantium provident consequuntur corporis!',
			image
		},
		{
			title: 'teste',
			description:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos voluptatem fugit similique rem totam illo, exercitationem laudantium provident consequuntur corporis!',
			image
		},
		{
			title: 'teste',
			description:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos voluptatem fugit similique rem totam illo, exercitationem laudantium provident consequuntur corporis!',
			image
		}
	]
	function getDayTurn() {
		const hour = new Date().getHours()

		if (hour > 6 && hour < 12) {
			return 'Bom dia'
		}
		if (hour > 12 && hour < 18) {
			return 'Boa tarde'
		}
		return 'Boa noite'
	}

	const { width } = Dimensions.get('screen')

	async function handleRemoveToken() {
		await AsyncStorage.removeItem('token')
		setHasToken(false)
	}

	if (isLoading) {
		return (
			<View style={{ backgroundColor: colors.primary, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<Lottie style={{ width: 60 }} source={loader} autoPlay loop />
			</View>
		)
	}
	return (
		<SafeAreaView
			style={{
				backgroundColor: colors.primary,
				flex: 1,
				flexGrow: 1
			}}
		>
			<ScrollView scrollEnabled nestedScrollEnabled keyboardShouldPersistTaps="always">
				<View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
					<Text style={styles.welcomeText}>
						{getDayTurn()}, {'\n'}
						<Text style={{ fontSize: 36 }}>{name}</Text>
					</Text>
					<Text style={styles.secondHeading}>Suas Turmas</Text>
				</View>
				<FlatList
					overScrollMode="never"
					decelerationRate="normal"
					style={{ margin: 0, paddingBottom: 0, flexGrow: 0 }}
					showsHorizontalScrollIndicator={false}
					data={array}
					horizontal
					renderItem={({ item, index }) => (
						<View
							style={{
								width: 200,
								marginRight: array.length === index + 1 ? 0 : 20,
								height: 80
							}}
						>
							<View
								style={{
									flex: 1,
									width: 200,
									borderRadius: 10,
									borderWidth: 3,
									backgroundColor: colors.quaternary,
									padding: 10,
									justifyContent: 'space-between'
								}}
							>
								<View>
									<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
										<Image
											resizeMode="center"
											source={item.image}
											style={{ width: 50, height: 50, borderRadius: 25 }}
										/>
										<View style={{ paddingHorizontal: 10 }}>
											<Text style={{ fontFamily: text.montserratBold, color: 'white', fontSize: 20 }}>{item.type}</Text>
											<Text style={{ fontFamily: text.montserratBold, color: 'white', fontSize: 12 }}>
												{item.startingHour}h, {item.professor}
											</Text>
										</View>
									</View>
								</View>
							</View>
						</View>
					)}
				/>
				<View style={{ paddingHorizontal: 20 }}>
					<View style={{ margin: 50, backgroundColor: 'red' }}>
						<Text onPress={() => impactAsync(ImpactFeedbackStyle.Light)}>asdasd</Text>
					</View>
					<Button title="dfasfs" onPress={handleRemoveToken} />
					<Text style={{ fontFamily: text.montserratBold, color: 'white', fontSize: 20, marginTop: 30 }}>
						Voce nesse mes
					</Text>
					<CalendarChecks />
					<View>
						<Text style={{ fontFamily: text.montserratBold, color: 'white', fontSize: 20, marginTop: 30 }}>
							Ultimas Noticias
						</Text>
						{newsArray.map((item, index) => (
							<View key={index} style={{ padding: 20 }}>
								<View
									style={{
										backgroundColor: colors.quaternary,
										height: 150,
										padding: 20,
										borderRadius: 7,
										flexDirection: 'row'
									}}
								>
									<Image source={item.image} style={{ width: 100, height: 100, borderRadius: 5 }} />
									<View>
										<Text style={{ fontFamily: text.montserratBold, color: 'white', fontSize: 20, maxWidth: '100%' }}>
											{item.title}
										</Text>
										<Text
											style={{ fontFamily: text.montserrat, color: 'white', fontSize: 12, width: 200, paddingLeft: 10 }}
										>
											{item.description}
										</Text>
									</View>
								</View>
							</View>
						))}
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	welcomeText: {
		color: 'white',
		fontSize: 24,
		fontFamily: text.montserratBold
	},
	secondHeading: {
		fontSize: 20,
		color: 'white',
		fontFamily: text.montserratMedium,
		marginVertical: 10
	},
	class: {
		fontFamily: text.montserratMedium,
		backgroundColor: colors.quaternary,
		borderRadius: 10,
		padding: 10
	}
})
