import AsyncStorage from '@react-native-async-storage/async-storage'
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack'

import background from '../../assets/images/login-background.png'
import { ImageBackground, Platform, StatusBar, Text, View, SafeAreaView } from 'react-native'
import { colors } from '../../assets/styles/colors'
import { useApi } from '../../hooks/useApi'
import { useNavigation } from '@react-navigation/native'
import { Button } from '../../components/Button/button'

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
	const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()
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
				<Button
					style={{ marginVertical: 30, backgroundColor: colors.quaternary }}
					title="Login"
					onPress={() => navigation.navigate('Login')}
				/>
				<Button style={{ marginBottom: 30 }} title="Register" onPress={() => navigation.navigate('Register')} />
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
