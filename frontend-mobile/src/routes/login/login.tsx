import AsyncStorage from '@react-native-async-storage/async-storage'
import { createStackNavigator } from '@react-navigation/stack'

import background from '../../assets/images/login-background.png'
import { ImageBackground, Platform, StatusBar, Text, TouchableOpacity, View, SafeAreaView } from 'react-native'
import { colors } from '../../assets/styles/colors'
import { useApi } from '../../hooks/useApi'

export type RootStackParamList = {
	Choose: undefined
	Login: undefined
	Register: undefined
}

async function handleLogin() {
	try {
		const headers = await useApi().login('juanalgal2@gmail.com', '12345678')
		const token = headers.headers!.token
		await AsyncStorage.setItem('token', token)
	} catch (err) {
		console.log(err)
	}
}

export function LoginOrRegisterRoute() {
	const Stack = createStackNavigator<RootStackParamList>()
	return (
		<Stack.Navigator>
			<Stack.Screen options={{ headerShown: false }} name="Choose" component={Choose} />
			<Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
			<Stack.Screen options={{ headerShown: false }} name="Register" component={Register} />
		</Stack.Navigator>
	)
}

function Login() {
	return (
		<View>
			<Text>teste de login</Text>
		</View>
	)
}

function Choose() {
	return (
		<SafeAreaView
			style={{
				backgroundColor: colors.primary,
				flex: 1,
				paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
			}}
		>
			<ImageBackground
				source={background}
				resizeMode="cover"
				style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}
			>
				<TouchableOpacity
					activeOpacity={0.9}
					style={{
						backgroundColor: colors.secondary,
						width: 100,
						paddingVertical: 20,
						justifyContent: 'center',
						alignItems: 'center',
						borderRadius: 10
					}}
				>
					<Text>Entrar</Text>
				</TouchableOpacity>
				<TouchableOpacity
					activeOpacity={0.9}
					style={{
						backgroundColor: colors.secondary,
						margin: 20,
						width: 100,
						paddingVertical: 20,
						justifyContent: 'center',
						alignItems: 'center',
						borderRadius: 10
					}}
				>
					<Text>Cadastrar</Text>
				</TouchableOpacity>
			</ImageBackground>
		</SafeAreaView>
	)
}
function Register() {
	return (
		<View>
			<Text>teste de registro</Text>
		</View>
	)
}
