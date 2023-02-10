import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { useContext } from 'react'
import { Text, StyleSheet, View, FlatList, Dimensions } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors } from '../../assets/styles/colors'
import { text } from '../../assets/styles/text'
import { Button } from '../../components/Button/button'
import { TokenContext } from '../../contexts/token'
import { useAuth } from '../../hooks/useAuth/useAuth'
import { RootStackParamList } from '../router'

export function Home() {
	const { email, name, sex_orientation } = useAuth()
	const { setHasToken } = useContext(TokenContext)
	const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()
	const array = [
		{ name: 'teste', startingHour: 15, type: 'Kung Fu', professor: 'Juan Almeida' },
		{ name: 'teste', startingHour: 15, type: 'Kung Fu', professor: 'Juan Almeida' },
		{ name: 'teste', startingHour: 15, type: 'Kung Fu', professor: 'Juan Almeida' }
	]
	function getDayTurn() {
		const hour = new Date().getHours()

		if (hour > 6) {
			return 'Bom dia'
		}
		if (hour > 12) {
			return 'Boa tarde'
		}
		return 'Boa noite'
	}

	const { width } = Dimensions.get('screen')

	async function handleRemoveToken() {
		await AsyncStorage.removeItem('token')
		setHasToken(false)
	}
	console.log('fasdfiajsdf')
	return (
		<SafeAreaView
			style={{
				backgroundColor: colors.primary,
				flex: 1,
				padding: 20
			}}
		>
			<Text style={styles.welcomeText}>
				{getDayTurn()}, {'\n'}
				<Text style={{ fontSize: 36 }}>{name}</Text>
			</Text>
			<Text style={styles.secondHeading}>Suas Turmas</Text>
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
							width: width - 100,
							marginRight: array.length === index + 1 ? 0 : 20,
							height: 150
						}}
					>
						<View
							style={{
								flex: 1,
								borderRadius: 10,
								borderWidth: 3,
								backgroundColor: colors.primary,
								padding: 20,
								justifyContent: 'space-between'
							}}
						>
							<View>
								<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
									<Text style={{ fontFamily: text.montserratBold, color: 'white', fontSize: 25 }}>{item.type}</Text>
									<Text style={{ fontFamily: text.montserratBold, color: 'white', fontSize: 25 }}>
										{item.startingHour}h
									</Text>
								</View>
								<Text style={{ fontFamily: text.montserratMedium, color: colors.quaternary, fontSize: 16 }}>
									{item.professor}
								</Text>
							</View>
							<Button title="acessar" onPress={() => {}} />
						</View>
					</View>
				)}
			/>

			<View style={{ margin: 50, backgroundColor: 'red' }}>
				<Text>asdasd</Text>
			</View>
			<Button title="dfasfs" onPress={handleRemoveToken} />

			<Text>{sex_orientation}</Text>
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
