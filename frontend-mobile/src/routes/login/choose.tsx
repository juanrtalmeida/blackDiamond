import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { colors } from '../../assets/styles/colors'
import { RootStackParamList } from './login_or_register'
import { ImageBackground, View, TextInput, Text, StyleSheet } from 'react-native'
import background from '../../assets/images/login-background.png'
import { Button } from '../../components/Button/button'
import { text as TextConst } from '../../assets/styles/text'
import { useApi } from '../../hooks/useApi'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'

export function Choose() {
	async function handleLogin() {
		try {
			const headers = await useApi().login('juanalgal2@gmail.com', '12345678')
			const token = headers.headers!.token
			await AsyncStorage.setItem('token', token)
		} catch (err) {
			console.log(err)
		}
	}
	const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()
	return (
		<View
			style={{
				backgroundColor: colors.primary,
				flex: 1,
				justifyContent: 'center',
				alignItems: 'center'
			}}
		>
			<ImageBackground
				source={background}
				resizeMode="cover"
				style={{
					flex: 1,
					position: 'absolute',
					width: '100%',
					height: '100%'
				}}
			>
				<View style={{ flex: 1, backgroundColor: '#000000', opacity: 0.8 }}></View>
			</ImageBackground>
			<View style={{ width: '80%', alignItems: 'center' }}>
				<Text style={styles.welcomeText}>Seja bem vindo de volta</Text>
				<View style={styles.inputView}>
					<MaterialCommunityIcons
						name="email-outline"
						size={24}
						color={colors.quaternary}
						style={{ paddingLeft: 10 }}
					/>
					<TextInput
            
						cursorColor={colors.secondary}
						selectionColor={colors.secondary}
						style={{ width: '90%', paddingVertical: 10, paddingLeft: 10, fontFamily: TextConst.montserratMedium }}
						autoComplete="email"
						placeholder="Email"
					/>
				</View>
				<View style={styles.inputView}>
					<FontAwesome name="lock" size={24} color={colors.quaternary} style={{ paddingLeft: 10 }} />
					<TextInput
						cursorColor={colors.secondary}
						style={{ width: '90%', paddingVertical: 10, paddingLeft: 10, fontFamily: TextConst.montserratMedium }}
						autoComplete="password"
						placeholder="Senha"
					/>
				</View>
				<Button
					style={{ marginVertical: 30, backgroundColor: colors.secondary }}
					title="Login"
					onPress={() => navigation.navigate('Login')}
				/>
				<Text style={{ fontFamily: TextConst.montserratMedium, color: 'white' }}>
					Ainda nao tem cadastro?{' '}
					<Text
						onPress={() => navigation.navigate('Register')}
						style={{ fontFamily: TextConst.montserratBold, color: colors.secondary }}
					>
						Crie sua conta
					</Text>
				</Text>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	welcomeText: {
		fontFamily: TextConst.montserratBold,
		fontSize: 30,
		color: colors.secondary
	},
	inputView: {
		width: '100%',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-start',
		marginTop: 10,
		minWidth: 100,
		borderRadius: 10,
		backgroundColor: colors.quinary
	}
})
