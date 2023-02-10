import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { useContext } from 'react'
import { Button, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors } from '../../assets/styles/colors'
import { TokenContext } from '../../contexts/token'
import { useAuth } from '../../hooks/useAuth/useAuth'
import { RootStackParamList } from '../router'

export function Home() {
	const { email, name, sex_orientation } = useAuth()
	const { setHasToken } = useContext(TokenContext)
	const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()
	async function handleRemoveToken() {
		await AsyncStorage.removeItem('token')
		setHasToken(false)
	}
	return (
		<SafeAreaView
			style={{
				alignItems: 'center',
				backgroundColor: colors.quaternary,
				flex: 1
			}}
		>
			<Button title="dfasfs" onPress={handleRemoveToken}></Button>
			<Text>{sex_orientation}</Text>
		</SafeAreaView>
	)
}
