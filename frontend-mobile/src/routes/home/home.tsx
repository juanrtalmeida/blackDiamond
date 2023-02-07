import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { Button, Text, View } from 'react-native'
import { colors } from '../../assets/styles/colors'
import { useAuth } from '../../hooks/useAuth/useAuth'
import { RootStackParamList } from '../router'

export function Home() {
	const { email } = useAuth()
	const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()
	return (
		<View
			style={{
				alignItems: 'center',
				backgroundColor: colors.quaternary,
				flex: 1,
				justifyContent: 'center'
			}}
		>
			<Button title="dfasfs" onPress={() => AsyncStorage.removeItem('token')}></Button>
			<Text>{email}</Text>
		</View>
	)
}
