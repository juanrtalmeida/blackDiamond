/* eslint-disable max-len */
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack'
import { useContext, useEffect } from 'react'
import { Text, StyleSheet, View, Dimensions, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors } from '../../assets/styles/colors'
import { text } from '../../assets/styles/text'
import { Button } from '../../components/Button/button'
import { TokenContext } from '../../contexts/token'
import { useAuth } from '../../hooks/useAuth/useAuth'
import { RootStackParamList } from '../router'
import image from '../../assets/images/register.jpg'
import Lottie from 'lottie-react-native'
import loader from '../../assets/animations/71490-rounding-lines-2-yellow.json'
import { CalendarChecks } from '../../components/CalendarChecks/calendar_checks'
import { News } from '../../components/News/news'
import { ClassesSlider } from '../../components/ClassesSlider/classes_slider'

export function Home({ navigation, route }: StackScreenProps<RootStackParamList, 'HomeOne'>) {
	const { name, isLoading, refresh, checkins } = useAuth()

	const { setHasToken } = useContext(TokenContext)
	useEffect(() => {
		refresh()
	}, [])

	const navigator = useNavigation<StackNavigationProp<RootStackParamList>>()

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
				<ClassesSlider />
				<View style={{ paddingHorizontal: 20 }}>
					<Button title="dfasfs" onPress={handleRemoveToken} />
					<Text style={{ fontFamily: text.montserratBold, color: 'white', fontSize: 20, marginTop: 30 }}>
						Voce nesse mes
					</Text>
					<CalendarChecks dates={['2023-02-02']} />
					<View>
						<Text style={{ fontFamily: text.montserratBold, color: 'white', fontSize: 20, marginTop: 30 }}>
							Ultimas Noticias
						</Text>
						{newsArray.slice(0, 3).map(({ description, image, title }, index) => (
							<News description={description} image={image} title={title} key={`${description}${index}`} />
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
