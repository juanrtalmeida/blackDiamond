import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import * as Splash from 'expo-splash-screen'
import { useCallback } from 'react'
import { SafeAreaView, StyleSheet, View, Platform, StatusBar } from 'react-native'
import { colors } from './src/assets/styles/colors'
import { TabRouter } from './src/routes/router'
import { Slider } from './src/components/slider/slider'
import { FirstTimeUserContext } from './src/contexts/first_time'
import { UserProvider } from './src/contexts/User/UserProvider'
import { TokenContext } from './src/contexts/token'
import { LoginOrRegisterRoute } from './src/routes/login/login'

export default function App() {
	const [isFirstTime, setIsFirstTime] = useState(true)
	const [hasToken, setHasToken] = useState(false)

	useEffect(() => {
		async function loadStorageData() {
			try {
				const isFirstTimeLocal = await AsyncStorage.getItem('firstTime')
				const token = await AsyncStorage.getItem('token')
				if (token) {
					setHasToken(true)
				}
				if (isFirstTimeLocal === 'true') {
					setIsFirstTime(false)
				}
			} catch (err) {
				/* empty */
			}
		}
		loadStorageData()
	}, [])

	const [fontsLoaded] = useFonts({
		'Montserrat-Bold': require('./src/assets/fonts/Montserrat-Bold.ttf'),
		'Montserrat-Medium': require('./src/assets/fonts/Montserrat-Medium.ttf'),
		'Montserrat-Regular': require('./src/assets/fonts/Montserrat-Regular.ttf')
	})

	const onLayoutRootView = useCallback(async () => {
		if (fontsLoaded) {
			await Splash.hideAsync()
		}
	}, [fontsLoaded])

	if (!fontsLoaded) {
		return null
	}

	if (isFirstTime) {
		return (
			<FirstTimeUserContext.Provider value={{ isFirstTime, setIsFirstTime }}>
				<SafeAreaView
					style={{
						backgroundColor: colors.primary,
						flex: 1,
						paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
					}}
				>
					<Slider />
				</SafeAreaView>
			</FirstTimeUserContext.Provider>
		)
	}

	if (!hasToken) {
		return (
			<TokenContext.Provider value={{ hasToken, setHasToken }}>
				<View style={styles.container} onLayout={onLayoutRootView}>
					<NavigationContainer
						theme={{
							colors: {
								background: colors.quaternary,
								border: '',
								card: '',
								notification: '',
								primary: '',
								text: ''
							},
							dark: true
						}}
					>
						<LoginOrRegisterRoute />
					</NavigationContainer>
				</View>
			</TokenContext.Provider>
		)
	}

	return (
		<TokenContext.Provider value={{ hasToken, setHasToken }}>
			<UserProvider>
				<View style={styles.container} onLayout={onLayoutRootView}>
					<NavigationContainer
						theme={{
							colors: {
								background: colors.quaternary,
								border: '',
								card: '',
								notification: '',
								primary: '',
								text: ''
							},
							dark: true
						}}
					>
						<TabRouter />
					</NavigationContainer>
				</View>
			</UserProvider>
		</TokenContext.Provider>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#000000',
		flex: 1
	}
})
